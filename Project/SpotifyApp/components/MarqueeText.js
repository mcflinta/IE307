// MarqueeText.js
import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

const MarqueeText = ({ text, style, duration = 10000 }) => {
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (textWidth > containerWidth) {
      const totalDistance = textWidth + containerWidth;
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(scrollAnim, {
            toValue: -textWidth,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(scrollAnim, {
            toValue: containerWidth,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();

      return () => animation.stop();
    }
  }, [textWidth, containerWidth, scrollAnim, duration]);

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <Animated.Text
        style={[
          style,
          {
            transform: [{ translateX: scrollAnim }],
          },
        ]}
        onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
        numberOfLines={1}
        ellipsizeMode="clip"
      >
        {text}
      </Animated.Text>
      {textWidth > containerWidth && (
        <Animated.Text
          style={[
            style,
            {
              transform: [{ translateX: scrollAnim }],
              position: 'absolute',
              left: textWidth + 20, // Khoảng cách giữa hai bản sao
            },
          ]}
          numberOfLines={1}
          ellipsizeMode="clip"
        >
          {text}
        </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
});

export default MarqueeText;
