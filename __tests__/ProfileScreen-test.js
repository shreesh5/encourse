import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import ProfileScreen from '../src/screens/ProfileScreen';
import * as AuthContext from '../src/context/AuthContext';

describe('<ProfileScreen />', () => {
  // Dummy navigation object for testing
  const navigation = {
    navigate: jest.fn(),
    pop: jest.fn(),
  };
  // Dummy context values for admin user
  const adminContextValues = {
    state: {
      role: 'superuser',
      pk: '1',
      user: {
        username: 'test',
        email: 'test@test.com',
        school: 'TU',
        city: 'San Jose',
        country: 'USA',
      },
    },
    getUserDetails: jest.fn(),
    signout: jest.fn(),
  };
  // Dummy context values for student user
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
    getUserDetails: jest.fn(),
    signout: jest.fn(),
  };

  it('Renders correctly for superuser', async () => {
    jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => adminContextValues);

    const {getByText, getByTestId, queryByTestId} = await render(
      <ProfileScreen navigation={navigation} />,
    );

    expect(getByText('test')).toBeTruthy();
    expect(getByText('test@test.com')).toBeTruthy();
    expect(getByText('TU')).toBeTruthy();
    expect(getByText('San Jose')).toBeTruthy();
    expect(getByText('USA')).toBeTruthy();
    expect(getByTestId('edit-profile-button')).toBeTruthy();
    expect(getByTestId('signout-button')).toBeTruthy();
    expect(queryByTestId('add-course-button')).toBeTruthy();
    expect(queryByTestId('view-users-button')).toBeTruthy();
  });

  it('Renders correctly for student', async () => {
    jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => studentContextValues);

    const {getByText, getByTestId, queryByTestId} = await render(
      <ProfileScreen navigation={navigation} />,
    );

    expect(getByText('newtest')).toBeTruthy();
    expect(getByText('newtest@test.com')).toBeTruthy();
    expect(getByText('NTU')).toBeTruthy();
    expect(getByText('San Jose')).toBeTruthy();
    expect(getByText('USA')).toBeTruthy();
    expect(getByTestId('edit-profile-button')).toBeTruthy();
    expect(getByTestId('signout-button')).toBeTruthy();
    expect(queryByTestId('add-course-button')).toBeFalsy();
    expect(queryByTestId('view-users-button')).toBeFalsy();
  });

  it('Handles onPress for navigating to edit profile screen', async () => {
    jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => studentContextValues);

    const {queryByTestId} = await render(
      <ProfileScreen navigation={navigation} />,
    );

    const editButton = queryByTestId('edit-profile-button');

    fireEvent.press(editButton);

    expect(editButton).toBeTruthy();
    expect(navigation.navigate).toHaveBeenCalledTimes(1);
  });

  it('Handles onPress for signout', async () => {
    jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => studentContextValues);

    const {queryByTestId} = await render(
      <ProfileScreen navigation={navigation} />,
    );

    const signoutButton = queryByTestId('signout-button');

    fireEvent.press(signoutButton);

    expect(signoutButton).toBeTruthy();
    expect(studentContextValues.signout).toHaveBeenCalledTimes(1);
  });

  it('Handles onPress for navigating to add course screen for superuser', async () => {
    jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => adminContextValues);

    const {queryByTestId} = await render(
      <ProfileScreen navigation={navigation} />,
    );

    const addCourseButton = queryByTestId('add-course-button');

    fireEvent.press(addCourseButton);

    expect(addCourseButton).toBeTruthy();
    expect(navigation.navigate).toHaveBeenCalledTimes(2);
  });

  it('Handles onPress for navigating to view users screen for superuser', async () => {
    jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => adminContextValues);

    const {queryByTestId} = await render(
      <ProfileScreen navigation={navigation} />,
    );

    const viewUsersButton = queryByTestId('view-users-button');

    fireEvent.press(viewUsersButton);

    expect(viewUsersButton).toBeTruthy();
    expect(navigation.navigate).toHaveBeenCalledTimes(3);
  });
});
