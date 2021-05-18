import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as CourseContext} from '../context/CourseContext';
import {CourseDetailStyles as styles} from '../styles/CourseDetail';
import courseApi from '../api/course';

const CourseDetailScreen = ({navigation}) => {
  const {state: courseState} = useContext(CourseContext);
  const {state: authState} = useContext(AuthContext);
  const id = navigation.getParam('id');

  const course = courseState.find((c) => c.id === id);

  const deleteCourse = async (courseId) => {
    try {
      const response = await courseApi.delete(`/coursetest/${courseId}/`);
      console.log('response', response);
      navigation.goBack();
    } catch (error) {
      console.log('error in delete user response', error);
    }
  };

  const enrollInCourse = async (userId, courseId) => {
    try {
      const response = await courseApi.post(
        `/enrollment/${userId}/${courseId}/`,
        {
          user: userId,
          course: courseId,
        },
      );
      console.log('response', response);
    } catch (error) {
      console.log('error in course enrollment', error);
    }
  };

  const unEnrollInCourse = async (userId, courseId) => {
    try {
      const response = await courseApi.delete(
        `/enrollment/${userId}/${courseId}/`,
      );
      console.log('response', response);
    } catch (error) {
      console.log('error in course enrollment', error);
    }
  };

  return (
    <View style={styles.contentView}>
      <Text>{course.name}</Text>
      <Text>{course.duration}</Text>
      <Text>{course.description}</Text>
      <Text>
        Capacity: {course.capacity - course.users.length} / {course.capacity}
      </Text>
      <Text>{course.users}</Text>
      {authState.role === 'superuser' ? (
        <Button
          title="Edit Course"
          onPress={() => console.log('Edit course button clicked')}
        />
      ) : null}
      {authState.role === 'superuser' ? (
        <Button title="Delete Course" onPress={() => deleteCourse(course.id)} />
      ) : null}
      <Button
        title="Enroll"
        onPress={() => enrollInCourse(authState.pk, course.id)}
      />
      <Button
        title="Un-enroll"
        onPress={() => unEnrollInCourse(authState.pk, course.id)}
      />
    </View>
  );
};

export default CourseDetailScreen;
