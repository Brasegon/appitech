import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import SearchBarHome from './searchBar/searchBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from '../login/login';
import Favoris from './favoris/Favoris';
import Message from '../message/message'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';


const Tab = createBottomTabNavigator();

const BottomNavbar = () => {

  const [profil, onProfil] = useState({});
  const [isConnected, onConnected] = useState(false);
  const [listFavorite, onFavorite] = useState([]);
  const [search, onSearch] = useState("");
  const [listImage, onListImage] = useState([]);

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
    var result = await httpClient("https://api.imgur.com/3/account/me", "GET");
    var images = await httpClient("https://api.imgur.com/3/account/me/images", "GET");
    var data = {data: result.data, images: images.data }
    console.log(data);
    onProfil(data);
  }
  async function searchImage() {
    var result = await httpClient("https://api.imgur.com/3/account/me/favorites", "GET", undefined);
    onFavorite([]);
    for (var i = 0; i < result.data.length; i += 1) {
        onFavorite(listFavorite => [...listFavorite, result.data[i]]);
    }
  }
  async function searchImagev1() {
    var result = await httpClient("https://api.imgur.com/3/gallery/search/?q=" + search, "GET", undefined);
    onListImage([]);
    for (var i = 0; i < result.data.length; i += 1) {
        onListImage(listImage => [...listImage, result.data[i]]);
    }
}
    return (
    <Tab.Navigator tabBarOptions={{
        activeTintColor: '#00ead3',
        inactiveTintColor: 'white',
        showLabel: true,
        style: {
          backgroundColor: '#0f4c75',
        }
      }}>
    
      <Tab.Screen listeners={({ navigation, route }) => ({
                tabPress: e => {
                  searchImagev1();
                },
            })}
            name="Calendar" children={() => <Home listImage={listImage} onListImage={onListImage} search={search} onSearch={onSearch} isConnected={isConnected} onConnected={onConnected}/>} options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={30} />
          ),
        }}
        />
      <Tab.Screen listeners={({ navigation, route }) => ({
                tabPress: e => {
                  searchImage();
                },
            })} name="Projects" children={() => <Favoris listFavorite={listFavorite} onFavorite={onFavorite} isConnected={isConnected} onConnected={onConnected}/>} options={{
          tabBarLabel: 'Project',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="code-not-equal-variant" color={color} size={30} />
          ),
        }}/>
        <Tab.Screen listeners={({ navigation, route }) => ({
                tabPress: e => {
                  searchImage();
                },
            })} name="Home" children={() => <Home listFavorite={listFavorite} onFavorite={onFavorite} isConnected={isConnected} onConnected={onConnected}/>} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-circle" color={color} size={30} />
          ),
        }}/>
      <Tab.Screen name="Message" children={() => <Message isConnected={isConnected} onConnected={onConnected}/>} options={{
          tabBarLabel: 'Message',
          tabBarBadge: 3,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-processing" color={color} size={30} />
          ),
        }}
       />
      <Tab.Screen name="Profil" children={() => <Login isConnected={isConnected} onConnected={onConnected} profil={profil} onProfil={onProfil}/>} options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="badge-account-outline" color={color} size={30} />
          ),
        }}/>
      
    </Tab.Navigator>
  );
}

export default BottomNavbar;