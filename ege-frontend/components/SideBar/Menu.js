import { Text, Pressable, HStack, Icon, VStack, Divider } from "native-base";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useContext } from "react";
import { ActiveProfileContext } from "../../functions/GlobalStates";





const getIcon = (screenName) => {
    switch (screenName) {
        case 'Profilim':
            return 'account-circle-outline';
        case 'Notlarım':
            return 'pencil-outline';
        case 'Transkript':
            return 'file-document-outline';
        case 'Mail':
            return 'email';
        case 'Bildirimler':
            return 'notification-clear-all';
        case 'Ders Programı':
            return 'calendar-blank-outline';
        default:
            return undefined;
    }
};



export default function Menu(props) {
    const [activeProfile,] = useContext(ActiveProfileContext);



    const handleAddProfile = () => {

    }

    const handleLogout = () => {

    }

    const handleSwitchProfiles = () => {

    }

    return (

        <DrawerContentScrollView safeArea space="6" my="2" mx="1" {...props}>

            <VStack >

                <VStack ml={3}>
                    <HStack >
                        <Text>{activeProfile.aboutMe.FirstName} {activeProfile.aboutMe.LastName}</Text>
                    </HStack>
                    <Text fontSize="10" mb={2} color="rgba(0,0,0,0.45)">{activeProfile.aboutMe.Email}</Text>

                </VStack>
                {props.state.routeNames.map((name, index) => (
                    <Pressable
                        key={"nav-btn-" + index}
                        px="5"
                        py="3"
                        rounded="md"
                        bg={
                            index === props.state.index
                                ? 'rgba(6, 182, 212, 0.1)'
                                : 'transparent'
                        }
                        onPress={(event) => {
                            props.navigation.navigate(name);
                        }}
                    >
                        <HStack space="7" alignItems="center">
                            <Icon
                                color={
                                    index === props.state.index ? 'primary.500' : 'gray.500'
                                }
                                size="5"
                                as={<MaterialCommunityIcons name={getIcon(name)} />}
                            />
                            <Text
                                fontWeight="500"
                                color={
                                    index === props.state.index ? 'primary.500' : 'gray.700'
                                }
                            >
                                {name}
                            </Text>
                        </HStack>
                    </Pressable>
                ))}


                <Divider w="90%" mx="auto" mt={4} mb={1} />
                <Text mb={1} fontWeight="bold" mx={3} color="gray.400"  >Seçenekler</Text>

                <Pressable px="5" py="3" rounded="md" bg='transparent' onPress={handleAddProfile}>
                    <HStack space="7" alignItems="center">
                        <Icon color="gray.400" size="5" as={<MaterialCommunityIcons name={"account-multiple-plus-outline"} />} />
                        <Text>Profil Ekle</Text>
                    </HStack>
                </Pressable>
                <Pressable px="5" py="3" rounded="md" bg='transparent' onPress={handleAddProfile}>
                    <HStack space="7" alignItems="center">
                        <Icon color="gray.400" size="5" as={<MaterialCommunityIcons name={"key-change"} />} />
                        <Text>Profil Değiştir</Text>
                    </HStack>
                </Pressable>
                <Pressable px="5" py="3" rounded="md" bg='transparent' onPress={handleAddProfile}>
                    <HStack space="7" alignItems="center">
                        <Icon color="danger.400" size="5" as={<MaterialCommunityIcons name={"logout"} />} />
                        <Text>Çıkış Yap</Text>
                    </HStack>
                </Pressable>
            </VStack>
        </DrawerContentScrollView>
    )
}
