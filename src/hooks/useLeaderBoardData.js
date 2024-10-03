import { useEffect, useState } from 'react';
import {
  ASSIGNMENT_PERCENTAGE,
  ATTENDANCE_PERCENTAGE,
  QUIZ_PERCENTAGE,
} from '../data/globalvariable';
import { loadData } from './loadData';
import useCourseStatistics from './useCourseStatistics';
import useEnrolledCourseData from './useEnrolledCourseData'; // Modify as needed

const useLeaderboardData = () => {
  const [allLeaderBoardData, setAllLeaderBoardData] = useState([]);
  const [usersInfo, setUsersInfo] = useState([]);
  const { enrolledCourse } = useEnrolledCourseData();
  const { totalQuizNumber, liveClassCount, assignmentNumber } =
    useCourseStatistics();

  // Step 1: Fetch users information from the 'users' collection
  useEffect(() => {
    loadData('users', setUsersInfo);
  }, []);

  // Step 2: Merge leaderboard data with users information
  useEffect(() => {
    if (!enrolledCourse || usersInfo.length === 0) return;

    // Create a map to hold total assignment scores
    const totalAssignmentScores = {};

    // Calculate total assignment scores
    enrolledCourse?.assignment_data?.forEach((assignment) => {
      assignment.submitted_students.forEach((student) => {
        if (!totalAssignmentScores[student.student_id]) {
          totalAssignmentScores[student.student_id] = 0;
        }
        totalAssignmentScores[student.student_id] += parseFloat(
          student.obtain_marks,
        );
      });
    });

    // Merge leaderboard data with user information
    const mergedLeaderboardData = enrolledCourse?.leaderboard_data?.map(
      (student) => {
        // Find the user information for the current student_id
        const userInfo =
          usersInfo.find((user) => user.student_id === student.userId) || {};

        const quizPercentage =
          (student.totalQuizScore / totalQuizNumber) * QUIZ_PERCENTAGE;
        const attendancePercentage =
          (student.attendanceScore / totalQuizNumber) * ATTENDANCE_PERCENTAGE;

        const assignmentScore = totalAssignmentScores[student.userId] || 0;
        const assignmentPercentage =
          (assignmentScore / assignmentNumber) * ASSIGNMENT_PERCENTAGE;

        // Calculate total student score by summing the percentages
        const totalStudentScore = parseFloat(
          (
            quizPercentage +
            attendancePercentage +
            assignmentPercentage
          ).toFixed(2),
        );

        return {
          student_id: student.userId,
          full_name: userInfo.full_name || 'Unknown', // Example user info
          email: userInfo.email || 'N/A', // Example user info
          photoUrl: userInfo.photoUrl || null,
          totalQuizScore: student.totalQuizScore,
          quizPercentage: quizPercentage.toFixed(2),
          attendanceScore: student.attendanceScore,
          attendancePercentage: attendancePercentage.toFixed(2),
          totalAssignmentScore: assignmentScore,
          assignmentPercentage: assignmentPercentage.toFixed(2),
          totalStudentScore, // Already formatted
        };
      },
    );

    setAllLeaderBoardData(mergedLeaderboardData);
  }, [enrolledCourse, usersInfo, totalQuizNumber, assignmentNumber]);

  return allLeaderBoardData;
};

export default useLeaderboardData;
