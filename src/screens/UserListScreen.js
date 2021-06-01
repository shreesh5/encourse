import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {UserListScreenStyles as styles} from '../styles/UserList';
import Icon from 'react-native-vector-icons/Feather';
import {fetchUsers, deleteUser} from '../services/users';

const CourseListScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchUsers().then((response) => {
      setUsers(response);
      setLoading(false);
    });
    const listener = navigation.addListener('didFocus', () => {
      setLoading(true);
      fetchUsers().then((response) => {
        setUsers(response);
        setLoading(false);
      });
    });
    return () => {
      listener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.userCard}>
        <Text style={styles.userText}>{item.username}</Text>
        <View style={styles.userOptions}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserDetail', {user: item, id: item.id})
            }>
            <Icon name="edit-2" size={20} style={styles.userOptionEdit} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              deleteUser(item.id).then((resp) => {
                fetchUsers().then((response) => {
                  setUsers(response);
                  setLoading(false);
                });
              })
            }>
            <Icon name="trash-2" size={20} />
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
          keyExtractor={(item) => item.id.toString()}
          refreshing={loading}
          onRefresh={() => {
            setLoading(true);
            fetchUsers().then((response) => {
              setUsers(response);
              setLoading(false);
            });
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
