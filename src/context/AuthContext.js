import {useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import courseApi from '../api/course';
import {navigate} from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'signin':
      return {
        errorMessage: '',
        token: action.payload.token,
        role: action.payload.role,
        pk: action.payload.pk,
        uesr: action.payload.user,
      };
    case 'save_details':
      return {...state, user: action.payload};
    case 'update_details':
      return {...state, user: action.payload};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'signout':
      return {...state, token: null, errorMessage: '', role: '', pk: null};
    default:
      return state;
  }
};

// Action to try local signin. Checks whether
// information is stored in Async Storage, if
// present, logs user in else, redirects user
// to login page.
const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  const role = await AsyncStorage.getItem('role');
  const pk = await AsyncStorage.getItem('pk');
  if (token && role && pk) {
    dispatch({type: 'signin', payload: {token, role, pk, user: null}});
    navigate('CourseList');
  } else {
    navigate('Signin');
  }
};

// Action to clear error message.
const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};

// Action to sign user up. Make API request to sign up
// with email, username, and password. If successful,
// state is modified to indicate authentication, if
// unsuccessful, then an error message is displayed.
const signup = (dispatch) => {
  return async ({username, email, password}) => {
    try {
      const response = await courseApi.post('/auth/register/', {
        username,
        email,
        password,
        is_student: true,
      });
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('role', response.data.user_role);
      await AsyncStorage.setItem('pk', `${response.data.id}`);
      dispatch({
        type: 'signin',
        payload: {
          token: response.data.token,
          role: response.data.user_role,
          pk: `${response.data.id}`,
          user: null,
        },
      });
      navigate('CourseList');
    } catch (error) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign up',
      });
    }
  };
};

// Action to sign user in. Makes API request to signin.
// If successful, state is updated to indicate authentication,
// if unsuccessful, then an error message is displayed.
const signin = (dispatch) => {
  return async ({username, password}) => {
    // try to signin
    // handle success by updating state
    // handle failure by showing error message
    try {
      const response = await courseApi.post('/auth/login/', {
        username,
        password,
      });
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('role', response.data.user_role);
      await AsyncStorage.setItem('pk', response.data.user_id);
      dispatch({
        type: 'signin',
        payload: {
          token: response.data.token,
          role: response.data.user_role,
          pk: response.data.user_id,
          user: response.data.user,
        },
      });
      navigate('CourseList');
    } catch (error) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with signin',
      });
    }
  };
};

// Action to signout. Redirects user to loginFlow
// and removes user information from Async Storage.
const signout = (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('role');
    await AsyncStorage.removeItem('pk');
    dispatch({type: 'signout'});
    navigate('loginFlow');
  };
};

// Action to retrieve user details.
const getUserDetails = (dispatch) => {
  return async (userPK) => {
    try {
      const response = await courseApi.get('/usertest/' + userPK + '/');
      console.log('response for get user details', response.data);
      dispatch({type: 'save_details', payload: response.data});
    } catch (error) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with fetching user details',
      });
    }
  };
};

// Action to update user details.
const updateUserDetails = (dispatch) => {
  return async ({id, email, username, password, school, city, country}) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await courseApi.put(`/usertest/${id}/`, {
        id,
        email,
        username,
        password,
        school,
        city,
        country,
      });
      dispatch({
        type: 'update_details',
        payload: {
          id,
          email,
          username,
          password,
          school,
          city,
          country,
        },
      });
      navigate('Settings');
    } catch (error) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with updating user details',
      });
    }
  };
};

// Using helper function to create Context and Provider.
export const {Context, Provider} = createDataContext(
  authReducer,
  {
    tryLocalSignin,
    clearErrorMessage,
    signin,
    signup,
    signout,
    getUserDetails,
    updateUserDetails,
  },
  {token: null, errorMessage: '', role: '', pk: null, user: null},
);

// Helper function for accessing CourseContext
// state and actions. Mainly used for testing
// context.
export const useAuthContext = () => useContext(Context);
