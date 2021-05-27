import React from 'react';
import {View} from 'react-native';
import CourseForm from '../components/CourseForm';
import {useCourseContext} from '../context/CourseContext';

const AddCourseScreen = () => {
  const {state, createCourse} = useCourseContext();

  return (
    <View>
      <CourseForm
        headerText="Add Course"
        errorMessage={state.errorMessage}
        submitButtonText="Add Course"
        onSubmit={createCourse}
        initialValues={{
          name: '',
          duration: '',
          description: '',
          capacity: '',
        }}
        buttonTestID="addcourse-button"
      />
    </View>
  );
};

export default AddCourseScreen;
