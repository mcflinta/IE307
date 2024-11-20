import React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import PhoneIcon from '../assets/svg/PhoneIcon.svg';
import GoogleIcon from '../assets/svg/GoogleIcon.svg';
import FacebookIcon from '../assets/svg/FacebookIcon.svg';

const ActionButtons = () => {
  return (
    <View style={styles.buttonsContainer}>
      {/* Button "Sign up for free" */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.signupButton,
          pressed && styles.buttonPressedSignUp,
        ]}
        onPress={() => alert('Sign up free pressed!')}
      >
        <Text style={[styles.buttonText, { color: '#000' }]}>Sign up for free</Text>
      </Pressable>

      {/* Button "Continue with phone number" */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => alert('Continue with phone number pressed!')}
      >
        <PhoneIcon width={25} height={24} style={styles.icon} />
        <Text style={styles.buttonText}>Continue with phone number</Text>
      </Pressable>

      {/* Button "Continue with Google" */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => alert('Continue with Google pressed!')}
      >
        <GoogleIcon width={25} height={24} style={styles.icon} />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </Pressable>

      {/* Button "Continue with Facebook" */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => alert('Continue with Facebook pressed!')}
      >
        <FacebookIcon width={25} height={24} style={styles.icon} />
        <Text style={styles.buttonText}>Continue with Facebook</Text>
      </Pressable>

      {/* Button "Log in" */}
      <Pressable
        style={({ pressed }) => [
          pressed && styles.buttonPressLogin,
        ]}
        onPress={() => alert('Log in pressed!')}
      >
        <Text style={styles.loginText}>Log in</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 140,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: '#fff',
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 10,
    width: '95%',
  },
  signupButton: {
    backgroundColor: '#3be477',
    borderWidth: 0,
  },
  buttonPressed: {
    backgroundColor: '#555555',
    transform: [{ scale: 0.96 }],
  },
  buttonPressedSignUp: {
    backgroundColor: '#1abc54',
    transform: [{ scale: 0.96 }],
  },
  buttonPressLogin: {
    transform: [{ scale: 0.96 }],
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
    fontFamily: 'Spotify-font',
    color: '#fff',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    fontFamily: 'Spotify-font',
  },
  icon: {
    position: 'absolute',
    left: 15,
  },
});

export default ActionButtons;
