import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MdOnlinePrediction } from 'react-icons/md';
import firebase from '../../firebase';
import { useStateContext } from '../../src/context/ContextProvider';
import useEnrolledCourseData from '../../src/hooks/useEnrolledCourseData';
import { convertToAMPM } from '../../src/utils/convertAMPM';
import PhoneAuth from '../Login/PhoneLogin';
const db = firebase.firestore();

const JoinLive = () => {
  const { findCurrentUser } = useStateContext();
  const [hasZoomLink, setHasZoomLink] = useState(true);
  const router = useRouter();
  const { moduleData, enrolledCourse } = useEnrolledCourseData();
  const { courseId, moduleId, liveId } = router.query;
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    setCourseData({ ...enrolledCourse });
  }, [enrolledCourse]);

  const findCurrentLesson = moduleData?.lessons?.find(
    (lesson) => lesson.id === liveId,
  );

  const handleAttendance = async (userId, sessionId) => {
    if (!courseId || !moduleId) {
      console.log('Missing courseId or moduleId from router query');
      return;
    }

    if (!enrolledCourse) {
      console.log('No enrolled course data found');
      return;
    }

    // Find the user's data in the leaderboard
    let leaderboard = enrolledCourse.leaderboard_data || [];
    let userIndex = leaderboard.findIndex((user) => user.userId === userId);

    // If the user is not in the leaderboard, add them with attendance score
    if (userIndex === -1) {
      leaderboard.push({
        userId,
        totalQuizScore: 0,
        attendanceScore: 1,
        rank: null,
        hasJoinedLive: { [sessionId]: true }, // Add sessionId to track attendance
      });
    } else {
      // Check if the user has already joined the live class for this session
      if (
        leaderboard[userIndex].hasJoinedLive &&
        leaderboard[userIndex].hasJoinedLive[sessionId]
      ) {
        console.log('User has already joined the live class for this session');
        return; // Prevent multiple attendance gains for the same session
      }

      // If user exists, update their attendance score
      leaderboard[userIndex].attendanceScore =
        (leaderboard[userIndex].attendanceScore || 0) + 1;

      // Mark that the user has joined this session
      leaderboard[userIndex].hasJoinedLive = {
        ...leaderboard[userIndex].hasJoinedLive,
        [sessionId]: true,
      };
    }

    // Update courseData with the new leaderboard
    courseData.leaderboard_data = leaderboard;

    // Update Firestore with the updated leaderboard
    await db
      .collection('course_data_batch')
      .doc(enrolledCourse.id)
      .update(courseData);
  };

  /*
   * Title: JOIN Live Class functionality
   * Description:
   * Author: Jubayer Ahmed
   * Date: 13 July, 2024
   *
   * 1. Create a new database for join live class
   * 2. Database will have each batch information
   * 3. Each batch will have a unique identifier
   * 4. Each batch will contain a images, join zoom link btn, Course title, class time
   * 5. If not authenticated then show the login button
   * 6. By clicking zoom links redirect zoom apps
   * 7. Handle Admin dashboard to manage it
   */
  return (
    <div className="max-w-5xl mx-auto my-20">
      <h2 className="text-2xl font-semibold">Join Live Class</h2>
      <hr className="mt-3" />
      <div className="flex gap-2 mt-10">
        <div className="w-[60%]">
          <Image
            width={500}
            height={300}
            src={enrolledCourse?.courseData?.img}
            alt=""
            className="w-full object-cover rounded-xl"
          />
          <p className="text-lg font-bold mt-5">
            {enrolledCourse?.courseData?.title}
          </p>
          <div className="flex justify-between mt-3 gap-3">
            <p className="bg-yellow-100 inline-block px-3 rounded-md">
              <strong>Module: </strong> {moduleData?.moduleName}
            </p>
            <p className="text-base font-medium">
              Class Time:{' '}
              <span className="text-primary">
                {convertToAMPM(findCurrentLesson?.classTime)}
              </span>{' '}
            </p>
          </div>
        </div>
        <div className="w-[40%]">
          <div className="border-l-[3px] border-[#000000] pl-5 py-2 rounded">
            <p className="font-semibold text-lg">{findCurrentLesson?.title}</p>
            <div className="flex mt-2 items-center gap-3">
              <p
                className="text-base flex justify-center items-center gap-2 px-2 rounded 
              bg-black text-white w-[30%]"
              >
                <MdOnlinePrediction /> Live Class
              </p>
              <p className="w-[70%]">
                {findCurrentUser?.email && hasZoomLink
                  ? 'Click this link to join the class.'
                  : findCurrentUser?.email && !hasZoomLink
                  ? 'Live class has ended. To see class recording click the following link.'
                  : 'Live class has ended. To see class recording please login.'}
              </p>
            </div>
          </div>
          {findCurrentUser?.email ? (
            <Link
              onClick={() =>
                handleAttendance(findCurrentUser?.student_id, liveId)
              }
              href={
                findCurrentLesson?.liveClassLink
                  ? findCurrentLesson.liveClassLink
                  : '/students/class-joining'
              }
              target="_blank"
              className="flex justify-center items-center gap-2 bg-[#fecb63] hover:bg-[#e7b655] 
            font-semibold py-2 px-5 rounded transition-all duration-200 text-black visited:text-black mt-5"
            >
              {hasZoomLink ? 'Join Live' : 'Class Recording'}
            </Link>
          ) : (
            <div className="border mt-5 rounded pt-2 pb-5">
              <PhoneAuth />
              <p className="text-center font-semibold">
                For any help please call: +8801996104096{' '}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinLive;
