import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {Context as AuthContext} from '../context/AuthContext';
import {SigninScreenStyles as styles} from '../styles/Signin';

const SigninScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {state, signin, clearErrorMessage} = useContext(AuthContext);

  return (
    <View style={styles.contentView}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <Text>Welcome to the LoginScreen</Text>
      <View style={styles.inputView}>
        <Text>Username:</Text>
        <TextInput
          placeholder="Username"
          onChangeText={setUsername}
          autoCapitalize="none"
          style={styles.textInputView}
        />
      </View>
      <View style={styles.inputView}>
        <Text>Password:</Text>
        <TextInput
          placeholder="Password"
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
          style={styles.textInputView}
        />
      </View>
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
      <Button title="Login" onPress={() => signin({username, password})} />
    </View>
  );
};

export default SigninScreen;
