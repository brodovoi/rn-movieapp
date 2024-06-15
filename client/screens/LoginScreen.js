// frontend/screens/LoginScreen.js

import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../utils/api'; // Импорт функции login
import { Input } from '../components/Input/Input';
import { Colors, Gaps } from '../components/tokens';
import { Button } from '../components/Button/Button';
import { ErrorNotification } from '../components/ErrorNotification/ErrorNotification';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    try {
      const data = await login(email, password);
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
        navigation.replace('AppTabs');
      } else {
        // Alert.alert('Error', 'Invalid credentials');
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      // Alert.alert('Error', 'Something went wrong');
      setError('Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <ErrorNotification error={error} />
      <View style={styles.content}>
        <Text style={{ color: '#fff' }}>Login</Text>
        <Input value={email} onChangeText={setEmail} placeholder="Email" />
        <Input onChangeText={setPassword} isPassword placeholder="Password" />
        <Button text="Войти" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 30,
    backgroundColor: Colors.black,
  },
  content: {
    gap: Gaps.g30,
  },
  form: {
    alignSelf: 'stretch',
    gap: Gaps.g16,
  },
  input: {
    backgroundColor: '#2e2d3d',
  },
  logo: {
    width: 220,
  },
});

export default LoginScreen;
