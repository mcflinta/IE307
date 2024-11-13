import React, { useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Animated } from 'react-native';

const FAQs = ({ feedbacks, textStyle }) => {
  const slideAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [feedbacks]);

  const renderFeedbackItem = ({ item }) => {
    return (
      <Animated.View style={[styles.feedbackItem, { transform: [{ translateY: slideAnim }] }]}>
        <Text style={[styles.questionLabel, textStyle]}>
          Q: <Text style={styles.feedbackText}>{item}</Text>
        </Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.faqContainer}>
      <Text style={[styles.faqTitle, textStyle]}>Frequently Asked Questions</Text>
      <FlatList
        data={feedbacks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderFeedbackItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  faqContainer: {
    padding: 20,
    marginTop: 20,
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feedbackItem: {
    paddingVertical: 8,
  },
  questionLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
});

export default FAQs;