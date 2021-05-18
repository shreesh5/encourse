import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

instance.interceptors.request.use(
  // function 1 - called automatically whenever we make a request
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  // function 2 - called automatically whenever there is an error with a request
  (error) => {
    console.log('error in api', error);
    return Promise.reject(error);
  },
);

export default instance;
