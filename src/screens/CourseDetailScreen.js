import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as CourseContext} from '../context/CourseContext';
import {CourseDetailStyles as styles} from '../styles/CourseDetail';
import courseApi from '../api/course';
import Button from '../components/Button';

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
      <Text style={styles.courseName}>{course.name}</Text>
      <View style={styles.courseDurationContainer}>
        <Text style={styles.label}>Duration:</Text>
        <Text style={styles.text}>{course.duration}</Text>
      </View>
      <View style={styles.courseDescriptionContainer}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.text}>{course.description}</Text>
      </View>
      <View style={styles.courseDurationContainer}>
        <Text style={styles.label}>Capacity:</Text>
        <Text style={styles.text}>
          {course.capacity - course.users.length} / {course.capacity}
        </Text>
      </View>
      {authState.role === 'superuser' ? (
        <View style={styles.buttonContainer}>
          <Button
            label="Edit Course"
            onPress={() => console.log('Edit course button clicked')}
            labelStyle={styles.buttonText}
            containerStyle={styles.button}
          />
          <Button
            label="Delete Course"
            onPress={() => deleteCourse(course.id)}
            labelStyle={styles.buttonText}
            containerStyle={styles.button}
          />
        </View>
      ) : null}
      <View style={styles.buttonContainer}>
        <Button
          label="Enroll"
          onPress={() => enrollInCourse(authState.pk, course.id)}
          labelStyle={styles.buttonText}
          containerStyle={styles.button}
        />
        <Button
          label="Un-enroll"
          onPress={() => unEnrollInCourse(authState.pk, course.id)}
          labelStyle={styles.buttonText}
          containerStyle={styles.button}
        />
      </View>
    </View>
  );
};

export default CourseDetailScreen;
