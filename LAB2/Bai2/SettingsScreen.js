import React, { useState } from 'react';
import { View, Alert, StyleSheet, ScrollView, Text, Image } from 'react-native';
import Header from './components/Header';
import ToggleSwitch from './components/ToggleSwitch';
import FeedbackInput from './components/FeedbackInput';
import FAQs from './components/FAQs';

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);

  const handleSendFeedback = (feedback) => {
    if (feedback.trim()) {
      setFeedbacks([feedback, ...feedbacks]);
      if (notificationsEnabled) {
        Alert.alert('Thank you for your feedback!');
      }
    }
  };

  const containerStyle = {
    backgroundColor: darkMode ? '#333' : '#fff',
    flex: 1,
  };

  const textColor = {
    color: darkMode ? '#fff' : '#000',
  };

  return (
    <View style={containerStyle}>
      <ScrollView>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Image source={require('./assets/logo.jpg')} style={styles.logo} />
          <Text style={styles.appName}>React Native App</Text>
        </View>

        {/* Dark Mode Switch */}
        <ToggleSwitch
          label="Dark Mode"
          value={darkMode}
          onValueChange={setDarkMode}
          textStyle={textColor}  // Pass text color to ToggleSwitch
        />

        {/* Notifications Switch */}
        <ToggleSwitch
          label="Enable Notifications"
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          textStyle={textColor}  // Pass text color to ToggleSwitch
        />

        {/* Feedback Input */}
        <FeedbackInput onSendFeedback={handleSendFeedback} textStyle={textColor} />

        {/* FAQs */}
        <FAQs feedbacks={feedbacks} textStyle={textColor} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default SettingsScreen;
