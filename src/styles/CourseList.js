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
    borderWidth: 3,
    borderColor: GlobalColors.black,
  },
  courseCard: {
    width: width * 0.9,
    borderWidth: 1,
    borderColor: GlobalColors.black,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    flexDirection: 'column',
  },
});
