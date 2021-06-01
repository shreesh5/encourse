import React from 'react';
import {View} from 'react-native';
import {UserDetailStyles as styles} from '../styles/UserDetail';
import UserForm from '../components/UserForm';
import {updateUser} from '../services/users';

const UserDetailScreen = ({navigation}) => {
  return (
    <View style={styles.contentView}>
      <UserForm user={navigation.getParam('user')} onSubmit={updateUser} />
    </View>
  );
};

export default UserDetailScreen;
