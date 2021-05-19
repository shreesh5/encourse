import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const Button = ({label, onPress, labelStyle, containerStyle}) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={{...containerStyle}}>
        <Text style={{...labelStyle}}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
