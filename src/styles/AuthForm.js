import {StyleSheet} from 'react-native';
import {GlobalColors} from './Global';

export const AuthFormStyles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
  headerText: {
    fontSize: 28,
    alignSelf: 'center',
  },
  labelInputContainer: {
    flexDirection: 'column',
    width: '90%',
    alignSelf: 'center',
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: GlobalColors.black,
    fontSize: 18,
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 20,
  },
  submitButtonContainer: {
    marginTop: 10,
    padding: 20,
    backgroundColor: GlobalColors.purple,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
  },
  submitButtonText: {
    color: GlobalColors.white,
    fontSize: 16,
  },
});
