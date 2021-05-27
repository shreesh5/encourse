import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import AddCourseScreen from '../src/screens/AddCourseScreen';
import * as CourseContext from '../src/context/CourseContext';

describe('<AddCourseScreen />', () => {
  const errorMessage = '';

  it('Handles onPress to create new course', async () => {
    const contextValues = {state: {errorMessage}, createCourse: jest.fn()};
    jest
      .spyOn(CourseContext, 'useCourseContext')
      .mockImplementation(() => contextValues);

    const {getByTestId} = await render(<AddCourseScreen />);

    const addCourseButton = getByTestId('addcourse-button');
    fireEvent.press(addCourseButton);

    expect(contextValues.createCourse).toHaveBeenCalledTimes(1);
  });
});
