import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// Custom component for a button.
const Button = ({label, onPress, labelStyle, containerStyle, testID}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} testID={testID}>
      <View style={{...containerStyle}}>
        <Text style={{...labelStyle}}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
