import {StyleSheet, Dimensions} from 'react-native';
import {GlobalColors} from './Global';

const {width} = Dimensions.get('window');

export const CourseDetailStyles = StyleSheet.create({
  contentView: {
    flex: 1,
    padding: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
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
    // borderWidth: 1,
    // borderColor: GlobalColors.black,
    padding: 5,
  },
  courseDescriptionContainer: {
    flexDirection: 'column',
    // borderWidth: 1,
    // borderColor: GlobalColors.black,
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
    // alignSelf: 'flex-',
  },
  allButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 23,
  },
});
