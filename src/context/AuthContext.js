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
        pk: action.payload.id,
      };
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'signout':
      return {token: null, errorMessage: '', role: '', pk: null};
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  const role = await AsyncStorage.getItem('role');
  const pk = await AsyncStorage.getItem('pk');
  if (token && role && pk) {
    dispatch({type: 'signin', payload: {token, role, pk}});
    navigate('Home');
  } else {
    navigate('Signin');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};

const signin = (dispatch) => {
  return async ({username, password}) => {
    // try to signin
    // handle success by updating state
    // handle failure by showing error message
    try {
      console.log('username', username);
      console.log('password', password);
      const response = await courseApi.post('/auth/login/', {
        username,
        password,
      });
      console.log('response', response);
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('role', response.data.user_role);
      await AsyncStorage.setItem('pk', response.data.id);
      dispatch({
        type: 'signin',
        payload: {token: response.data.token, role: response.data.user_role},
      });
      navigate('Home');
    } catch (error) {
      console.log('error in try catch', error);
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with signin',
      });
    }
  };
};

const signout = (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('role');
    await AsyncStorage.removeItem('pk');
    dispatch({type: 'signout'});
    navigate('loginFlow');
  };
};

export const {Context, Provider} = createDataContext(
  authReducer,
  {
    tryLocalSignin,
    clearErrorMessage,
    signin,
    signout,
  },
  {token: null, errorMessage: '', role: '', pk: null},
);
