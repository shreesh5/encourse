import React from 'react';
import {View} from 'react-native';
import {useAuthContext} from '../context/AuthContext';
import {UserDetailStyles as styles} from '../styles/UserDetail';
import UserForm from '../components/UserForm';

const EditProfileScreen = ({navigation}) => {
  const {state, updateUserDetails} = useAuthContext();

  return (
    <View style={styles.contentView}>
      <UserForm user={state.user} onSubmit={updateUserDetails} />
    </View>
  );
};

export default EditProfileScreen;
