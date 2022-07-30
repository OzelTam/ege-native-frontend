import { Button, ScrollView, Text } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { GradesCacheContext, RetriveFunctionContext } from '../functions/GlobalStates';
import { SaveActiveGrades } from '../functions/LocalStorageFunctions';


export default function GradesScreen() {
    const [grades, setGrades] = useContext(GradesCacheContext)
    const RetriveFunction = useContext(RetriveFunctionContext)
    const [refreshing, setRefreshing] = useState(false)

    const retrive = async (forced = false) => {
        let result = await RetriveFunction("grades", forced)
        await SaveActiveGrades(result);
        setGrades(result);

    }


    useEffect(() => {
        retrive();
    }, [])

    const handleRefresh = async () => {
        setRefreshing(true)
        await retrive(true);
        setRefreshing(false)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ flex: 1 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >

                <Text>
                    {JSON.stringify(grades)}
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}
