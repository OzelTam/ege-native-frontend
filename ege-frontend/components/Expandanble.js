import { Box, HStack, Pressable, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { LayoutAnimation } from "react-native";


export default function Expandanble({ data }) {
    const [expanded, setExpanded] = useState(null);


    const handleExpand = (item, index) => {
        LayoutAnimation.easeInEaseOut();
        setExpanded(expanded === item ? null : item);

    }

    return (
        <VStack space={1} m={3} >
            {
                data?.map((item, index) => (
                    <>
                        <Pressable onPress={() => handleExpand(item, index)}>

                            < HStack borderColor="gray.300" p="1" borderWidth={0.3} borderRadius={5} >

                                {
                                    !React.isValidElement(item.title)
                                        ? <Text>{JSON.stringify(item.title)}</Text>
                                        : item.title
                                }

                            </HStack>
                        </Pressable>

                        <Box height={expanded === item ? null : 0} opacity={expanded === item ? 1 : 0}>
                            {
                                !React.isValidElement(item.content)
                                    ? <Text>{JSON.stringify(item.content)}</Text>
                                    : item.content
                            }
                        </Box>
                    </>
                ))
            }
        </VStack>
    )
}
