import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import LoadingIndicator from '../../components/LoadingIndicator';
//21521901 - Mai Quốc Cường
const RegisterScreen = ({ navigation }) => {
  const { register, isLoading } = useContext(AuthContext);

  const [username, setUsername]   = useState('');
  const [password, setPassword]   = useState('');
  const [email, setEmail]         = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');

  const handleRegister = async () => {
    const newUser = {
      username,
      password,
      email,
      name: {
        firstname: firstName,
        lastname: lastName
      }
    };
    try {
      await register(newUser);
      Alert.alert('Success', 'Account created!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (err) {
      Alert.alert('Register Failed', err.message);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <LoadingIndicator />}

      <Text style={styles.title}>Create an account</Text>

      <TextInput
        style={styles.input}
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, isLoading && { opacity: 0.6 }]}
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </View>
  );
};
// 21521901 - Mai Quốc Cường
export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 22,
    alignSelf: 'center',
    marginBottom: 24,
    fontWeight: '700',
    color: '#333'
  },
  input: {
    height: 48,
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15
  },
  button: {
    height: 48,
    backgroundColor: '#FF6600',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600'
  },
  linkText: {
    marginTop: 16,
    textAlign: 'center'
  }
});
