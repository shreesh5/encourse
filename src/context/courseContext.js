import createDataContext from './createDataContext';
import courseApi from '../api/course';
import {navigate} from '../navigationRef';

const courseReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_courses':
      return action.payload;
    case 'delete_course':
      return state.filter((course) => course.id !== action.payload);
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

const createCourse = () => {
  return async ({name, duration, description, capacity}) => {
    try {
      await courseApi.post('/courses/', {
        name,
        duration,
        description,
        capacity,
      });
    } catch (error) {
      console.log('error in creating course', error);
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
    }
  };
};

export const {Context, Provider} = createDataContext(
  courseReducer,
  {fetchCourses, createCourse, deleteCourse},
  [],
);
