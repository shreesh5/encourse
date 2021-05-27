import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useAuthContext} from '../context/AuthContext';
import {useCourseContext} from '../context/CourseContext';
import Icon from 'react-native-vector-icons/Feather';
import {ProfileScreenStyles as styles} from '../styles/Profile';
import courseApi from '../api/course';

const ProfileScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const {state: authState, signout} = useAuthContext();
  const {state: courseState} = useCourseContext();

  const getUser = () => {
    courseApi
      .get('/usertest/' + authState.pk + '/')
      .then((response) => {
        console.log('response usertest', response.data);
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) =>
        console.log('error while fetching user settings', error),
      );
  };

  useEffect(() => {
    getUser();

    const listener = navigation.addListener('didFocus', () => {
      getUser();
    });

    return () => {
      listener.remove();
    };
  },[]);

  const fetchCourseNames = (ids) => {
    const courses = [];
    courseState.courses.forEach((course) => {
      if (ids.includes(course.id)) {
        courses.push(course.name);
      }
    });
    return courses;
  };

  const myProfile = () => {
    return (
      <View>
        <Text style={styles.header}>My Profile</Text>
        <View>
          <View style={styles.row}>
            <Text style={styles.settingHeader}>Username</Text>
            <Text style={styles.settingValue}>{user.username}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.row}>
            <Text style={styles.settingHeader}>Email</Text>
            <Text style={styles.settingValue}>{user.email}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.row}>
            <Text style={styles.settingHeader}>School</Text>
            <Text style={styles.settingValue}>{user.school}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.row}>
            <Text style={styles.settingHeader}>City</Text>
            <Text style={styles.settingValue}>{user.city}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.row}>
            <Text style={styles.settingHeader}>Country</Text>
            <Text style={styles.settingValue}>{user.country}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.row}>
            <Text style={styles.settingHeader}>Courses</Text>
            <Text style={styles.settingValue}>
              {fetchCourseNames(user.courses)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const adminSettings = () => {
    return (
      <View>
        <Text style={styles.header}>Admin Settings</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddCourse')}>
          <View style={styles.row}>
            <Text style={styles.settingHeader}>Add Course</Text>
            <View style={styles.iconView}>
              <Icon name="chevron-right" size={23} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity onPress={() => navigation.navigate('UserList')}>
          <View style={styles.row}>
            <Text style={styles.settingHeader}>View, Edit, Delete Users</Text>
            <View style={styles.iconView}>
              <Icon name="chevron-right" size={23} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.line} />
      </View>
    );
  };

  const settings = () => {
    return (
      <View>
        {myProfile()}
        {adminSettings()}
      </View>
    );
  };

  return (
    <View style={styles.contentView}>
      <ScrollView>
        {loading ? <ActivityIndicator /> : settings()}
        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile', {user})}
          >
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => signout()}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Signout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
