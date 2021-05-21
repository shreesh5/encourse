import {StyleSheet, Dimensions} from 'react-native';
import {GlobalColors} from './Global';

const {width} = Dimensions.get('window');

export const UserListScreenStyles = StyleSheet.create({
  contentView: {
    flex: 1,
    padding: 5,
  },
  userListContainer: {
    alignItems: 'center',
    flexGrow: 1,
    marginTop: 15,
  },
  userCard: {
    width: width * 0.99,
    borderBottomWidth: 1,
    borderBottomColor: GlobalColors.purple,
    padding: 20,
    flexDirection: 'row',
  },
  userText: {
    color: GlobalColors.black,
    fontSize: 23,
    flex: 0.5,
    alignSelf: 'flex-start',
  },
  userOptions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    flex: 0.5,
  },
  userOptionEdit: {
    fontSize: 23,
    color: GlobalColors.black,
    marginRight: 10,
  },
  userOptionDelete: {
    fontSize: 23,
    color: GlobalColors.black,
  },
});
