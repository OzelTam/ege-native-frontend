import {
    StyleSheet,
    Image,
    Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import Input from "react-native-input-style";
import { useContext, useState } from "react";
import { SignInUser } from "../functions/SignInFunctions";
import { Button, Icon, Input, InputGroup, Stack, Text } from "native-base";
import { ActiveProfileContext } from "../functions/GlobalStates";
import { SaveActiveProfile } from "../functions/LocalStorageFunctions";

export default function SignInForm({ onSuccess, onError }) {

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [activeProfile, setActiveProfile] = useContext(ActiveProfileContext);

    const handleSignIn = async () => {
        setLoading(true);
        SignInUser(username, password).then(async (profile) => {
            await SaveActiveProfile(profile);
            setActiveProfile(profile);
            onSuccess ? onSuccess(profile) : null;
        })
            .catch(error => {

                switch (error.status) {
                    case 401:
                        setError("Öğrenci no ve şifre eşleşmiyor.")
                        break;
                    case 400:
                        setError("Öğrenci no ve/veya şifre giriniz.")
                    default:
                        setError(error.message + error.status)
                }
                onError ? onError(error) : null;
            })
            .finally(() => setLoading(false))
    }

    return (
        <KeyboardAwareScrollView
            extraHeight={150}
            extraScrollHeight={150}
            keyboardOpeningTime={250}
            contentContainerStyle={styles.panel}
            onPress={Keyboard.dismiss} >
            <Image source={{ uri: "https://ege.edu.tr/images/logo1.png" }} style={styles.img} />


            <Stack space={4}>
                <Input
                    w={"95%"}
                    size="lg" mx="auto"
                    placeholder="Öğrenci No"
                    keyboardType="number-pad"
                    isDisabled={loading}
                    onChangeText={text => setUsername(text)} />

                <Input
                    w={"95%"}
                    size="lg"
                    mx="auto"
                    placeholder="Şifre"
                    isDisabled={loading}
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)} />

                <Text color="red.500" mx={3} fontSize={13} mt={-3} mb={-2}>{error}</Text>
            </Stack>
            <Button onPress={handleSignIn} mt={7} width="90%" mx="auto" size="sm" isDisabled={loading}>{loading ? "Yükleniyor..." : "Giriş Yap"}</Button>
        </KeyboardAwareScrollView >

    )
}


const styles = StyleSheet.create({
    panel: {
        marginTop: "auto",
        marginBottom: "auto",
        padding: 25,
        backgroundColor: "#fff",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        alignSelf: "stretch",
        margin: 20,
        alignItems: "stretch"

    },
    img: {
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: 20,
        width: 75,
        height: 75,
    },
    btn: (props) => {
        return {
            alignSelf: "center",
            marginTop: 25,
            padding: 7,
            borderRadius: 5,
            borderColor: "rgba(255,255,255,0.2)",
            borderWidth: 1,
            width: "80%",
            backgroundColor: props.pressed ? "#28ADFA71" : "#28ADFA",
            alignItems: "center",
        }

    },
    btnText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    loadingLabel: {
        alignSelf: "center",
        padding: 7,
        borderColor: "rgba(255,255,255,0.2)",
        marginTop: 20,
        marginBottom: 10
    }
});