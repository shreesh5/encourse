import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import Spacer from './Spacer';
import {NavLinkStyles as styles} from '../styles/NavLink';

const NavLink = ({navigation, text, routeName}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Spacer>
        <Text style={styles.link}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

export default withNavigation(NavLink);
