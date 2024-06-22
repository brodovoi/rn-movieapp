// вот app.js где роуты
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MainScreen from './screens/MainScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import SearchScreen from './screens/SearchScreen';
import HomeScreen from './screens/HomeScreen';
import SwipeScreen from './screens/SwipeScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import SwipeIcon from './assets/icons/swipe';
import ActorDetailsScreen from './screens/ActorDetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0c0c0c',
          shadowColor: 'transparent',
        },
        headerTintColor: '#fff',
        headerLeftContainerStyle: {
          paddingLeft: 30,
          paddingTop: 20,
        },
      }}>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#0c0c0c',
          shadowColor: 'transparent',
        },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#0c0c0c',
          borderTopWidth: 0, // Уберите верхнюю границу
          elevation: 0, // Уберите тень на Android
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Search') {
            iconName = 'search-outline';
          } else if (route.name === 'ProfileStack') {
            iconName = 'person-outline';
          } else if (route.name === 'Swipe') {
            iconName = 'shuffle-outline';
          } else if (route.name === 'Bookmarks') {
            iconName = 'bookmark-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Swipe" component={SwipeScreen} />
      <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0c0c0c',
          shadowColor: 'transparent',
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Edit Profile',
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="AppTabs" component={AppTabs} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
        <Stack.Screen name="ActorDetails" component={ActorDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
