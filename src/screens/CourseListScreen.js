import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import {CourseListScreenStyles as styles} from '../styles/CourseList';
import {useCourseContext} from '../context/CourseContext';

const CourseListScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const {state, fetchCourses} = useCourseContext();

  useEffect(() => {
    fetchCourses();

    const listener = navigation.addListener('didFocus', () => {
      fetchCourses();
    });

    // Keeping a dangling listener can lead to a memory leak
    // so it is important to clean up after adding a listener
    // When a function is returned from useEffect, it will only
    // get called once the instance of IndexScreen is completely destroyed
    return () => {
      listener.remove();
    };
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CourseDetail', {
            course: item,
          });
        }}
        testID={`button-${item.id}`}
      >
        <View style={styles.courseCard}>
          <Text style={styles.courseText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.contentView}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          renderItem={renderItem}
          data={state.courses}
          contentContainerStyle={styles.courseListContainer}
          keyExtractor={(item) => item.name}
          refreshing={loading}
          onRefresh={() => {
            setLoading(true);
            fetchCourses();
            setLoading(false);
          }}
        />
      )}
    </View>
  );
};

CourseListScreen.navigationOptions = {
  title: 'Courses',
};

export default CourseListScreen;
