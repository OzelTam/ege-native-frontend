import { useContext, useState, useEffect } from 'react'
import { Button, ScrollView, Text } from 'native-base'
import { RefreshControl, SafeAreaView } from 'react-native'
import { TranscriptCacheContext, RetriveFunctionContext } from '../functions/GlobalStates';
import { LoadActiveTranscript, SaveActiveTranscript } from '../functions/LocalStorageFunctions';


export default function TranscriptScreen() {
    const [refreshing, setRefreshing] = useState(false)
    const [transcript, setTranscript] = useContext(TranscriptCacheContext)
    const RetriveFunction = useContext(RetriveFunctionContext)

    const retrive = (forced = false) => {
        RetriveFunction("transcript", forced).then(async loaded => {
            await SaveActiveTranscript(loaded);
            setTranscript(loaded);

        });
    }

    useEffect(() => {
        retrive();
    }, [])

    const handleRefresh = async () => {
        setRefreshing(true)
        await retrive(true);
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

                <Button onPress={() => retrive()}>Hello</Button>
                <Text>
                    {JSON.stringify(transcript?.seasons?.map(season => season))}
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}
