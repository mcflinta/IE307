import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  const dot1 = useRef(new Animated.Value(1)).current;
  const dot2 = useRef(new Animated.Value(1)).current;
  const dot3 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Hàm tạo hoạt ảnh cho từng chấm
    const animateDots = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot1, {
            toValue: 1.5, // To lên
            duration: 100, // 100ms
            useNativeDriver: true,
          }),
          Animated.timing(dot1, {
            toValue: 1, // Thu nhỏ lại
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
        ]),
      ).start();
    };

    animateDots(); // Bắt đầu hiệu ứng
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
    flexDirection: 'row', // Hiển thị các chấm theo hàng ngang
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5, // Tạo hình tròn
    backgroundColor: '#FFF', // Màu trắng
    marginHorizontal: 5, // Khoảng cách giữa các chấm
  },
});

export default LoadingScreen;
