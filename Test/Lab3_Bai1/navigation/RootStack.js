import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailScreen';
const RootStack = createNativeStackNavigator({
    initialRouteName: 'Home',
    screens: {
        Home: HomeScreen,
        Details: DetailsScreen,
    }
});

export default RootStack;