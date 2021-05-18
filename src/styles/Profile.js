import {StyleSheet} from 'react-native';
import {GlobalColors} from './Global';

export const ProfileScreenStyles = StyleSheet.create({
  contentView: {
    flex: 1,
    // padding: 5,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  header: {
    fontSize: 25,
    color: GlobalColors.white,
    backgroundColor: GlobalColors.purple,
    padding: 5,
  },
  profileOptions: {
    backgroundColor: GlobalColors.white,
  },
  line: {
    backgroundColor: GlobalColors.purple,
    height: 1,
  },
  settingHeader: {
    width: '50%',
    textAlign: 'left',
    fontSize: 18,
  },
  settingValue: {
    width: '50%',
    textAlign: 'right',
    fontSize: 18,
    color: GlobalColors.purple,
  },
  buttonView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 25,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: GlobalColors.purple,
    borderRadius: 10,
  },
  buttonText: {
    color: GlobalColors.white,
    fontSize: 16,
  },
});
