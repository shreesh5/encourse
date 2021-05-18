import React, {useContext} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {CourseListScreenStyles as styles} from '../styles/CourseList';
import {Context as CourseContext} from '../context/CourseContext';

const CourseListScreen = ({navigation}) => {
  const {state, fetchCourses} = useContext(CourseContext);

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
          <Text>{item.name}</Text>
          <Text>
            Duration:
            {item.duration}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.contentView}>
      <NavigationEvents onWillFocus={fetchCourses} />
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
