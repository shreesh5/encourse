import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import AuthForm from '../src/components/AuthForm';

describe('<AuthForm />', () => {
  it('Renders default login elements', async () => {
    const signinOnSubmit = jest.fn();

    const {getByText, getByPlaceholderText} = render(
      <AuthForm
        headerText="Sign In"
        errorMessage=""
        submitButtonText="Sign In"
        onSubmit={signinOnSubmit}
      />,
    );

    const usernameLabel = getByText('Username');
    const usernameInput = getByPlaceholderText('Username');
    const passwordLabel = getByText('Password');
    const passwordInput = getByPlaceholderText('Password');

    expect(usernameLabel).toBeTruthy();
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(passwordLabel).toBeTruthy();
  });

  it('Renders default register elements', async () => {
    const signinOnSubmit = jest.fn();

    const {getByText, getByPlaceholderText} = render(
      <AuthForm
        headerText="Sign In"
        errorMessage=""
        submitButtonText="Sign In"
        onSubmit={signinOnSubmit}
        type="register"
      />,
    );

    const usernameLabel = getByText('Username');
    const usernameInput = getByPlaceholderText('Username');
    const emailLabel = getByText('Email');
    const emailInput = getByPlaceholderText('Email');
    const passwordLabel = getByText('Password');
    const passwordInput = getByPlaceholderText('Password');

    expect(usernameLabel).toBeTruthy();
    expect(usernameInput).toBeTruthy();
    expect(emailLabel).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(passwordLabel).toBeTruthy();
  });
});
