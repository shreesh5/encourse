import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import CourseForm from '../src/components/CourseForm';

describe('<CourseForm />', () => {
  it('Renders default course form elements', async () => {
    const signinOnSubmit = jest.fn();
    const testID = 'courseform-button';

    const {getByText, getByPlaceholderText} = render(
      <CourseForm
        headerText="Add Course"
        errorMessage=""
        submitButtonText="Add Course"
        onSubmit={signinOnSubmit}
        buttonTestID={testID}
        initialValues={{
          name: '',
          duration: '',
          description: '',
          capacity: '',
        }}
      />,
    );

    const nameLabel = getByText('Name');
    const nameInput = getByPlaceholderText('CSE 101');
    const durationLabel = getByText('Duration');
    const durationInput = getByPlaceholderText('1 month');
    const descriptionLabel = getByText('Description');
    const descriptionInput = getByPlaceholderText('Example Description');
    const capacityLabel = getByText('Capacity');
    const capacityInput = getByPlaceholderText('5');

    expect(nameLabel).toBeTruthy();
    expect(nameInput).toBeTruthy();
    expect(durationInput).toBeTruthy();
    expect(durationLabel).toBeTruthy();
    expect(descriptionLabel).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
    expect(capacityInput).toBeTruthy();
    expect(capacityLabel).toBeTruthy();
  });

  it('Renders edit course form elements', async () => {
    const signinOnSubmit = jest.fn();
    const testID = 'courseform-button';

    const {getByText, getByDisplayValue} = render(
      <CourseForm
        headerText="Add Course"
        errorMessage=""
        submitButtonText="Add Course"
        onSubmit={signinOnSubmit}
        buttonTestID={testID}
        initialValues={{
          name: 'CSE 101',
          duration: '2 months',
          description: 'This is a test description for course CSE 101.',
          capacity: '5',
        }}
      />,
    );

    const nameLabel = getByText('Name');
    const nameInput = getByDisplayValue('CSE 101');
    const durationLabel = getByText('Duration');
    const durationInput = getByDisplayValue('2 months');
    const descriptionLabel = getByText('Description');
    const descriptionInput = getByDisplayValue('This is a test description for course CSE 101.');
    const capacityLabel = getByText('Capacity');
    const capacityInput = getByDisplayValue('5');

    expect(nameLabel).toBeTruthy();
    expect(nameInput).toBeTruthy();
    expect(durationInput).toBeTruthy();
    expect(durationLabel).toBeTruthy();
    expect(descriptionLabel).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
    expect(capacityInput).toBeTruthy();
    expect(capacityLabel).toBeTruthy();
  });

  it('Handles onPress for adding a new course', async () => {
    const addCourseOnSubmit = jest.fn();
    const testID = 'courseform-button';
    const testValues = {
      name: 'CSE 101',
      duration: '1 month',
      descriptionInput: 'This is a test description for CSE 101.',
      capacity: '5',
    };

    const {getByTestId, getByPlaceholderText} = render(
      <CourseForm
        headerText="Add Course"
        errorMessage=""
        submitButtonText="Add Course"
        onSubmit={addCourseOnSubmit}
        buttonTestID={testID}
        initialValues={{
          name: '',
          duration: '',
          description: '',
          capacity: '',
        }}
      />,
    );

    const nameInput = getByPlaceholderText('CSE 101');
    const durationInput = getByPlaceholderText('1 month');
    const descriptionInput = getByPlaceholderText('Example Description');
    const capacityInput = getByPlaceholderText('5');
    const addCourseButton = getByTestId(testID);

    fireEvent.changeText(nameInput, testValues.name);
    fireEvent.changeText(durationInput, testValues.duration);
    fireEvent.changeText(descriptionInput, testValues.description);
    fireEvent.changeText(capacityInput, testValues.capacity);
    fireEvent.press(addCourseButton);

    expect(addCourseOnSubmit).toHaveBeenCalledTimes(1);
    expect(addCourseOnSubmit).toHaveBeenCalledWith(
      testValues.name,
      testValues.duration,
      testValues.description,
      testValues.capacity,
    );
  });

  it('Handles onPress for editing a course', async () => {
    const addCourseOnSubmit = jest.fn();
    const testID = 'courseform-button';
    const testValues = {
      name: 'CSE 101',
      duration: '2 month',
      descriptionInput: 'This is an updated test description for CSE 101.',
      capacity: '10',
    };

    const {getByTestId, getByDisplayValue} = render(
      <CourseForm
        headerText="Add Course"
        errorMessage=""
        submitButtonText="Add Course"
        onSubmit={addCourseOnSubmit}
        buttonTestID={testID}
        initialValues={{
          name: 'CSE 101',
          duration: '1 month',
          description: 'This is a test description for CSE 101.',
          capacity: '5',
        }}
      />,
    );

    const nameInput = getByDisplayValue('CSE 101');
    const durationInput = getByDisplayValue('1 month');
    const descriptionInput = getByDisplayValue('This is a test description for CSE 101.');
    const capacityInput = getByDisplayValue('5');
    const addCourseButton = getByTestId(testID);

    fireEvent.changeText(nameInput, testValues.name);
    fireEvent.changeText(durationInput, testValues.duration);
    fireEvent.changeText(descriptionInput, testValues.description);
    fireEvent.changeText(capacityInput, testValues.capacity);
    fireEvent.press(addCourseButton);

    expect(addCourseOnSubmit).toHaveBeenCalledTimes(1);
    expect(addCourseOnSubmit).toHaveBeenCalledWith(
      testValues.name,
      testValues.duration,
      testValues.description,
      testValues.capacity,
    );
  });
});
