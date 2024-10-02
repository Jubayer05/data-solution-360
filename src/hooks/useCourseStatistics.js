import { useEffect, useState } from 'react';
import { useStateContext } from '../context/ContextProvider';
import useEnrolledCourseData from './useEnrolledCourseData';
// Assuming you have this hook

const useCourseStatistics = () => {
  const { enrolledCourse } = useEnrolledCourseData();
  const { findCurrentUser } = useStateContext();

  const [obtained_percentage_quiz, setObtainedPercentageQuiz] = useState(0);
  const [obtained_percentage_attendance, setObtainedPercentageAttendance] =
    useState(0);
  const [obtained_percentage_assignment, setAssignmentPercentage] = useState(0);
  const [average_percentage, setAveragePercentage] = useState(0);

  // Function to calculate completed live classes
  const calculateCompletedLiveClasses = (courseModules) => {
    let liveClassCount = 0;
    courseModules?.forEach((module) => {
      module.lessons.forEach((lesson) => {
        if (lesson.liveClassLink) {
          liveClassCount++;
        }
      });
    });
    return liveClassCount;
  };

  useEffect(() => {
    if (enrolledCourse && findCurrentUser) {
      const liveClassCount = calculateCompletedLiveClasses(
        enrolledCourse.course_modules,
      );

      const totalQuizNumber = enrolledCourse?.course_modules?.reduce(
        (sum, item) => sum + (item?.additionalInfo?.totalQuizNum || 0),
        0,
      );

      const totalAssignmentNum = enrolledCourse?.assignment_data?.reduce(
        (sum, item) => sum + parseInt(item?.total_marks || 0),
        0,
      );

      const usersTotalAssignmentMarks = enrolledCourse?.assignment_data?.reduce(
        (sum, item) =>
          sum +
          parseInt(
            item?.submitted_students?.find(
              (stu) => stu?.student_id === findCurrentUser?.student_id,
            )?.obtain_marks || 0,
          ),
        0,
      );

      const obtained_percentage_assignment =
        totalAssignmentNum > 0
          ? (usersTotalAssignmentMarks / totalAssignmentNum) * 100
          : 0;

      const findUsersScore = enrolledCourse?.leaderboard_data?.find(
        (item) => item.userId === findCurrentUser.student_id,
      );

      const obtained_percentage_quiz =
        totalQuizNumber > 0
          ? Math.ceil((findUsersScore?.totalQuizScore / totalQuizNumber) * 100)
          : 0;

      const obtained_percentage_attendance =
        liveClassCount > 0
          ? Math.ceil((findUsersScore?.attendanceScore / liveClassCount) * 100)
          : 0;

      const average_percentage = Math.ceil(
        obtained_percentage_attendance * (20 / 100) +
          obtained_percentage_quiz * (30 / 100) +
          obtained_percentage_assignment * (50 / 100),
      );

      // Update the state with calculated values
      setObtainedPercentageQuiz(obtained_percentage_quiz);
      setObtainedPercentageAttendance(obtained_percentage_attendance);
      setAssignmentPercentage(obtained_percentage_assignment);
      setAveragePercentage(average_percentage);
    }
  }, [enrolledCourse, findCurrentUser]);

  return {
    obtained_percentage_quiz,
    obtained_percentage_attendance,
    obtained_percentage_assignment,
    average_percentage,
  };
};

export default useCourseStatistics;
