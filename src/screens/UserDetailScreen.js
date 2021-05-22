import React from 'react';
import {View} from 'react-native';
import {UserDetailStyles as styles} from '../styles/UserDetail';
import UserForm from '../components/UserForm';
import courseApi from '../api/course';

const UserDetailScreen = ({navigation}) => {
  const updateUser = async ({
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
      navigation.pop();
      console.log('response', response);
    } catch (error) {
      console.log('error in update user response', error);
    }
  };

  return (
    <View style={styles.contentView}>
      <UserForm user={navigation.getParam('user')} onSubmit={updateUser} />
    </View>
  );
};

export default UserDetailScreen;
