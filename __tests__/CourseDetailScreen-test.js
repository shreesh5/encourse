import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import CourseDetailScreen from '../src/screens/CourseDetailScreen';
import * as CourseContext from '../src/context/CourseContext';
import * as AuthContext from '../src/context/AuthContext';

describe('<CourseDetailScreen />', () => {
  const courses = [
    {
      id: 1,
      name: 'test1',
      duration: '1 month',
      description: 'test description',
      capacity: 5,
      users: [3],
    },
    {
      id: 2,
      name: 'test2',
      duration: '2 months',
      description: 'test description 2',
      capacity: 5,
      users: [],
    },
    {
      id: 3,
      name: 'test3',
      duration: '3 months',
      description: 'test description 3',
      capacity: 5,
      users: [],
    },
  ];
  const mockNavigationGetParam = jest.fn().mockImplementation((param) => { 
    if (param === 'course') {
      return courses[0];
    }
  });
  const navigation = {
    navigate: jest.fn(),
    getParam: mockNavigationGetParam,
    pop: jest.fn(),
  };
  const contextValues = {
    state: {courses, deleteCourse: jest.fn()},
    updateCourse: jest.fn(),
    deleteCourse: jest.fn(),
  };

  it('Renders correctly for superuser', async () => {
    const authContextValues = {
      state: {role: 'superuser', pk: '1'},
    };
    jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => authContextValues);

    jest
      .spyOn(CourseContext, 'useCourseContext')
      .mockImplementation(() => contextValues);

    const {getByText, getByTestId, queryByTestId} = await render(
      <CourseDetailScreen navigation={navigation} />,
    );

    expect(getByText('test1')).toBeTruthy();
    expect(getByText('1 month')).toBeTruthy();
    expect(getByText('test description')).toBeTruthy();
    expect(getByText('4 / 5')).toBeTruthy();
    expect(getByTestId('enroll-button')).toBeTruthy();
    expect(queryByTestId('edit-button')).toBeTruthy();
    expect(queryByTestId('delete-button')).toBeTruthy();
  });

  it('Renders correctly for student', async () => {
    const authContextValues = {
      state: {role: 'student', pk: '1'},
    };
    jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => authContextValues);

    jest
      .spyOn(CourseContext, 'useCourseContext')
      .mockImplementation(() => contextValues);

    const {getByText, getByTestId, queryByTestId, toJSON} = await render(
      <CourseDetailScreen navigation={navigation} />,
    );

    expect(getByText('test1')).toBeTruthy();
    expect(getByText('1 month')).toBeTruthy();
    expect(getByText('test description')).toBeTruthy();
    expect(getByText('4 / 5')).toBeTruthy();
    expect(getByTestId('enroll-button')).toBeTruthy();
    expect(queryByTestId('edit-button')).toBeFalsy();
    expect(queryByTestId('delete-button')).toBeFalsy();
  });

  it('Renders correct capacity and add button for user who is not enrolled in the course', async () => {
    const authContextValues = {
      state: {role: 'student', pk: '1'},
    };
    jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => authContextValues);

    jest
      .spyOn(CourseContext, 'useCourseContext')
      .mockImplementation(() => contextValues);

    const {getByText, queryByTestId} = await render(
      <CourseDetailScreen navigation={navigation} />,
    );

    expect(getByText('4 / 5')).toBeTruthy();
    expect(queryByTestId('enroll-button')).toBeTruthy();
  });

  it('Renders correct capacity and drop button for user who is not enrolled in the course', async () => {
    const authContextValues = {
      state: {role: 'student', pk: '3'},
    };
    jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => authContextValues);

    jest
      .spyOn(CourseContext, 'useCourseContext')
      .mockImplementation(() => contextValues);

    const {getByText, queryByTestId} = await render(
      <CourseDetailScreen navigation={navigation} />,
    );

    expect(getByText('4 / 5')).toBeTruthy();
    expect(queryByTestId('drop-button')).toBeTruthy();
  });

  it('Handles onPress for navigating to edit screen for superuser', async () => {
    const authContextValues = {
      state: {role: 'superuser', pk: '3'},
    };
    jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => authContextValues);

    jest
      .spyOn(CourseContext, 'useCourseContext')
      .mockImplementation(() => contextValues);

    const {queryByTestId} = await render(
      <CourseDetailScreen navigation={navigation} />,
    );

    const editButton = queryByTestId('edit-button');

    fireEvent.press(editButton);

    expect(editButton).toBeTruthy();
    expect(navigation.navigate).toHaveBeenCalledTimes(1);
  });

  it('Handles onPress for deleting a course for superuser', async () => {
    const authContextValues = {
      state: {role: 'superuser', pk: '3'},
    };
    jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => authContextValues);

    jest
      .spyOn(CourseContext, 'useCourseContext')
      .mockImplementation(() => contextValues);

    const {queryByTestId} = await render(
      <CourseDetailScreen navigation={navigation} />,
    );

    const deleteButton = queryByTestId('delete-button');

    fireEvent.press(deleteButton);

    expect(deleteButton).toBeTruthy();
    expect(contextValues.deleteCourse).toHaveBeenCalledTimes(1);
  });
});
