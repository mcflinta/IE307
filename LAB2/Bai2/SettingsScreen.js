import React, { useState } from 'react';
import { View, Alert, StyleSheet, FlatList } from 'react-native';
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

  const textColor = darkMode ? styles.darkText : styles.lightText;

  const renderItem = ({ item }) => (
    <View>
      {item}
    </View>
  );

  const data = [
    <Header darkMode={darkMode} />,
    <ToggleSwitch
      label="Dark Mode"
      value={darkMode}
      onValueChange={setDarkMode}
      textStyle={textColor}
    />,
    <ToggleSwitch
      label="Enable Notifications"
      value={notificationsEnabled}
      onValueChange={setNotificationsEnabled}
      textStyle={textColor}
    />,
    <FeedbackInput onSendFeedback={handleSendFeedback} textStyle={textColor} />,
    <FAQs feedbacks={feedbacks} textStyle={textColor} />
  ];

  return (
    <View style={containerStyle}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
});

export default SettingsScreen;