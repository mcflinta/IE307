// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import SpotifyIcon from '../assets/svg/SpotifyIcon.svg';
// import ActionButtons from '../components/ActionButtons';
// import { LinearGradient } from 'expo-linear-gradient';

// const InitScreen = ({ navigation }) => {
//   return (
//     <LinearGradient style={styles.container}
//     colors={['#1c1c1c', '#000000']}>
//       <View style={styles.logoContainer}>
//         <SpotifyIcon width={60} height={60} />
//       </View>

//       <Text style={styles.title}>
//         Hang trieu bai hat.{"\n"}Mien phi tren Spotify.
//       </Text>

//       <ActionButtons navigation={navigation} />
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//   },
//   logoContainer: {
//     marginTop: 220,
//     alignItems: 'center',
//   },
//   title: {
//     textAlign: 'center',
//     color: '#fff',
//     fontSize: 30,
//     fontFamily: 'Spotify-font',
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
// });

// export default InitScreen;
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SpotifyIcon from '../assets/svg/SpotifyIcon.svg';
import ActionButtons from '../components/ActionButtons';
import { LinearGradient } from 'expo-linear-gradient';

const InitScreen = ({ navigation }) => {
  return (
    <LinearGradient 
      style={styles.container}
      colors={['#1c1c1c', '#000000']}
    >
      <View style={styles.logoContainer}>
        <SpotifyIcon width={60} height={60} />
      </View>

      <Text style={styles.title}>
        Hàng triệu bài hát.{"\n"}Miễn phí trên Spotify.
      </Text>

      {/* Gọi ActionButtons và truyền navigation */}
      <ActionButtons navigation={navigation} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    marginTop: 220,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Spotify-font',
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default InitScreen;
