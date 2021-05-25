import React, {useContext, useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Context as CourseContext} from '../context/CourseContext';
import {CourseDetailStyles as styles} from '../styles/CourseDetail';
import CourseForm from '../components/CourseForm';

const EditCourseScreen = ({navigation}) => {
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const {state: courseState, updateCourse} = useContext(CourseContext);

  useEffect(() => {
    const id = navigation.getParam('id');
    const courseInfo = courseState.courses.find((c) => c.id === id);
    setCourse(courseInfo);
    setLoading(false);
  },[]);

  return (
    <View style={styles.contentView}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <CourseForm
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
              setLoading(true);
              const updatedCourse = {
                id,
                name,
                duration,
                description,
                capacity,
                users,
              };
              navigation.getParam('onGoBack')(updatedCourse);
              setLoading(false);
              navigation.pop();
            });
          }}
        />
      )}
    </View>
  );
};

export default EditCourseScreen;