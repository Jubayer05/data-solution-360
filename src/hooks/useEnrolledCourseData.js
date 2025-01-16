import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useStateContext } from '../context/ContextProvider';
import { loadData } from './loadData';
// import { loadData } from '../utils/fetchCourseData'; // Adjust path

/**
 * Custom hook to handle loading and setting enrolled course data.
 */
const useEnrolledCourseData = () => {
  // const { setEnrolledCourse } = useStateContextDashboard();
  const { findCurrentUser, enrolledCourseIds } = useStateContext();
  const [courseDataBatch, setCourseDataBatch] = useState([]);
  const [enrolledCourse, setEnrolledCourse] = useState([]); // In case this is used somewhere else
  const [moduleData, setModuleData] = useState(null);
  const router = useRouter();

  // Fetch and update enrolled course based on courseId from router
  useEffect(() => {
    const { courseId } = router.query;
    if (courseId && courseDataBatch.length) {
      const course = courseDataBatch.find(
        (item) => item.unique_batch_id === courseId,
      );
      setEnrolledCourse(course);
    }
  }, [courseDataBatch, setEnrolledCourse, router.query]);

  // Fetch module data from enrolled course
  useEffect(() => {
    const { moduleId } = router.query;
    if (moduleId && enrolledCourse) {
      const moduleData = enrolledCourse?.course_modules?.find(
        (module) => module.id === moduleId,
      );
      setModuleData(moduleData);
    }
  }, [enrolledCourse, router.query]);

  // Fetch course data batch from Firestore
  useEffect(() => {
    if (enrolledCourseIds?.length && findCurrentUser) {
      loadData('course_data_batch', setCourseDataBatch, {
        order: { field: 'batchNumber', direction: 'asc' },
        filterFunction: (course) =>
          enrolledCourseIds.includes(course.unique_batch_id) &&
          course.enrolled_students.includes(findCurrentUser.student_id),
        onError: (error) => console.error('Failed to load courses:', error),
      });
    }
  }, [enrolledCourseIds, findCurrentUser]);

  return { courseDataBatch, enrolledCourse, moduleData }; // Return any state or data needed
};

export default useEnrolledCourseData;
