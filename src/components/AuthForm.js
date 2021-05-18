import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Spacer from './Spacer';
import {AuthFormStyles as styles} from '../styles/AuthForm';

const AuthForm = ({headerText, errorMessage, onSubmit, submitButtonText}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Spacer>
        <Text style={styles.headerText}>{headerText}</Text>
      </Spacer>
      <View style={styles.labelInputContainer}>
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputContainer}
        />
      </View>
      <Spacer />
      <View style={styles.labelInputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          style={styles.inputContainer}
        />
      </View>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <Spacer>
        <TouchableOpacity onPress={() => onSubmit({username, password})}>
          <View style={styles.submitButtonContainer}>
            <Text style={styles.submitButtonText}>{submitButtonText}</Text>
          </View>
        </TouchableOpacity>
      </Spacer>
    </>
  );
};

export default AuthForm;
