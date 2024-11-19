import React from "react";
import { View, Text} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
const HomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>Home Screen</Text>
            <Button title="Go to Details" onPress={() =>
                navigation.navigate('Details')}>
                Go to Details
            </Button>
        </View>
    )
}
export default HomeScreen;