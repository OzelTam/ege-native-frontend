import React from 'react'
import { ScrollView, Text } from 'native-base'
import { RefreshControl, SafeAreaView } from 'react-native'
import { TranscriptCacheContext } from '../functions/GlobalStates';
import { LoadCookieString, SaveActiveTranscript } from '../functions/LocalStorageFunctions';
import { GetTranscript } from '../functions/ServiceFunctions';


export default function TranscriptScreen() {
    const [refreshing, setRefreshing] = React.useState(false)
    const [transcript, setTranscript] = React.useContext(TranscriptCacheContext)


    const handleRefresh = async () => {
        setRefreshing(true)
        let cookie = await LoadCookieString()
        let transcript = await GetTranscript(cookie);
        console.log(transcript);
        setTranscript(transcript);
        SaveActiveTranscript(transcript);
        setRefreshing(false)
    }

    const sections = transcript?.seasons?.map(season => {
        return {
            title: season?.name,
            content: season?.courses
        }
    })
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ flex: 1 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >

                <Text>
                    {JSON.stringify(transcript.seasons.map(season => season))}
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}
