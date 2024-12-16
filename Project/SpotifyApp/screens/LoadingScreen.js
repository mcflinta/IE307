


import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { handleLogin, handleRegister } from '../services/authHandler';
import { createDotAnimation } from '../animations/dotAnimation';

const LoadingScreen = ({ navigation, route }) => {
  const dot1 = useRef(new Animated.Value(1)).current;
  const dot2 = useRef(new Animated.Value(1)).current;
  const dot3 = useRef(new Animated.Value(1)).current;

  const { fromScreen } = route.params || {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performAction = async () => {
      const { email, password, gender, name } = route.params || {};

      if (fromScreen === 'LoginScreen') {
        await handleLogin(email, password, navigation, setLoading);
      } else if (fromScreen === 'SignUpPolicyScreen') {
        await handleRegister(email, password, gender, name, navigation, setLoading);
      } else {
        console.warn('Unknown fromScreen:', fromScreen);
        navigation.goBack();
      }
    };

    performAction(); // Thực hiện logic dựa trên fromScreen
  }, [fromScreen, navigation, route.params]);

  useEffect(() => {
    createDotAnimation(dot1, dot2, dot3);
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, { transform: [{ scale: dot1 }] }]} />
      <Animated.View style={[styles.dot, { transform: [{ scale: dot2 }] }]} />
      <Animated.View style={[styles.dot, { transform: [{ scale: dot3 }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
  },
});

export default LoadingScreen;
