import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {UserListScreenStyles as styles} from '../styles/UserList';
import courseApi from '../api/course';

const CourseListScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await courseApi.get('/users/');
      console.log('response', response.data);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.log('error in get users response', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.userCard}>
        <Text style={styles.userText}>{item.username}</Text>
        <View style={styles.userOptions}>
          <TouchableOpacity onPress={() => console.log('Edit user button pressed.')}>
            <Text style={styles.userOptionEdit}>E</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Delete user button pressed.')}>
            <Text style={styles.userOptionDelete}>D</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.contentView}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          renderItem={renderItem}
          data={users}
          contentContainerStyle={styles.userListContainer}
          keyExtractor={(item) => item.id}
          refreshing={loading}
          onRefresh={() => {
            setLoading(true);
            fetchUsers();
            setLoading(false);
          }}
        />
      )}
    </View>
  );
};

CourseListScreen.navigationOptions = {
  title: 'Users',
};

export default CourseListScreen;
