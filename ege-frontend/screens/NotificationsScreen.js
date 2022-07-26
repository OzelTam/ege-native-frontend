import { Box, Text, Icon } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'


export default function NotificationsScreen() {
    return (
        <Box flex={1} alignItems="center" justifyContent="center">
            <Icon
                color="primary.500"
                size={90}
                as={<MaterialCommunityIcons name="notification-clear-all" />}
            />
            <Text fontWeight="bold" fontSize="24">Çok Yakında...</Text>
            <Text>Not Girdileri, Egeders Bildirimleri ve daha fazlası...</Text>
        </Box>
    )
}
