import { Text } from "react-native";
import { GetTranscript, GetGrades, GetWeekly } from "../functions/ServiceFunctions"
import { LoadCookieString, DeleteActiveProfile } from "../functions/LocalStorageFunctions"
import { TranscriptCacheContext, GradesCacheContext, WeeklyScheduleCacheContext, ActiveProfileContext } from "../functions/GlobalStates"
import { useContext, useEffect, useState } from "react"
import { Box, Button } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";

import Menu from "../components/SideBar/Menu";
import AboutMeScreen from "./AboutMeScreen";
import TranscriptScreen from "./TranscriptScreen";
import GradesScreen from "./GradesScreen";
import EmailScreen from "./EmailScreen";
import NotificationsScreen from "./NotificationsScreen";
import WeeklyScheduleScreen from "./WeeklyScheduleScreen";

const Drawer = createDrawerNavigator();

export default function ServicesScreen() {

    const [activeProfile, setActiveProfile] = useContext(ActiveProfileContext);
    const [transcriptCache, setTranscriptCache] = useContext(TranscriptCacheContext);
    const [gradesCache, setGradesCache] = useContext(GradesCacheContext);
    const [weeklyScheduleCache, setWeeklyScheduleCache] = useContext(WeeklyScheduleCacheContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const LoadCaches = async () => {
        setLoading(true);
        if (activeProfile) {
            let cookie = await LoadCookieString();
            let transcript = await GetTranscript(cookie);
            let grades = await GetGrades(cookie);
            let weekly = await GetWeekly(cookie);
            setTranscriptCache(transcript);
            setGradesCache(grades);
            setWeeklyScheduleCache(weekly);
            setLoading(false);
        }
    }


    useEffect(() => {
        LoadCaches();
    }, [activeProfile])

    useEffect(() => {
        LoadCaches();
    }, [])

    return (

        <>


            <Box safeArea flex={1}>
                <NavigationContainer>
                    <Drawer.Navigator
                        drawerContent={props => <Menu {...props} />}
                        initialRouteName="Profilim">
                        <Drawer.Screen name="Profilim" component={AboutMeScreen} />
                        <Drawer.Screen name="Transkript" component={TranscriptScreen} />
                        <Drawer.Screen name="Notlarım" component={GradesScreen} />
                        <Drawer.Screen name="Ders Programı" component={WeeklyScheduleScreen} />
                        <Drawer.Screen name="Mail" component={EmailScreen} />
                        <Drawer.Screen name="Bildirimler" component={NotificationsScreen} />
                    </Drawer.Navigator>
                </NavigationContainer>
            </Box>


            {/* <Button onPress={async () => {
                DeleteActiveProfile();
                setActiveProfile(null);
                setTranscriptCache(null);
                setGradesCache(null);
                setWeeklyScheduleCache(null);
            }}>Çıkış</Button>
            <Text>{error}</Text>
            {loading ? <Text>Yükleniyor...</Text> : <Text>Yükleme Tamamlandı</Text>}
            <Text>TRANSCRIPT : {JSON.stringify(transcriptCache)}</Text>
            <Text>GRADES: {JSON.stringify(gradesCache)}</Text>
            <Text>WEEKLY: {JSON.stringify(weeklyScheduleCache)}</Text>
            <Text>ACTIVE PROFILE: {JSON.stringify(activeProfile)}</Text> */}

        </>
    )
}
