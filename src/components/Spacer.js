import React from 'react';
import {View} from 'react-native';
import {SpacerStyles as styles} from '../styles/Spacer';

// Custom component for adding
// spacing around a view.
const Spacer = ({children}) => {
  return <View style={styles.spacer}>{children}</View>;
};

export default Spacer;
