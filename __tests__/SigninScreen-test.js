import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import SigninScreen from '../src/screens/SigninScreen';
import * as AuthContext from '../src/context/AuthContext';

// Mocking react-navigation
jest.mock('react-navigation', () => ({
  withNavigation: (Component) => (props) =>
    <Component navigation={{navigate: jest.fn()}} {...props} />,
  SafeAreaView: ({children}) => <>{children}</>,
  NavigationEvents: 'mockNavigationEvents',
}));

describe('<SigninScreen />', () => {
  // Dummy context values for student user
  const studentContextValues = {
    state: {
      errorMessage: '',
    },
    signin: jest.fn(),
    clearErrorMessage: jest.fn(),
  };

  it('Handles onPress for signin', async () => {
    // Spying of useAuthContext to
    // mock context with dummy context
    // values
    jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => studentContextValues);

    const {getByTestId} = await render(<SigninScreen />);

    const signinButton = getByTestId('signin-button');
    fireEvent.press(signinButton);

    expect(studentContextValues.signin).toHaveBeenCalledTimes(1);
  });
});
