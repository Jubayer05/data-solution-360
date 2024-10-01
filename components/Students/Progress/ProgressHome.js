import React, { useEffect, useState } from 'react';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa6';
import { LuChevronRight, LuClipboardSignature } from 'react-icons/lu';
import LeaderBoard from './LeaderBoard';

import Link from 'next/link';
import { useStateContext } from '../../../src/context/ContextProvider';
import useEnrolledCourseData from '../../../src/hooks/useEnrolledCourseData';
import Report from './Report';

const ProgressHome = () => {
  const [currentUrl, setCurrentUrl] = useState(null);
  const { enrolledCourse } = useEnrolledCourseData();
  const { findCurrentUser } = useStateContext();

  const totalQuizNumber = enrolledCourse?.course_modules?.reduce(
    (sum, item) => sum + (item?.additionalInfo?.totalQuizNum || 0),
    0,
  );

  const findUsersScore = enrolledCourse?.leaderboard_data?.find(
    (item) => item.userId === findCurrentUser.student_id,
  );

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const calculateCompletedLiveClasses = (courseModules) => {
    let liveClassCount = 0;

    // Traverse through each module in the course_modules
    courseModules?.forEach((module) => {
      // Traverse through each lesson in the module
      module.lessons.forEach((lesson) => {
        // Check if liveClassLink exists in the lesson
        if (lesson.liveClassLink) {
          liveClassCount++; // Increment the counter if liveClassLink is present
        }
      });
    });

    return liveClassCount; // Return the total count of live classes
  };

  // Usage Example:
  // Assuming you have the enrolledCourse data with course_modules
  const liveClassCount = calculateCompletedLiveClasses(
    enrolledCourse.course_modules,
  );

  return (
    <div className="h-[calc(100vh-100px)] fixed top-[90px] overflow-y-scroll mr-5">
      <Report
        totalQuizNumber={totalQuizNumber}
        findUsersScore={findUsersScore}
        liveClassCount={liveClassCount}
      />
      <Link href={`${currentUrl}/notice`}>
        <button
          className="flex justify-between items-center gap-2 bg-[#ffffff] text-black visited:text-black
        font-semibold  py-3 px-5 rounded border-dashboard_border border w-full mt-4 hover:text-primary transition-all duration-200"
        >
          <p className="flex items-center gap-2 text-lg">
            {' '}
            <LuClipboardSignature className="text-primary text-2xl" /> Notice
            Board (3)
          </p>{' '}
          <LuChevronRight className="text-primary text-2xl" />
        </button>
      </Link>

      <LeaderBoard />

      <div className="bg-white mt-4 p-4 border border-dashboard_border rounded">
        <h4 className="text-sm">Join Private Group</h4>
        <div className="flex gap-3 mt-2">
          <button
            className="flex justify-center items-center gap-2 bg-[#c8ffe6] hover:bg-[#d0d0d0] font-semibold
            py-2 px-4 rounded w-full text-[#009351] transition-all duration-200"
          >
            JOIN <FaWhatsapp />
          </button>
          <button
            className="flex justify-center items-center gap-2 bg-[#e9efff] hover:bg-[#d0d0d0] font-semibold
            py-2 px-4 rounded w-full text-[#4478ff] transition-all duration-200"
          >
            JOIN <FaFacebook />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressHome;
