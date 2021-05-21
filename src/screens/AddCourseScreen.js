import React, {useContext} from 'react';
import {View} from 'react-native';
import CourseForm from '../components/CourseForm';
import {Context as CourseContext} from '../context/CourseContext';

const AddCourseScreen = () => {
  const {state, createCourse} = useContext(CourseContext);

  return (
    <View>
      <CourseForm
        headerText="Add Course"
        errorMessage={state.errorMessage}
        submitButtonText="Add Course"
        onSubmit={createCourse}
      />
    </View>
  );
};

export default AddCourseScreen;
