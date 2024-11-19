import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <View style={styles.container}>
      <Input placeholder="Email" onChangeText={setEmail} value={email} />
      <Input
        placeholder="Mật khẩu"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Đăng Nhập" onPress={handleLogin} />
      <Button
        title="Chưa có tài khoản? Đăng Ký"
        type="clear"
        onPress={() => navigation.navigate('Đăng Ký')}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
