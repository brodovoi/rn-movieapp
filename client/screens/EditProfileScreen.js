import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Colors, Gaps } from '../components/tokens';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Button } from '../components/Button/Button';
import * as ImagePicker from 'expo-image-picker';
import { updateUserProfile } from '../utils/api';
import { BASE_URL } from '../utils/config';

const EditProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');
  const [birthdate, setBirthdate] = useState(
    new Date(user.birthdate) || new Date()
  );
  const [photo, setPhoto] = useState(user.photo || ''); // Обновлено: используем переданную фотографию пользователя или пустую строку
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [photoChanged, setPhotoChanged] = useState(false);

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
      setPhotoChanged(true);
    }
  };

  const handleSave = async () => {
    try {
      const updatedUser = await updateUserProfile({
        name: name,
        email: email,
        phone: phone,
        birthdate: birthdate,
        photo: photo,
      });
      console.log('Обновленное: ', updatedUser);

      Alert.alert('Success', 'Profile updated successfully');
      navigation.navigate('Profile', { updatedUser });
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again later.');
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setBirthdate(date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={handleChoosePhoto}
          style={styles.photoContainer}>
          <Image
            source={
              photo
                ? { uri: photo }
                : user.photo
                ? { uri: `${BASE_URL}/${user.photo}` }
                : require('../assets/icons/avatar.png')
            }
            style={styles.profileImage}
            resizeMode="cover"
            onError={() => {
              setPhoto('');
            }}
          />
          <View style={styles.editIconContainer}>
            <Image
              source={require('../assets/icons/edit.png')}
              style={styles.editIcon}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Image
            source={require('../assets/icons/person.png')}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            source={require('../assets/icons/email.png')}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone"
            keyboardType="phone-pad"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.dateText}>{birthdate.toDateString()}</Text>
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          headerTextIOSStyle={{ color: '#fff' }}
          pickerContainerStyleIOS={{ backgroundColor: '#000' }}
          textColor={'#fff'}
          backgroundColor={'#000'}
        />

        <Button text="Save" onPress={handleSave} />
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
  content: {
    gap: Gaps.g16,
  },
  photoContainer: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    backgroundColor: '#6C38CC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2e2d3d',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    color: '#fff',
    flex: 1,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EditProfileScreen;
