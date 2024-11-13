// 21521901 - Mai Quốc Cường
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const FeedbackInput = ({ onSendFeedback, textStyle }) => {
  const [feedback, setFeedback] = useState('');

  const handleSend = () => {
    if (feedback.trim()) {
      onSendFeedback(feedback);
      setFeedback('');
    }
  };

  return (
    <View style={styles.feedbackContainer}>
      <TextInput
        style={[styles.input, textStyle]}
        placeholder="Enter your feedback here..."
        placeholderTextColor={textStyle.color === '#fff' ? '#aaa' : '#666'}  // Placeholder color based on theme
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      <Button title="Send Feedback" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  feedbackContainer: {
    padding: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    minHeight: 60,
  },
});

export default FeedbackInput;
