import {StyleSheet} from 'react-native';
import {GlobalColors} from './Global';

export const SigninScreenStyles = StyleSheet.create({
  contentView: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200,
  },
  inputView: {
    flexDirection: 'row',
    width: '90%',
    padding: 5,
    borderWidth: 1,
    borderColor: GlobalColors.black,
    margin: 5,
  },
  textInputView: {
    flex: 1,
  },
});
