import { Animated } from 'react-native';

export const createDotAnimation = (dot1, dot2, dot3) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(dot1, {
        toValue: 1.5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(dot1, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(dot2, {
        toValue: 1.5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(dot2, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(dot3, {
        toValue: 1.5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(dot3, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ])
  ).start();
};
