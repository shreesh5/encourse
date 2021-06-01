import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

// Creating an instance of Axios for making API calls.
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// Intercepting API calls with functions to be called
// before a request is made and if there is any error
// in the request.
instance.interceptors.request.use(
  // Function 1 - Called automatically whenever a request is made.
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  // Function 2 - Called automatically whenever there is an error with a request.
  (error) => {
    console.log('error in api', error);
    return Promise.reject(error);
  },
);

export default instance;
