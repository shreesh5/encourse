import courseApi from '../api/course';
import {navigate} from '../navigationRef';

export const fetchUsers = async () => {
  try {
    const response = await courseApi.get('/usertest/');
    console.log('response', response.data);
    return response.data;
  } catch (error) {
    console.log('error in get users response', error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await courseApi.delete(`/usertest/${id}/`);
    console.log('response', response);
  } catch (error) {
    console.log('error in deleting user', error);
  }
};

export const updateUser = async ({
  id,
  email,
  username,
  password,
  school,
  city,
  country,
}) => {
  try {
    const response = await courseApi.put(`/usertest/${id}/`, {
      id,
      email,
      username,
      password,
      school,
      city,
      country,
    });
    console.log('response', response);
    navigate('UserList');
  } catch (error) {
    console.log('error in update user response', error);
  }
};
