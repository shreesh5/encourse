import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import SignupScreen from '../src/screens/SignupScreen';
import * as AuthContext from '../src/context/AuthContext';

jest.mock('react-navigation', () => ({
  withNavigation: (Component) => (props) =>
    <Component navigation={{navigate: jest.fn()}} {...props} />,
  SafeAreaView: ({children}) => <>{children}</>,
  NavigationEvents: 'mockNavigationEvents',
}));

describe('<SigninScreen />', () => {
  const studentContextValues = {
    state: {
      errorMessage: '',
    },
    signup: jest.fn(),
    clearErrorMessage: jest.fn(),
  };

  it('Handles onPress for signup', async () => {
    jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => studentContextValues);

    const {getByTestId} = await render(<SignupScreen />);

    const signupButton = getByTestId('signup-button');
    fireEvent.press(signupButton);

    expect(studentContextValues.signup).toHaveBeenCalledTimes(1);
  });
});
