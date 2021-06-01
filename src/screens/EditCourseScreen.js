import React, {useState} from 'react';
import {View} from 'react-native';
import {useCourseContext} from '../context/CourseContext';
import {CourseStyles as styles} from '../styles/Course';
import CourseForm from '../components/CourseForm';

// Screen for editing an existing course.
const EditCourseScreen = ({navigation}) => {
  // eslint-disable-next-line no-unused-vars
  const [course, setCourse] = useState(navigation.getParam('course'));
  const {state: courseState, updateCourse} = useCourseContext();

  return (
    <View style={styles.contentView}>
      <CourseForm
        buttonTestID="updatecourse-button"
        headerText="Edit Course"
        errorMessage={courseState.errorMessage}
        submitButtonText="Save"
        initialValues={{
          id: course.id,
          name: course.name,
          duration: course.duration,
          description: course.description,
          capacity: course.capacity.toString(),
          users: course.users,
        }}
        onSubmit={(id, name, duration, description, capacity, users) => {
          updateCourse(id, name, duration, description, capacity, () => {
            const updatedCourse = {
              id,
              name,
              duration,
              description,
              capacity,
              users,
            };
            navigation.getParam('onGoBack')(updatedCourse);
            navigation.pop();
          });
        }}
      />
    </View>
  );
};

export default EditCourseScreen;
