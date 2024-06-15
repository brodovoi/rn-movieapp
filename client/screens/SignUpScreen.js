// frontend/screens/SignUpScreen.js
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { register } from '../utils/api'; // Импорт функции register
import { ErrorNotification } from '../components/ErrorNotification/ErrorNotification';
import { Colors, Gaps } from '../components/tokens';
import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (!name) {
      setError('Please enter your name');
      return;
    }

    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    try {
      const data = await register(name, email, password);
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
        navigation.replace('AppTabs');
      } else {
        Alert.alert('Error', 'Failed to sign up');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <ErrorNotification error={error} />
      <View style={styles.content}>
        <Text style={{ color: '#fff' }}>Sign Up</Text>

        <Input onChangeText={setName} value={name} placeholder="Name" />
        <Input onChangeText={setEmail} value={email} placeholder="Email" />
        <Input
          onChangeText={setPassword}
          value={password}
          isPassword
          placeholder="Password"
        />
        <Button text="Sign Up" onPress={handleSignUp} />
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

export default SignUpScreen;
