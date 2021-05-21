import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Spacer from './Spacer';
import {AuthFormStyles as styles} from '../styles/AuthForm';

const UserForm = ({user, onSubmit}) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [school, setSchool] = useState(user.school);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);

  return (
    <>
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
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputContainer}
        />
      </View>
      <Spacer />
      <View style={styles.labelInputContainer}>
        <Text style={styles.inputLabel}>School</Text>
        <TextInput
          value={school}
          onChangeText={setSchool}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputContainer}
        />
      </View>
      <Spacer />
      <View style={styles.labelInputContainer}>
        <Text style={styles.inputLabel}>City</Text>
        <TextInput
          value={city}
          onChangeText={setCity}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputContainer}
        />
      </View>
      <Spacer />
      <View style={styles.labelInputContainer}>
        <Text style={styles.inputLabel}>City</Text>
        <TextInput
          value={country}
          onChangeText={setCountry}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputContainer}
        />
      </View>
      <Spacer>
        <TouchableOpacity
          onPress={() =>
            onSubmit({
              id: user.id,
              email,
              username,
              school,
              city,
              country,
            })
          }
        >
          <View style={styles.submitButtonContainer}>
            <Text style={styles.submitButtonText}>Save</Text>
          </View>
        </TouchableOpacity>
      </Spacer>
    </>
  );
};

export default UserForm;
