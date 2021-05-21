import createDataContext from './createDataContext';
import courseApi from '../api/course';
import {navigate} from '../navigationRef';

const courseReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_courses':
      return {...state, courses: action.payload};
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

const fetchCourses = (dispatch) => {
  return async () => {
    const response = await courseApi.get('/courses/');
    dispatch({type: 'fetch_courses', payload: response.data});
  };
};

const createCourse = (dispatch) => {
  return async ({name, duration, description, capacity}) => {
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

export const {Context, Provider} = createDataContext(
  courseReducer,
  {fetchCourses, createCourse, deleteCourse},
  {
    courses: [],
    errorMessage: '',
  },
);
