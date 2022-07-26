import React from 'react'
import { Avatar, Divider, Hidden, HStack, ScrollView, Text, VStack } from 'native-base'
import { RefreshControl, SafeAreaView } from 'react-native'
import { LoadCookieString } from '../functions/LocalStorageFunctions'
import { ActiveProfileContext } from '../functions/GlobalStates'
import { GetProfile } from '../functions/ServiceFunctions'

const CamelCase = (str) => {
    return str?.split(" ")?.map(word => word?.charAt(0)?.toLocaleUpperCase('tr') + word?.slice(1)?.toLocaleLowerCase('tr'))?.join(" ");
}

export default function AboutMeScreen() {
    const [refreshing, setRefreshing] = React.useState(false)
    const [activeProfile, setActiveProfile] = React.useContext(ActiveProfileContext);

    const handleRefresh = async () => {
        setRefreshing(true);
        let cookie = await LoadCookieString()
        let freshAboutMe = await GetProfile(cookie)
        if (freshAboutMe) {
            // setActiveProfile(freshAboutMe)
        }
        setRefreshing(false);
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
                <HStack alignItems="center" space={4} p={4}>

                    <Avatar bg="amber.300" size="lg" source={{ uri: activeProfile.aboutMe.Img_Base64 }} />
                    <VStack >

                        <Text>{activeProfile.aboutMe.FirstName} {activeProfile.aboutMe.LastName}</Text>
                        <Text color="gray.500" fontSize={10}>{activeProfile.aboutMe.Email}</Text>
                    </VStack>
                </HStack>
                <Divider w="95%" mx="auto" />

                <VStack p={3} alignItems="center" mb={10}>
                    <Text fontWeight="bold" mb={2} color="gray.600">AKADEMİK</Text>
                    <VStack mx="auto" >


                        <Text fontWeight="bold" color="primary.600">{CamelCase(activeProfile.aboutMe.Faculty)}</Text>
                        <Text color="secondary.700" fontWeight="bold">{CamelCase(activeProfile.aboutMe.Department)}</Text>
                        <Text color="gray.400" fontWeight="bold" >{CamelCase(activeProfile.aboutMe.Year)} / {activeProfile.aboutMe.Average_Point} GNO</Text>


                        <Text color="gray.600" mt={3}>Kayıt Tarihi: {activeProfile.aboutMe.Registration_Date?.replace(/-/g, ".")}</Text>
                        <Text color="gray.600" >Kayıtlanma Puanı: {activeProfile.aboutMe.Registration_Point}</Text>
                    </VStack>
                    <Divider orientation="horizontal" my={8} w="25%" />

                    <VStack alignItems="center" >
                        <Text mx="auto" fontWeight="bold" mb={2} color="gray.600">DANIŞMAN</Text>
                        <Text color="blueGray.500" fontWeight="bold" >{activeProfile.aboutMe.Advisor.FirstName + " " + activeProfile.aboutMe.Advisor.LastName}</Text>
                        <Text color="blueGray.400">{activeProfile.aboutMe.Advisor.Email}</Text>
                    </VStack>

                    <Divider orientation="horizontal" my={8} w="25%" />


                    <Hidden>

                        <VStack w="70%" mx="auto">
                            <Text mx="auto" fontWeight="bold" mb={2} color="gray.600">KİŞİSEL</Text>
                            <VStack w="100%" mx="auto">

                                <Text color="blueGray.500"> <Text fontWeight="bold">Doğum Tarihi: </Text> {activeProfile.aboutMe.Dogum_Tarihi}</Text>
                                <Text color="blueGray.500" mb={3}> <Text fontWeight="bold" >Doğum Yeri: </Text>
                                    {activeProfile.aboutMe.Dogum_Yeri}</Text>


                                <Text color="blueGray.500" > <Text fontWeight="bold" >İl: </Text>
                                    {activeProfile.aboutMe.Il}</Text>
                                <Text color="blueGray.500" > <Text fontWeight="bold" >İlçe: </Text>
                                    {activeProfile.aboutMe.Ilce}</Text>
                                <Text color="blueGray.500" > <Text fontWeight="bold" >Posta Kodu: </Text>
                                    {activeProfile.aboutMe.Posta_Kodu}</Text>

                                <Text color="blueGray.500" mt={4}> <Text fontWeight="bold" >Anne Adı: </Text>
                                    {activeProfile.aboutMe.Ana_Adi}</Text>
                                <Text color="blueGray.500" > <Text fontWeight="bold" >Baba Adı: </Text>
                                    {activeProfile.aboutMe.Baba_Adi}</Text>

                                <Text color="blueGray.500" mt={4}> <Text fontWeight="bold" >TC Kimlik No: </Text>
                                    {activeProfile.aboutMe.TC_Kimlik_No}</Text>
                                <Text color="blueGray.500" > <Text fontWeight="bold" >TC Kimlik Seri No: </Text>
                                    {activeProfile.aboutMe.TC_Kimlik_Seri_No}</Text>
                                <Text color="blueGray.500" > <Text fontWeight="bold" >Cezai Yaptırım Sayısı: </Text>
                                    {activeProfile.aboutMe.Ceza_Bilgileri?.length}</Text>

                                <Text color="blueGray.500" mt={4} > <Text fontWeight="bold" >Telefon No: </Text>
                                    {activeProfile.aboutMe.Telefon}</Text>
                                <Text color="blueGray.500" > <Text fontWeight="bold" >GSM: </Text>
                                    {activeProfile.aboutMe.GSM}</Text>

                            </VStack>

                        </VStack>
                    </Hidden>
                </VStack>

            </ScrollView>
        </SafeAreaView >
    )
}

