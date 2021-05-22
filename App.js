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
import SignupScreen from './src/screens/SignupScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AddCourseScreen from './src/screens/AddCourseScreen';
import UserListScreen from './src/screens/UserListScreen';

import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as CourseProvider} from './src/context/CourseContext';
import {setNavigator} from './src/navigationRef';
import {GlobalColors} from './src/styles/Global';
import Icon from 'react-native-vector-icons/Feather';
import UserDetailScreen from './src/screens/UserDetailScreen';
import EditCourseScreen from './src/screens/EditCourseScreen';

const loginFlow = createStackNavigator({
  Signin: SigninScreen,
  Signup: SignupScreen,
});

const courseListFlow = createStackNavigator({
  CourseList: CourseListScreen,
  CourseDetail: CourseDetailScreen,
  EditCourse: EditCourseScreen,
});

courseListFlow.navigationOptions = {
  title: 'Courses',
  tabBarIcon: ({tintColor}) => <Icon name="book" size={25} color={tintColor} />,
};

const settingsFlow = createStackNavigator({
  Settings: ProfileScreen,
  AddCourse: AddCourseScreen,
  UserList: UserListScreen,
  UserDetail: UserDetailScreen,
});

settingsFlow.navigationOptions = {
  title: 'Settings',
  tabBarIcon: ({tintColor}) => (
    <Icon name="settings" size={25} color={tintColor} />
  ),
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
