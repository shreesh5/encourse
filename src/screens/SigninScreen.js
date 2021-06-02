import React from 'react';
import {View} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {useAuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {SigninScreenStyles as styles} from '../styles/Signin';

// Screen for signing in.
const SigninScreen = () => {
  const {state, signin, clearErrorMessage} = useAuthContext();

  return (
    <View style={styles.contentView}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="Sign In"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={signin}
        buttonTestID="signin-button"
      />
      <NavLink
        routeName="Signup"
        text="Don't have an account? Sign up instead."
        testID="nav-signup-link"
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
