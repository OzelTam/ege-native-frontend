import { ActivityIndicator, View } from "react-native";

export default function LoadingDrop() {
    return (
        <View style={{ flex: 1 }}>
            <ActivityIndicator />
        </View>
    )
}
