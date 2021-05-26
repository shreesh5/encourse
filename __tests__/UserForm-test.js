import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import UserForm from '../src/components/UserForm';

describe('<UserForm />', () => {
  it('Renders user form elements', async () => {
    const signinOnSubmit = jest.fn();
    const testID = 'userform-button';

    const {getByText, getByDisplayValue} = render(
      <UserForm
        onSubmit={signinOnSubmit}
        buttonTestID={testID}
        user={{
          username: 'test',
          email: 'test@test.com',
          school: 'Test University',
          city: 'San Jose',
          country: 'California',
        }}
      />,
    );

    const usernameLabel = getByText('Username');
    const usernameInput = getByDisplayValue('test');
    const emailLabel = getByText('Email');
    const emailInput = getByDisplayValue('test@test.com');
    const schoolLabel = getByText('School');
    const schoolInput = getByDisplayValue('Test University');
    const cityLabel = getByText('City');
    const cityInput = getByDisplayValue('San Jose');
    const countryLabel = getByText('Country');
    const countryInput = getByDisplayValue('California');

    expect(usernameLabel).toBeTruthy();
    expect(usernameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(emailLabel).toBeTruthy();
    expect(schoolLabel).toBeTruthy();
    expect(schoolInput).toBeTruthy();
    expect(cityInput).toBeTruthy();
    expect(cityLabel).toBeTruthy();
    expect(countryInput).toBeTruthy();
    expect(countryLabel).toBeTruthy();
  });

  it('Handles onPress for editing user details', async () => {
    const editUserOnSubmit = jest.fn();
    const testID = 'userform-button';
    const testValues = {
      id: 1,
      username: 'test1',
      email: 'test1@test.com',
      school: 'Test University ',
      city: 'San Jose',
      country: 'California',
    };

    const {getByTestId, getByDisplayValue} = render(
      <UserForm
        onSubmit={editUserOnSubmit}
        buttonTestID={testID}
        user={{
          id: 1,
          username: 'test',
          email: 'test@test.com',
          school: 'Test University',
          city: 'San Jose',
          country: 'California',
        }}
      />,
    );

    const usernameInput = getByDisplayValue('test');
    const emailInput = getByDisplayValue('test@test.com');
    const schoolInput = getByDisplayValue('Test University');
    const cityInput = getByDisplayValue('San Jose');
    const countryInput = getByDisplayValue('California');
    const saveButton = getByTestId(testID);

    fireEvent.changeText(usernameInput, testValues.username);
    fireEvent.changeText(emailInput, testValues.email);
    fireEvent.changeText(schoolInput, testValues.school);
    fireEvent.changeText(cityInput, testValues.city);
    fireEvent.changeText(countryInput, testValues.country);
    fireEvent.press(saveButton);

    expect(editUserOnSubmit).toHaveBeenCalledTimes(1);
    expect(editUserOnSubmit).toHaveBeenCalledWith(testValues);
  });
});
