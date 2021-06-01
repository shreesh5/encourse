import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useCourseContext} from '../context/CourseContext';
import {useAuthContext} from '../context/AuthContext';
import {CourseStyles as styles} from '../styles/Course';
import Button from '../components/Button';
import {enrollInCourse, dropCourse} from '../services/enrollment';

// Screen for displaying course details.
// Fetches course from navigation param
// and provides student user option to
// enroll/drop and provides admin user
// options to edit/delete course.
const CourseDetailScreen = ({navigation}) => {
  const [course, setCourse] = useState(navigation.getParam('course'));
  const {deleteCourse} = useCourseContext();
  const {state: authState} = useAuthContext();

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
      <View style={styles.allButtonContainer}>
        <View style={styles.buttonContainer}>
          {!course.users.includes(parseInt(authState.pk, 10)) ? (
            <Button
              label="Add"
              onPress={() => enrollInCourse(authState.pk, course.id)}
              labelStyle={styles.buttonText}
              containerStyle={styles.enrollButton}
              testID="enroll-button"
            />
          ) : (
            <Button
              label="Drop"
              onPress={() => dropCourse(authState.pk, course.id)}
              labelStyle={styles.buttonText}
              containerStyle={styles.enrollButton}
              testID="drop-button"
            />
          )}
        </View>
        {authState.role === 'superuser' ? (
          <View style={styles.buttonContainer}>
            <Button
              label="Edit Course"
              onPress={() =>
                navigation.navigate('EditCourse', {
                  course,
                  onGoBack: (updatedCourse) => {
                    setCourse(updatedCourse);
                  },
                })
              }
              labelStyle={styles.buttonText}
              containerStyle={styles.adminButton}
              testID="edit-button"
            />
            <Button
              label="Delete Course"
              onPress={() => deleteCourse(course.id)}
              labelStyle={styles.buttonText}
              containerStyle={styles.adminButton}
              testID="delete-button"
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default CourseDetailScreen;
