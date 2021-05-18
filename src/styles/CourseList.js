import {StyleSheet, Dimensions} from 'react-native';
import {GlobalColors} from './Global';

const {width} = Dimensions.get('window');

export const CourseListScreenStyles = StyleSheet.create({
  contentView: {
    flex: 1,
    padding: 5,
  },
  courseListContainer: {
    alignItems: 'center',
    flexGrow: 1,
    marginTop: 15,
    // borderWidth: 3,
    // borderColor: GlobalColors.black,
  },
  courseCard: {
    width: width * 0.7,
    borderWidth: 1,
    borderColor: GlobalColors.purple,
    padding: 20,
    margin: 10,
    borderRadius: 15,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: GlobalColors.purple,
  },
  courseText: {
    color: GlobalColors.white,
    fontSize: 23,
  },
});
