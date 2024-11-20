import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NextScreen from './SignUpPwScreen';

const SignUpStack = createStackNavigator();

const SignUpFlow = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [hintText, setHintText] = useState("Don't forget to enter your email address.");

  const handleNext = (navigation) => {
    if (isValid && email) {
      navigation.navigate('Next'); // Điều hướng đến màn hình con Next
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(text) || text === '');

    if (text === '') {
      setHintText("Don't forget to enter your email address.");
    } else if (!emailRegex.test(text)) {
      setHintText("This email is invalid. Make sure it's written as example@email.com.");
    } else {
      setHintText("You'll need to confirm this email later.");
    }
  };

  return (
    <SignUpStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
      }}
    >
      <SignUpStack.Screen name="SignUpScreen" options={{ title: "Sign Up" }}>
        {({ navigation }) => (
          <View style={styles.container}>
            <Text style={styles.title}>What's your email address?</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: email ? '#fff' : '#4c4c4c',
                  color: isValid ? '#000' : '#ff0000',
                },
              ]}
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              autoCorrect={false}
              cursorColor="#fff"
            />
            <Text style={styles.hintText}>{hintText}</Text>
            <View style={styles.containerButton}>
              <TouchableOpacity
                style={[
                  styles.nextButton,
                  { backgroundColor: isValid && email ? '#fff' : '#4c4c4c' },
                ]}
                onPress={() => handleNext(navigation)}
                disabled={!isValid || !email}
              >
                <Text
                  style={[
                    styles.nextButtonText,
                    { color: isValid && email ? '#000' : '#fff' },
                  ]}
                >
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SignUpStack.Screen>
      <SignUpStack.Screen name="Next" component={NextScreen} options={{ title: "Next Step" }} />
    </SignUpStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    marginRight: 20,
    marginLeft: 20,
  },
  title: {
    marginTop: 40,
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 10,
    height: 50,
    paddingLeft: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  hintText: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 20,
  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    paddingHorizontal: 25,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUpFlow;
