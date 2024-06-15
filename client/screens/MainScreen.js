// MainScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from '../components/Button/Button';
import { Colors, Gaps } from '../components/tokens';
import { Input } from '../components/Input/Input';

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Знайди, що подивитися сьогодні ввечері</Text>
        <Image
          style={styles.image}
          source={require('../assets/welcome.png')}
          resizeMode="contain"
        />
        <Button
          text="Реєстрація"
          onPress={() => navigation.navigate('SignUp')}
        />
        <Button text="Увійти" onPress={() => navigation.navigate('Login')} />

        <Text style={{ color: '#ffffff', textAlign: 'center' }}>
          Відновити пароль
        </Text>
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
    // alignItems: 'center',
    gap: Gaps.g30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 220,
    height: 300,
    alignSelf: 'center',
  },
});

export default MainScreen;
