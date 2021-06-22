import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from '../login/register/registerPage';
import Message from '../message/message'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import RegisterPage from '../login/register/registerPage';


const Tab = createBottomTabNavigator();

const BottomNavbar = () => {

  const [profil, onProfil] = useState({});
  const [isConnected, onConnected] = useState(false);

  useAsync();
  function useAsync() {
      useEffect(() => {
          getLogin();
      }, []);
  }
    async function getLogin() {
      var info;
      info = await AsyncStorage.getItem('@account')
      info = JSON.parse(info);
      if (info && info.accessToken) {
          getProfilInformation();
          onConnected(true);
      }
  }
  async function getProfilInformation() {
    // onProfil(data);
  }


    return (
        <Tab.Navigator initialRouteName='Home'
          tabBarOptions={{
            activeTintColor: '#00ead3',
            inactiveTintColor: 'white',
            showLabel: true,
            style: {
              backgroundColor: '#0f4c75',
              height: 50
            }
          }}>

          <Tab.Screen listeners={({ navigation, route }) => ({
          })}
            name="Calendar" children={() => <Home isConnected={isConnected} onConnected={onConnected} />} options={{
              tabBarLabel: 'Calendar',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="calendar" color={color} size={30} />
              ),
            }}
          />
          <Tab.Screen listeners={({ navigation, route }) => ({
          })} name="Projects" children={() => <Favoris isConnected={isConnected} onConnected={onConnected} />} options={{
            tabBarLabel: 'Project',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="code-not-equal-variant" color={color} size={30} />
            ),
          }} />
          {isConnected ? <Tab.Screen listeners={({ navigation, route }) => ({ 
    })} name="Home" children={() => <Home isConnected={isConnected} onConnected={onConnected} />} options={{
      tabBarLabel: 'Home',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="home-circle" color={color} size={30} />
      ),
    }} />: <Tab.Screen listeners={({ navigation, route }) => ({ 
    })} name="Login" children={() => <Login isConnected={isConnected} onConnected={onConnected} />} options={{
      tabBarLabel: 'Login', 
      tabBarVisible: true,
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="home-circle" color={color} size={30} />
      ),
    }} />
    }
          <Tab.Screen name="Message" children={() => <Message isConnected={isConnected} onConnected={onConnected} />} options={{
            tabBarLabel: 'Message',
            tabBarBadge: 3,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="message-processing" color={color} size={30} />
            ),
          }}
          />
          <Tab.Screen name="Profil" children={() => <Login isConnected={isConnected} onConnected={onConnected} profil={profil} onProfil={onProfil} />} options={{
            tabBarLabel: 'Profil',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="badge-account-outline" color={color} size={30} />
            ),
          }} />

        </Tab.Navigator>
    );
}

export default BottomNavbar;