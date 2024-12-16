import { Alert } from 'react-native';
import tokenManager from './TokenManager';
import { loginUser, registerUser } from './authService.js';
// import registerUser from './api/registerUser';

export const handleLogin = async (email, password, navigation, setLoading) => {
  setLoading(true);
  try {
    const { user, token } = await loginUser({ email, password });
    await tokenManager.setToken(token); // Lưu token vào TokenManager
    Alert.alert('Success', 'Login successful');
    navigation.replace('DrawerNavigator', { user }); // Điều hướng đến HomeTabs
  } catch (error) {
    console.error('Login failed:', error);
    Alert.alert('Error', error.message || 'Login failed');
    navigation.goBack();
  } finally {
    setLoading(false);
  }
};

export const handleRegister = async (email, password, gender, name, navigation, setLoading) => {
  setLoading(true);
  try {
    const { user } = await registerUser({ email, password, gender, name });
    Alert.alert('Success', 'Account created successfully');
    navigation.replace('InitScreen'); // Điều hướng đến InitScreen
  } catch (error) {
    console.error('Register failed:', error);
    Alert.alert('Error', error.message || 'Register failed');
    navigation.goBack();
  } finally {
    setLoading(false);
  }
};
