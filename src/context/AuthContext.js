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
    navigate('CourseList');
  } else {
    navigate('Signin');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};

const signup = (dispatch) => {
  return async ({username, email, password}) => {
    // make api request to sign up with that username and password
    // if we sign up, modify our state, and say that we are authenticated
    // if signing up fails, we probably need to reflect an error message somewhere
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
    signup,
    signout,
  },
  {token: null, errorMessage: '', role: '', pk: null},
);
