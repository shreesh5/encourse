import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Spacer from './Spacer';
import {AuthFormStyles as styles} from '../styles/AuthForm';

const AuthForm = ({
  headerText,
  errorMessage,
  onSubmit,
  submitButtonText,
  type,
  buttonTestID,
}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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
          placeholder="Username"
        />
      </View>
      {type === 'register' && (
        <>
          <Spacer />
          <View style={styles.labelInputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputContainer}
              placeholder="Email"
            />
          </View>
        </>
      )}
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
          placeholder="Password"
        />
      </View>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <TouchableOpacity
          onPress={() => onSubmit({username, email, password})}
          testID={buttonTestID}>
          <View style={styles.submitButtonContainer}>
            <Text style={styles.submitButtonText}>{submitButtonText}</Text>
          </View>
        </TouchableOpacity>
      </Spacer>
    </>
  );
};

export default AuthForm;
