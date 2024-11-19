import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { AuthContext } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);

  const handleRegister = () => {
    register(username, email, password);
  };

  return (
    <View style={styles.container}>
      <Input placeholder="Tên đăng nhập" onChangeText={setUsername} value={username} />
      <Input placeholder="Email" onChangeText={setEmail} value={email} />
      <Input
        placeholder="Mật khẩu"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Đăng Ký" onPress={handleRegister} />
      <Button
        title="Đã có tài khoản? Đăng Nhập"
        type="clear"
        onPress={() => navigation.navigate('Đăng Nhập')}
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
