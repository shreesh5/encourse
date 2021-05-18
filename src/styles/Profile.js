import {StyleSheet} from 'react-native';
import {GlobalColors} from './Global';

export const ProfileScreenStyles = StyleSheet.create({
  contentView: {
    flex: 1,
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    height: '8.5%',
    borderColor: GlobalColors.black,
    borderWidth: 1,
  },
  settingHeader: {
    width: '50%',
    textAlign: 'left',
  },
  settingValue: {
    width: '50%',
    textAlign: 'right',
  },
  profileSettingsView: {
    height: '50%',
  },
  adminSettingsView: {
    // marginTop: 10,
    height: '50%',
  },
});
