import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Spacer from './Spacer';
import {GlobalColors} from '../styles/Global';

const AuthForm = ({headerText, errorMessage, onSubmit, submitButtonText}) => {
  const [username, setusername] = useState('');
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
          onChangeText={setusername}
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

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
  headerText: {
    fontSize: 28,
    alignSelf: 'center',
  },
  labelInputContainer: {
    flexDirection: 'column',
    width: '90%',
    alignSelf: 'center',
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: GlobalColors.black,
    fontSize: 18,
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 20,
  },
  submitButtonContainer: {
    marginTop: 10,
    padding: 20,
    backgroundColor: GlobalColors.purple,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
  },
  submitButtonText: {
    color: GlobalColors.white,
    fontSize: 16,
  },
});

export default AuthForm;
