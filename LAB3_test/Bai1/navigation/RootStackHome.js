import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import HomeDetailsScreen from '../screens/HomeDetailsScreen';

const RootStackHome = createNativeStackNavigator({
  initialRouteName: 'HomeScreen',
  screens: [
    {
      name: 'HomeScreen',
      component: HomeScreen,
    },
    {
      name: 'HomeDetailsScreen',
      component: HomeDetailsScreen,
    },
  ],
});


export default RootStackHome;
