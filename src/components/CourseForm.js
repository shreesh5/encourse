import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Spacer from './Spacer';
import {AuthFormStyles as styles} from '../styles/AuthForm';

const CourseForm = ({
  headerText,
  errorMessage,
  onSubmit,
  submitButtonText,
  initialValues,
  buttonTestID,
}) => {
  const [name, setName] = useState(initialValues.name);
  const [duration, setDuration] = useState(initialValues.duration);
  const [description, setDescription] = useState(initialValues.description);
  const [capacity, setCapacity] = useState(initialValues.capacity);
  const [users, setUsers] = useState(initialValues.users);

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
          placeholder="CSE 101"
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
          placeholder="1 month"
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
          placeholder="Example Description"
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
          placeholder="5"
        />
      </View>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <Spacer>
        <TouchableOpacity
          onPress={() => {
            if (initialValues.id) {
              onSubmit(
                initialValues.id,
                name,
                duration,
                description,
                capacity,
                users,
              );
            } else {
              onSubmit(name, duration, description, capacity);
            }
          }}
          testID={buttonTestID}
        >
          <View style={styles.submitButtonContainer}>
            <Text style={styles.submitButtonText}>{submitButtonText}</Text>
          </View>
        </TouchableOpacity>
      </Spacer>
    </>
  );
};

export default CourseForm;
