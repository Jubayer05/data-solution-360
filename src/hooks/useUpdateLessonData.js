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
    const { courseId, moduleId, quizId, liveId } = router.query;

    // Check that at least courseId and moduleId are present
    if (!courseId || !moduleId) {
      Swal.fire({
        title: 'Error',
        text: 'Missing courseId or moduleId in query.',
        icon: 'error',
      });
      return;
    }

    // Ensure at least one of quizId or liveId is provided
    if (!quizId && !liveId) {
      Swal.fire({
        title: 'Error',
        text: 'Missing quizId or liveId in query.',
        icon: 'error',
      });
      return;
    }

    try {
      setLoading(true);

      // Step 1: Query Firestore to find the course document by the `courseId`
      const courseQuerySnapshot = await firestore
        .collection('course_data_batch')
        .where('unique_batch_id', '==', courseId)
        .get();

      if (courseQuerySnapshot.empty) {
        throw new Error('Course not found');
      }

      // Assuming `courseId` is unique, take the first document in the result
      const courseDoc = courseQuerySnapshot.docs[0];
      const courseData = courseDoc.data();

      // Step 2: Find the module by moduleId in course data
      const moduleIndex = courseData.course_modules.findIndex(
        (module) => module.id === moduleId,
      );
      if (moduleIndex === -1) {
        throw new Error('Module not found');
      }

      // Step 3: Determine the lesson index based on quizId or liveId
      const lessonIndex = courseData.course_modules[
        moduleIndex
      ].lessons.findIndex((lesson) => {
        return lesson.id === quizId || lesson.id === liveId;
      });

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

      // Optionally: Notify the user of success
      if (quizId) {
        Swal.fire({
          title: 'Success',
          text: 'Lesson data updated successfully.',
          icon: 'success',
        });
      }
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
