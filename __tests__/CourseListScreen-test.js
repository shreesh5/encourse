import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import CourseListScreen from '../src/screens/CourseListScreen';
import * as CourseContext from '../src/context/CourseContext';

describe('<CourseListScreen />', () => {
  const navigation = {
    navigate: jest.fn(),
    addListener: jest.fn(() => ({
      remove: jest.fn(),
    })),
  };

  const courses = [
    {
      id: 1,
      name: 'test1',
      duration: '1 month',
      description: 'test description',
      capacity: 5,
    },
    {
      id: 2,
      name: 'test2',
      duration: '2 months',
      description: 'test description 2',
      capacity: 5,
    },
    {
      id: 3,
      name: 'test3',
      duration: '3 months',
      description: 'test description 3',
      capacity: 5,
    },
  ];

  it('Renders correctly', async () => {
    const contextValues = {state: {courses}, fetchCourses: jest.fn()};
    jest
      .spyOn(CourseContext, 'useCourseContext')
      .mockImplementation(() => contextValues);

    const {queryByText} = await render(
      <CourseListScreen navigation={navigation} />,
    );

    expect(queryByText('test1')).toBeTruthy();
    expect(queryByText('test2')).toBeTruthy();
    expect(queryByText('test3')).toBeTruthy();
  });

  it('Handles navigation for onPress', async () => {
    const contextValues = {state: {courses}, fetchCourses: jest.fn()};
    jest
      .spyOn(CourseContext, 'useCourseContext')
      .mockImplementation(() => contextValues);

    const {getByTestId} = await render(
      <CourseListScreen navigation={navigation} />,
    );

    const test1Button = getByTestId(`button-${courses[0].id}`);
    fireEvent.press(test1Button);

    expect(navigation.navigate).toHaveBeenCalledTimes(1);
    expect(navigation.navigate).toHaveBeenCalledWith('CourseDetail', {
      course: courses[0],
    });
  });
});
