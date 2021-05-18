import React from 'react';
import {View} from 'react-native';
import {SpacerStyles as styles} from '../styles/Spacer';

const Spacer = ({children}) => {
  return <View style={styles.spacer}>{children}</View>;
};

export default Spacer;
