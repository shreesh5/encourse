import createDataContext from './createDataContext';
import courseApi from '../api/course';
import {navigate} from '../navigationRef';
import {useContext} from 'react/cjs/react.development';

const courseReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_courses':
      return {...state, courses: action.payload};
    case 'update_course':
      return {
        ...state,
        courses: state.courses.map((course) => {
          return course.id === action.payload.id ? action.payload : course;
        }),
      };
    case 'delete_course':
      return {
        ...state,
        courses: state.courses.filter((course) => course.id !== action.payload),
      };
    case 'add_course':
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };
    case 'add_error':
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

// Action to fetch list of all courses.
const fetchCourses = (dispatch) => {
  return async () => {
    const response = await courseApi.get('/coursetest/');
    dispatch({
      type: 'fetch_courses',
      payload: response.data.sort((a, b) => a.name > b.name),
    });
  };
};

// Action to create a new course.
const createCourse = (dispatch) => {
  return async (name, duration, description, capacity) => {
    try {
      await courseApi.post('/coursetest/', {
        name,
        duration,
        description,
        capacity,
      });
    } catch (error) {
      console.log('error in creating course', error);
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with creating a course!',
      });
    }
  };
};

// Action to delete an exisiting course.
const deleteCourse = (dispatch) => {
  return async (courseId) => {
    try {
      const response = await courseApi.delete(`/coursetest/${courseId}/`);
      console.log('response', response);
      dispatch({type: 'delete_course', payload: courseId});
      navigate('CourseList');
    } catch (error) {
      console.log('error in delete user response', error);
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with deleting a course!',
      });
    }
  };
};

// Action to update details of exisiting course.
const updateCourse = (dispatch) => {
  return async (id, name, duration, description, capacity, callback) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await courseApi.put(`/coursetest/${id}/`, {
        id,
        name,
        duration,
        description,
        capacity,
      });
      // console.log('response', response);
      dispatch({
        type: 'update_course',
        payload: {id, name, duration, description, capacity},
      });
      if (callback) {
        callback();
      }
    } catch (error) {
      console.log('error in update user response', error);
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with updating a course!',
      });
    }
  };
};

// Using helper function to create Context and Provider.
export const {Context, Provider} = createDataContext(
  courseReducer,
  {fetchCourses, createCourse, deleteCourse, updateCourse},
  {
    courses: [],
    errorMessage: '',
  },
);

// Helper function for accessing AuthContext
// state and actions. Mainly used for testing
// context.
export const useCourseContext = () => useContext(Context);
