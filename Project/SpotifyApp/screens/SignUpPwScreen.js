import React, {useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
const SignUpPwScreen = ({ navigation }) => {
  const [password, setPassword] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const route = useRoute();
  const { email } = route.params || {};
  useEffect(() => {
    // Log để kiểm tra email nhận được
    console.log("Email received:", email);
}, [email]);

  const handlePasswordChange = (text) => {
    setPassword(text);

    // Kiểm tra điều kiện: Độ dài >= 10, có ít nhất 1 số hoặc 1 ký tự đặc biệt
    const hasNumberOrSpecialChar = /[0-9!@#$%^&*]/.test(text); // Kiểm tra số hoặc ký tự đặc biệt
    const isLongEnough = text.length >= 10;

    setIsValid(isLongEnough && hasNumberOrSpecialChar);
  };

  const handleNext = () => {
    // console.log("Password:", password);
    navigation.navigate('SignUpGenderScreen', {email, password}); // Navigate to the next screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: password ? '#fff' : '#4c4c4c', // Gray if empty, white if filled
              color: isValid ? '#000' : '#ff0000', // Red text if invalid
            },
          ]}
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
          returnKeyType="next"
          autoCorrect={false}
          cursorColor="#fff"
          placeholder="Enter your password"
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.hintText}>
        {!isValid && password.length < 10 && 'Your password needs to be at least 10 characters long.'}
        {!isValid && password.length >= 10 && 'Your password should contain at least 10 characters. We recommend including at least 1 number or 1 special character.'}
      </Text>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            { backgroundColor: isValid ? '#fff' : '#4c4c4c' },
          ]}
          onPress={handleNext}
          disabled={!isValid}
        >
          <Text
            style={[
              styles.nextButtonText,
              { color: isValid ? '#000' : '#fff' },
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 40,
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  inputContainer: {
    position: 'relative',
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    height: 50,
    paddingLeft: 10,
    paddingRight: 50,
    borderRadius: 5,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 13,
  },
  hintText: {
    color: '#fff',
    fontSize: 12.5,
    marginBottom: 20,
  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
};

export default SignUpPwScreen;
