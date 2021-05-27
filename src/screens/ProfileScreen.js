import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useAuthContext} from '../context/AuthContext';
// import {useCourseContext} from '../context/CourseContext';
import Icon from 'react-native-vector-icons/Feather';
import {ProfileScreenStyles as styles} from '../styles/Profile';

const ProfileScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const {state: authState, signout, getUserDetails} = useAuthContext();
  // const {state: courseState} = useCourseContext();

  useEffect(() => {
    if (!authState.user) {
      getUserDetails(authState.pk);
    }
    if (loading && authState.user) {
      setLoading(false);
    }
  },[authState.user]);

  // const fetchCourseNames = (ids) => {
  //   const courses = [];
  //   courseState.courses.forEach((course) => {
  //     if (ids.includes(course.id)) {
  //       courses.push(course.name);
  //     }
  //   });
  //   return courses;
  // };

  const myProfile = () => {
    return (
      <View>
        <Text style={styles.header}>My Profile</Text>
        <View>
          <View style={styles.row}>
            <Text style={styles.settingHeader}>Username</Text>
            <Text style={styles.settingValue}>{authState.user.username}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.row}>
            <Text style={styles.settingHeader}>Email</Text>
            <Text style={styles.settingValue}>{authState.user.email}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.row}>
            <Text style={styles.settingHeader}>School</Text>
            <Text style={styles.settingValue}>{authState.user.school}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.row}>
            <Text style={styles.settingHeader}>City</Text>
            <Text style={styles.settingValue}>{authState.user.city}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.row}>
            <Text style={styles.settingHeader}>Country</Text>
            <Text style={styles.settingValue}>{authState.user.country}</Text>
          </View>
          <View style={styles.line} />
          {/* <View style={styles.row}>
            <Text style={styles.settingHeader}>Courses</Text>
            <Text style={styles.settingValue}>
              {fetchCourseNames(authState.user.courses)}
            </Text>
          </View> */}
        </View>
      </View>
    );
  };

  const adminSettings = () => {
    return (
      <View>
        <Text style={styles.header}>Admin Settings</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddCourse')} testID="add-course-button">
          <View style={styles.row}>
            <Text style={styles.settingHeader}>Add Course</Text>
            <View style={styles.iconView}>
              <Icon name="chevron-right" size={23} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity onPress={() => navigation.navigate('UserList')} testID="view-users-button">
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
        {authState.role === 'superuser' ? adminSettings() : null}
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} testID="edit-profile-button">
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => signout()} testID="signout-button">
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Signout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.contentView}>
      <ScrollView>{loading ? <ActivityIndicator /> : settings()}</ScrollView>
    </View>
  );
};

export default ProfileScreen;
