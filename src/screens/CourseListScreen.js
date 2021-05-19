import React, {useContext, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {CourseListScreenStyles as styles} from '../styles/CourseList';
import {Context as CourseContext} from '../context/CourseContext';

const CourseListScreen = ({navigation}) => {
  const {state, fetchCourses} = useContext(CourseContext);

  useEffect(() => {
    fetchCourses();
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CourseDetail', {
            id: item.id,
          });
        }}
      >
        <View style={styles.courseCard}>
          <Text style={styles.courseText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.contentView}>
      <FlatList
        renderItem={renderItem}
        data={state}
        contentContainerStyle={styles.courseListContainer}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

CourseListScreen.navigationOptions = {
  title: 'Courses',
};

export default CourseListScreen;
