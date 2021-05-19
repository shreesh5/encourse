import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import {CourseListScreenStyles as styles} from '../styles/CourseList';
import {Context as CourseContext} from '../context/CourseContext';

const CourseListScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
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
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          renderItem={renderItem}
          data={state}
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
