import { useRouter } from 'next/router';
import firebase from '../../firebase'; // Adjust to your Firebase config file
import useEnrolledCourseData from './useEnrolledCourseData';
// import { useEnrolledCourseData } from './useEnrolledCourseData'; // Assuming this is where the hook is

const db = firebase.firestore(); // Your Firestore config

// Custom hook for submitting quiz and updating the leaderboard
const useSubmitQuizAndUpdateLeaderboard = () => {
  const router = useRouter();
  const { courseId, moduleId, quizId } = router.query; // Get values from router

  const { enrolledCourse } = useEnrolledCourseData(); // Custom hook to get the enrolled course

  const courseData = { ...enrolledCourse };

  const submitQuizAndUpdateLeaderboard = async (userId, newQuizScore) => {
    if (!courseId || !moduleId || !quizId) {
      console.log('Missing courseId, moduleId, or quizId from router query');
      return;
    }

    if (!enrolledCourse) {
      console.log('No enrolled course data found');
      return;
    }

    // 1. Update the user's quiz data in user_quiz_data array
    const moduleData = enrolledCourse.course_modules.find(
      (module) => module.id === moduleId,
    );
    if (!moduleData) {
      console.log('Module not found');
      return;
    }

    const lessonData = moduleData.lessons.find(
      (lesson) => lesson.id === quizId,
    );
    if (!lessonData) {
      console.log('Lesson not found');
      return;
    }

    // let userQuizData = lessonData.user_quizData || [];
    // let userIndex = userQuizData.findIndex(
    //   (quiz) => quiz.student_id === userId,
    // );

    // if (userIndex === -1) {
    //   userQuizData.push({
    //     userId,
    //     score: newQuizScore,
    //   });
    // } else {
    //   userQuizData[userIndex].score = newQuizScore;
    // }

    // 2. Check if leaderboard_data exists; if not, create it
    let leaderboard = enrolledCourse.leaderboard_data || [];

    // Find the user's position in the leaderboard
    let leaderboardIndex = leaderboard.findIndex(
      (user) => user.userId === userId,
    );

    // If the user is not on the leaderboard, add them
    if (leaderboardIndex === -1) {
      leaderboard.push({ userId, totalScore: newQuizScore, rank: null });
    } else {
      // If the user is already on the leaderboard, update their score
      leaderboard[leaderboardIndex].totalScore += newQuizScore;
    }

    // Sort the leaderboard by total score in descending order and reassign ranks
    leaderboard.sort((a, b) => b.totalScore - a.totalScore);

    // Assign ranks based on the sorted leaderboard
    leaderboard = leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1, // Rank starts from 1
    }));

    // Update courseData's leaderboard_data with the latest leaderboard (overwrite the existing one)
    courseData.leaderboard_data = leaderboard;

    // console.log(courseData.leaderboard_data);

    // 3. Update Firestore with the new quiz data and leaderboard data
    await db
      .collection('course_data_batch')
      .doc(enrolledCourse.id) // Use the document ID from the query result
      .update(courseData);

    console.log('Quiz and leaderboard updated successfully');
  };

  return { submitQuizAndUpdateLeaderboard };
};

export default useSubmitQuizAndUpdateLeaderboard;
