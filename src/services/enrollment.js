import courseApi from '../api/course';
import {navigate} from '../navigationRef';

export const enrollInCourse = async (userId, courseId) => {
  try {
    const response = await courseApi.post(
      `/enrollment/${userId}/${courseId}/`,
      {
        user: userId,
        course: courseId,
      },
    );
    console.log('response', response);
    navigate('CourseList');
  } catch (error) {
    console.log('error in course enrollment', error);
  }
};

export const dropCourse = async (userId, courseId) => {
  try {
    const response = await courseApi.delete(
      `/enrollment/${userId}/${courseId}/`,
    );
    console.log('response', response);
    navigate('CourseList');
  } catch (error) {
    console.log('error in course enrollment', error);
  }
};
