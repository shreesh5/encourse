import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Spacer from './Spacer';
import {AuthFormStyles as styles} from '../styles/AuthForm';

const CourseForm = ({headerText, errorMessage, onSubmit, submitButtonText}) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState(0);

  return (
    <>
      <Spacer>
        <Text style={styles.headerText}>{headerText}</Text>
      </Spacer>
      <View style={styles.labelInputContainer}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputContainer}
        />
      </View>
      <Spacer />
      <View style={styles.labelInputContainer}>
        <Text style={styles.inputLabel}>Duration</Text>
        <TextInput
          value={duration}
          onChangeText={setDuration}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputContainer}
        />
      </View>
      <Spacer />
      <View style={styles.labelInputContainer}>
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputContainer}
        />
      </View>
      <Spacer />
      <View style={styles.labelInputContainer}>
        <Text style={styles.inputLabel}>Capacity</Text>
        <TextInput
          value={capacity}
          onChangeText={setCapacity}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputContainer}
          keyboardType="number-pad"
        />
      </View>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <Spacer>
        <TouchableOpacity onPress={() => onSubmit({name, duration, description, capacity})}>
          <View style={styles.submitButtonContainer}>
            <Text style={styles.submitButtonText}>{submitButtonText}</Text>
          </View>
        </TouchableOpacity>
      </Spacer>
    </>
  );
};

export default CourseForm;
