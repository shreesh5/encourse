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

import CourseListScreen from './src/screens/CourseListScreen';
import CourseDetailScreen from './src/screens/CourseDetailScreen';
import SigninScreen from './src/screens/SigninScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import ProfileScreen from './src/screens/ProfileScreen';

import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as CourseProvider} from './src/context/CourseContext';
import {setNavigator} from './src/navigationRef';
import {GlobalColors} from './src/styles/Global';

const loginFlow = createStackNavigator({
  Signin: SigninScreen,
});

const courseListFlow = createStackNavigator({
  CourseList: CourseListScreen,
  CourseDetail: CourseDetailScreen,
});

courseListFlow.navigationOptions = {
  title: 'Courses',
};

const settingsFlow = createStackNavigator({
  Settings: ProfileScreen,
});

settingsFlow.navigationOptions = {
  title: 'Settings',
};

const mainFlow = createBottomTabNavigator(
  {
    courseListFlow,
    settingsFlow,
  },
  {
    tabBarOptions: {
      activeTintColor: GlobalColors.purple,
      inactiveTintColor: GlobalColors.grey,
      labelStyle: {fontSize: 15},
    },
  },
);

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow,
  mainFlow,
});

const App = createAppContainer(switchNavigator);
export default () => {
  return (
    <>
      <AuthProvider>
        <CourseProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </CourseProvider>
      </AuthProvider>
    </>
  );
};
