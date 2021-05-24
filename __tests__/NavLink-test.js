import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import NavLink from '../src/components/NavLink';

describe('<NavLink />', () => {
  it('Calls onPress', async () => {
    const testID = 'nav-link';
    const navigation = {
      navigate: jest.fn(),
    };

    const {getByTestId} = await render(
      <NavLink
        testID={testID}
        navigation={navigation}
        routeName="CourseList"
        text="Click me"
      />,
    );

    const navlink = getByTestId(testID);

    fireEvent.press(navlink);

    expect(navigation.navigate).toHaveBeenCalledTimes(1);
  });
});
