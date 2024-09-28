import { useRouter } from 'next/router';
import { useState } from 'react';
import Swal from 'sweetalert2';
import firebase from '../../firebase'; // Adjust to your Firebase config file

const firestore = firebase.firestore();

/**
 * Custom hook to update lesson data within a course module.
 */
const useUpdateLessonData = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to update lesson data
  const updateLessonData = async (updatedLessonData) => {
    const { courseId, moduleId, quizId } = router.query;

    if (!courseId || !moduleId || !quizId) {
      Swal.fire({
        title: 'Error',
        text: 'Missing courseId, moduleId, or quizId in query.',
        icon: 'error',
      });
      return;
    }

    try {
      setLoading(true);

      // Step 1: Query Firestore to find the course document by the `courseId` field
      const courseQuerySnapshot = await firestore
        .collection('course_data_batch')
        .where('unique_batch_id', '==', courseId) // Search for the document where courseId matches
        .get();

      if (courseQuerySnapshot.empty) {
        throw new Error('Course not found');
      }

      // Assuming `courseId` is unique, so we can take the first document in the result
      const courseDoc = courseQuerySnapshot.docs[0];
      const courseData = courseDoc.data();

      // Step 2: Find the module by moduleId in course data
      const moduleIndex = courseData.course_modules.findIndex(
        (module) => module.id === moduleId,
      );
      if (moduleIndex === -1) {
        throw new Error('Module not found');
      }

      // Step 3: Find the lesson by quizId in module data
      const lessonIndex = courseData.course_modules[
        moduleIndex
      ].lessons.findIndex((lesson) => lesson.id === quizId);
      if (lessonIndex === -1) {
        throw new Error('Lesson not found');
      }

      // Step 4: Update the lesson data
      courseData.course_modules[moduleIndex].lessons[lessonIndex] = {
        ...courseData.course_modules[moduleIndex].lessons[lessonIndex],
        ...updatedLessonData, // Merge updated data with existing lesson data
      };

      // Step 5: Update the course document in Firestore
      await firestore
        .collection('course_data_batch')
        .doc(courseDoc.id) // Use the document ID from the query result
        .update(courseData);

      Swal.fire({
        title: 'Success',
        text: 'Quiz has been submitted successfully!',
        icon: 'success',
      });
    } catch (err) {
      console.error('Failed to update lesson:', err);
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    updateLessonData, // Function to update lesson data
  };
};

export default useUpdateLessonData;
