/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './src/home/Home';
import BottomNavbar from './src/home/BottomNavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/login/connection/connection';
import { createStackNavigator} from '@react-navigation/stack';
import Register from './src/login/register/registerPage'
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';


const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const [isConnected, onConnected] = useState(false);
  const navigation = useNavigation();

  async function getLogin() {
    var info;
    info = await AsyncStorage.getItem('@account')
    info = JSON.parse(info);
    if (info && info.token) {
        // getProfilInformation();
        onConnected(true);
        if (isConnected == true) {
          navigation.navigate('Home');
      }
    }
  }

  useAsync();
  function useAsync() {
      useEffect(() => {
          getLogin();
      }, []);
  }

  
  console.log(isConnected)
  return (
    <>
      
      <NavigationContainer>
      <Stack.Navigator headerMode={"none"} initialRouteName={isConnected ? "Home" : "Login"}>
        <Stack.Screen name="Home" children={() => <BottomNavbar isConnected={isConnected} onConnected={onConnected} />} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" children={() => <Login isConnected={isConnected} onConnected={onConnected} />} />
      </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
