/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import HomeScreen from './src/screens/HomeScreen';
import SigninScreen from './src/screens/SigninScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import ProfileScreen from './src/screens/ProfileScreen';

import {Provider as AuthProvider} from './src/context/AuthContext';
import {setNavigator} from './src/navigationRef';

const loginFlow = createStackNavigator({
  Signin: SigninScreen,
});

const homeFlow = createStackNavigator({
  Home: HomeScreen,
});

homeFlow.navigationOptions = {
  title: 'Home',
};

const profileFlow = createStackNavigator({
  Profile: ProfileScreen,
});

profileFlow.navigationOptions = {
  title: 'Profile',
};

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow,
  mainFlow: createBottomTabNavigator({
    homeFlow,
    profileFlow,
  }),
});

const App = createAppContainer(switchNavigator);
export default () => {
  return (
    <>
      <AuthProvider>
        <App
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        />
      </AuthProvider>
    </>
  );
};
