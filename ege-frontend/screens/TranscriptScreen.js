import { useContext, useState, useEffect } from 'react'
import { Accordion, Badge, Box, FlatList, Hidden, HStack, ScrollView, Text, VStack } from 'native-base'
import { RefreshControl, SafeAreaView } from 'react-native'
import { TranscriptCacheContext, RetriveFunctionContext } from '../functions/GlobalStates';
import { SaveActiveTranscript } from '../functions/LocalStorageFunctions';
import Expandanble from '../components/Expandanble';


export default function TranscriptScreen() {
    const [refreshing, setRefreshing] = useState(false)
    const [transcript, setTranscript] = useContext(TranscriptCacheContext)
    const RetriveFunction = useContext(RetriveFunctionContext)
    const [sections, setSections] = useState([])

    const retrive = (forced = false) => {
        RetriveFunction("transcript", forced).then(async loaded => {
            await SaveActiveTranscript(loaded);
            setTranscript(loaded);


        });
    }


    const Section = ({ title, data, ...other }) => {
        return (
            <VStack justifyItems="center" bg="blueGray.100" p={2} borderRadius={5} alignContent="center" mt={2} {...other}>
                <Text fontSize={12} mx="auto" >{title}</Text>
                <Text fontSize={10} mx="auto" >{data}</Text>
            </VStack>
        )
    }

    const reloadData = () => {

        let res = transcript?.seasons?.map(season => {
            let akts = season.annualState[1].generalAverage.split("/")[0] + " / " + season.annualState[0].seasonAverage.split("/")[0];
            return {
                title: <>
                    <Text fontWeight="bold" color="gray.700">{season.name}</Text>
                    <Text color="gray.500" fontSize={12} ml="auto" my="auto">{akts}</Text>
                </>
                , content: <>

                    {season?.courses
                        .map((course, i) =>
                        (
                            <Box  key={i + "course-area"} borderColor="blueGray.500" borderBottomWidth={0.3} >
                                <HStack bg="gray.100" p={1} >

                                    <Badge size="xs" colorScheme={course.isCompulsary?.includes("Zor") ? "warning" : "success"}>{course?.isCompulsary}</Badge>
                                    <Text m="auto"
                                        fontSize={12}
                                        isTruncated={true}
                                        noOfLines={1}
                                        maxW={"70%"}>
                                        {course.courseName}</Text>

                                </HStack>
                                <HStack bg="gray.50" justifyContent="space-between" p={2}>
                                    <Section title="Id" data={course.courseId} />
                                    <Section title="AKTS" data={course.credit_akts} />
                                    <Section
                                        title="Ağırlık"
                                        data={course.weight}
                                    />
                                    <Section title="Not" data={course.grade} />
                                    <Section title="Harf Notu" data={course.letter_grade}
                                        bg={course.letter_grade.includes("F") || course.letter_grade.includes("D")
                                            ? "red.200"
                                            : course.letter_grade.includes("C")
                                                ? "yellow.100"
                                                : course.letter_grade.includes("B")
                                                    ? "green.100"
                                                    : course.letter_grade.includes("AA")
                                                        ? "green.200"
                                                        : "blueGray.100"}
                                    />
                                </HStack>

                            </Box>

                        ))}
                </>
            }
        })
        if (transcript)
            console.log(transcript.seasons[0].annualState)
        setSections(res)
    }

    useEffect(() => {
        retrive();
        reloadData();

    }, [])

    useEffect(() => {
        reloadData();
    }, [transcript])
    const handleRefresh = async () => {
        setRefreshing(true)
        await retrive(true);
        setRefreshing(false)
    }




    return transcript ? (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
                <Box p={2} m={3} mb={2} borderColor="coolGray.500" borderRadius={5} borderWidth={0.5}>
                    <Text fontSize="2xl">{transcript.profile.nameSurname}</Text>
                    <Text color="primary.600">Genel Not Ortalaması : {transcript.profile.gano}</Text>
                    <Hidden><Text>{transcript.profile.registrationType}</Text></Hidden>
                    <Text color="primary.500">Eğitim: {transcript.profile.educationLevel}</Text>
                    <Text color="primary.500">TC Kimlik No: {transcript.profile.tcKimlik}</Text>
                </Box>
                <Expandanble data={sections} />

            </ScrollView>
        </SafeAreaView>
    ) : null
}
