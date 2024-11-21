// screens/SettingsScreen.js
import React, { useContext } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { SettingsContext } from '../contexts/SettingsContext';

export default function SettingsScreen() {
  const { darkMode, fontSize, updateSettings } = useContext(SettingsContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#000' : '#fff',
      padding: 16,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    text: {
      fontSize: fontSize,
      color: darkMode ? '#fff' : '#000',
    },
    slider: {
      width: '100%',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.text}>Chế độ tối</Text>
        <Switch
          value={darkMode}
          onValueChange={(value) => updateSettings(value, fontSize)}
        />
      </View>
      <View>
        <Text style={styles.text}>Kích thước phông chữ: {fontSize}</Text>
        <Slider
          style={styles.slider}
          minimumValue={12}
          maximumValue={36}
          step={2}
          value={fontSize}
          onValueChange={(value) => updateSettings(darkMode, value)}
          minimumTrackTintColor="#2196F3"
          maximumTrackTintColor="#000000"
        />
      </View>
    </View>
  );
}
