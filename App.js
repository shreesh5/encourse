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
import SigninScreen from './src/screens/SigninScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import ProfileScreen from './src/screens/ProfileScreen';

import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as CourseProvider} from './src/context/CourseContext';
import {setNavigator} from './src/navigationRef';

const loginFlow = createStackNavigator({
  Signin: SigninScreen,
});

const courseListFlow = createStackNavigator({
  CourseList: CourseListScreen,
});

courseListFlow.navigationOptions = {
  title: 'Courses',
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
    courseListFlow,
    profileFlow,
  }),
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
