import createDataContext from './createDataContext';
import courseApi from '../api/course';

const courseReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_courses':
      return action.payload;
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

export const {Context, Provider} = createDataContext(
  courseReducer,
  {fetchCourses, createCourse},
  [],
);
