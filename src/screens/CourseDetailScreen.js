import React, {useContext, useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as CourseContext} from '../context/CourseContext';
import {CourseDetailStyles as styles} from '../styles/CourseDetail';
import courseApi from '../api/course';
import Button from '../components/Button';

const CourseDetailScreen = ({navigation}) => {
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const {state: courseState, deleteCourse} = useContext(CourseContext);
  const {state: authState} = useContext(AuthContext);

  useEffect(() => {
    const id = navigation.getParam('id');
    const courseInfo = courseState.courses.find((c) => c.id === id);
    setCourse(courseInfo);
    setLoading(false);
  },[]);

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

  const courseDetail = () => {
    return (
      <>
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
        <View style={styles.allButtonContainer}>
          <View style={styles.buttonContainer}>
            {!course.users.includes(parseInt(authState.pk)) ? (
              <Button
                label="Add"
                onPress={() => enrollInCourse(authState.pk, course.id)}
                labelStyle={styles.buttonText}
                containerStyle={styles.enrollButton}
              />
            ) : (
              <Button
                label="Drop"
                onPress={() => unEnrollInCourse(authState.pk, course.id)}
                labelStyle={styles.buttonText}
                containerStyle={styles.enrollButton}
              />
            )}
          </View>
          {authState.role === 'superuser' ? (
            <View style={styles.buttonContainer}>
              <Button
                label="Edit Course"
                onPress={() => console.log('Edit course button clicked')}
                labelStyle={styles.buttonText}
                containerStyle={styles.adminButton}
              />
              <Button
                label="Delete Course"
                onPress={() => deleteCourse(course.id)}
                labelStyle={styles.buttonText}
                containerStyle={styles.adminButton}
              />
            </View>
          ) : null}
        </View>
      </>
    );
  };

  return (
    <View style={styles.contentView}>
      {loading ? <ActivityIndicator /> : courseDetail()}
    </View>
  );
};

export default CourseDetailScreen;
