import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {Context as CourseContext} from '../context/CourseContext';
import {CourseDetailStyles as styles} from '../styles/CourseDetail';

const CourseDetailScreen = ({navigation}) => {
  const {state} = useContext(CourseContext);
  const id = navigation.getParam('id');

  const course = state.find((c) => c.id === id);

  return (
    <View style={styles.contentView}>
      <Text>{course.name}</Text>
      <Text>{course.duration}</Text>
      <Text>{course.description}</Text>
      <Text>
        Capacity: {course.capacity - course.users.length} / {course.capacity}
      </Text>
    </View>
  );
};

export default CourseDetailScreen;
