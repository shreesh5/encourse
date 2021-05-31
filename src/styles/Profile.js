import {StyleSheet} from 'react-native';
import {GlobalColors} from './Global';

export const ProfileScreenStyles = StyleSheet.create({
  contentView: {
    flex: 1,
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
    flexDirection: 'column',
    width: '100%',
    marginTop: 25,
  },
  buttonContainer: {
    width: '75%',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 20,
    margin: 3,
    backgroundColor: GlobalColors.purple,
    borderRadius: 15,
  },
  buttonText: {
    color: GlobalColors.white,
    fontSize: 16,
  },
  iconView: {
    width: '50%',
    alignItems: 'flex-end',
  },
});
