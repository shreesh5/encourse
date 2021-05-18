import React, {useContext} from 'react';
import {View} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {SigninScreenStyles as styles} from '../styles/Signin';

const SigninScreen = () => {
  const {state, signin, clearErrorMessage} = useContext(AuthContext);

  return (
    <View style={styles.contentView}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="Sign In"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={signin}
      />
      <NavLink
        routeName="Signup"
        text="Don't have an account? Sign up instead."
      />
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default SigninScreen;
