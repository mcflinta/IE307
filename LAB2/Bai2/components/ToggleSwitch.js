import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const ToggleSwitch = ({ label, value, onValueChange, textStyle }) => (
  <View style={styles.switchContainer}>
    <Text style={[styles.label, textStyle]}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onValueChange}
      thumbColor={value ? '#00C2A8' : '#FFFFFF'}
      trackColor={{ false: '#767577', true: '#00C2A8' }}
      ios_backgroundColor="#3e3e3e"
      style={styles.switch}
    />
  </View>
);

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
});

export default ToggleSwitch;