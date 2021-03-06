import React from 'react';
import {View} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {useAuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {SignupScreenStyles as styles} from '../styles/Signup';

// Screen for signing up.
const SignupScreen = ({navigation}) => {
  const {state, signup, clearErrorMessage} = useAuthContext();

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="Sign Up"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
        type="register"
        buttonTestID="signup-button"
      />
      <NavLink
        routeName="Signin"
        text="Already have an account? Sign in instead."
        testID="nav-signin-link"
      />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default SignupScreen;
