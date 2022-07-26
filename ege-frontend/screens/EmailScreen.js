import { Box, Text, Icon } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
export default function EmailScreen() {
    return (
        <Box flex={1} alignItems="center" justifyContent="center">
            <Icon
                color="primary.300"
                
                size={90}
                as={<MaterialCommunityIcons name="email" />}
            />
            <Text fontWeight="bold" fontSize="24">Çok Yakında...</Text>
            <Text>Zimbra Mail Kutusu...</Text>
        </Box>
    )
}
