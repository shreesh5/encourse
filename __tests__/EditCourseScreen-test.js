import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import EditCourseScreen from '../src/screens/EditCourseScreen';
import * as CourseContext from '../src/context/CourseContext';

describe('<EditCourseScreen />', () => {
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
  const errorMessage = '';
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

  it('Handles onPress to edit a course', async () => {
    const contextValues = {
      state: {errorMessage, courses},
      updateCourse: jest.fn(),
    };
    jest
      .spyOn(CourseContext, 'useCourseContext')
      .mockImplementation(() => contextValues);

    const {getByTestId} = await render(
      <EditCourseScreen navigation={navigation} />,
    );

    const updateCourseButton = getByTestId('updatecourse-button');
    fireEvent.press(updateCourseButton);

    expect(navigation.getParam).toHaveBeenCalledTimes(1);
    expect(contextValues.updateCourse).toHaveBeenCalledTimes(1);
  });
});
