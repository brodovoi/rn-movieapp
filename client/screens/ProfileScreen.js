import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../utils/api';

import { Button } from '../components/Button/Button';
import { BASE_URL } from '../utils/config';
import { Colors, Fonts, Radius, Gaps } from '../components/tokens';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({ name: '', email: '', photo: '' });
  const route = useRoute();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to load user data');
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (route.params?.updatedUser) {
      setUser(route.params.updatedUser);
    }
  }, [route.params?.updatedUser]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { user }); // Передача всего пользователя на страницу редактирования
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={
            user && user.photo
              ? { uri: `${BASE_URL}/${user.photo}` }
              : require('../assets/icons/avatar.png')
          }
          style={styles.profileImage}
          resizeMode="cover"
          onError={() => {
            setUser((prevState) => ({ ...prevState, photo: '' }));
          }}
        />
        <Text style={{ ...styles.text, ...styles.name }}>{user.name}</Text>
        <Text style={styles.text}>{user.email}</Text>
        <TouchableOpacity
          style={styles.editProfileLink}
          onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <Button text="Выйти" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: Colors.black,
  },

  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#fff',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
  editProfileLink: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 58,
    borderRadius: 10,
    borderWidth: 1,
    color: Colors.white,
    marginBottom: 20,
    borderRadius: Radius.r10,
    borderColor: '#fff',
  },
  buttonText: {
    color: Colors.white,
    fontSize: Fonts.f18,
    fontFamily: Fonts.regular,
  },
});

export default ProfileScreen;
