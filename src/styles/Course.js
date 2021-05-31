import {StyleSheet, Dimensions} from 'react-native';
import {GlobalColors} from './Global';

const {width} = Dimensions.get('window');

export const CourseStyles = StyleSheet.create({
  contentView: {
    flex: 1,
    padding: 5,
  },
  courseName: {
    fontSize: 27,
    color: GlobalColors.purple,
    borderColor: GlobalColors.black,
    borderWidth: 3,
    textAlign: 'center',
    alignSelf: 'center',
    width: '75%',
    marginVertical: 15,
    borderRadius: 10,
  },
  courseDurationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  courseDescriptionContainer: {
    flexDirection: 'column',
    padding: 5,
  },
  adminButton: {
    padding: 20,
    backgroundColor: GlobalColors.purple,
    borderRadius: 15,
    alignItems: 'center',
    margin: 1,
    width: width * 0.45,
  },
  enrollButton: {
    padding: 20,
    backgroundColor: GlobalColors.purple,
    borderRadius: 15,
    alignItems: 'center',
    margin: 1,
    width: width * 0.91,
  },
  buttonText: {
    fontSize: 20,
    color: GlobalColors.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  label: {
    fontSize: 20,
    color: GlobalColors.purple,
  },
  text: {
    fontSize: 20,
  },
  allButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 23,
  },
});

export const CourseListScreenStyles = StyleSheet.create({
  contentView: {
    flex: 1,
    padding: 5,
  },
  courseListContainer: {
    alignItems: 'center',
    flexGrow: 1,
    marginTop: 15,
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
