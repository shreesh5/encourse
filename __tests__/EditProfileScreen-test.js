import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import EditProfileScreen from '../src/screens/EditProfileScreen';
import * as AuthContext from '../src/context/AuthContext';

describe('<EditProfileScreen />', () => {
  const studentContextValues = {
    state: {
      role: 'student',
      pk: '3',
      user: {
        username: 'newtest',
        email: 'newtest@test.com',
        school: 'NTU',
        city: 'San Jose',
        country: 'USA',
      },
    },
    updateUserDetails: jest.fn(),
  };

  it('Handles onPress to edit user profile', async () => {
    jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => studentContextValues);

    const {getByTestId} = await render(<EditProfileScreen />);

    const updateUserButton = getByTestId('update-user-button');
    fireEvent.press(updateUserButton);

    expect(studentContextValues.updateUserDetails).toHaveBeenCalledTimes(1);
  });
});
