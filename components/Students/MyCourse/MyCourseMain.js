import React from 'react';
import { useStateContext } from '../../../src/context/ContextProvider';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import CourseItem from '../../Courses/HomeCourseItem';
import EnrolledCourseHome from './EnrolledCourseHome';
import TodayClassRight from './TodayClassRight';

const MyCourseMain = () => {
  const { language, courseData } = useStateContext();
  const { activeMenu } = useStateContextDashboard();

  const runningCourses = courseData?.filter((val) => val.status === 'Running');
  const registrationGoingOnCourses = courseData?.filter(
    (val) => val.status === 'Registration Going on',
  );
  const upComingCourses = courseData?.filter(
    (val) => val.status === 'Upcoming',
  );

  return (
    <div>
      <div
        className={`${
          activeMenu ? 'w-full mx-auto px-4' : 'w-full pr-6 pl-[96px]'
        } mx-auto flex items-start gap-6`}
      >
        {/* NOTE: LEFT SIDE */}
        <div className="w-[75%] ">
          <div className="bg-white shadow-lg rounded-lg px-6 pb-8 pt-4 my-5">
            <h2 className="font-heading font-bold text-2xl my-2 ">
              My Courses
            </h2>
            <div
              className={`grid ${
                activeMenu
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }  gap-4 md:gap-6`}
            >
              {runningCourses.map((item) => (
                <EnrolledCourseHome key={item.id} item={item} running={true} />
              ))}
            </div>
          </div>

          <div className="bg-transparent shadow-lg border rounded-lg px-6 pb-8 pt-4 mt-20 mb-10">
            <h2 className="font-heading font-bold text-2xl mt-2 capitalize ">
              Recommended Courses for you
            </h2>
            <p className=" mb-5 text-base font-semibold">
              You have the option to select additional courses that align with
              your career goals and interests.
            </p>
            <div className="h-[1px] bg-[#ff440059]  mb-5" />
            <div
              className={`grid ${
                activeMenu
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }  gap-4 md:gap-6`}
            >
              {registrationGoingOnCourses.map((item) => (
                <CourseItem key={item.id} item={item} />
              ))}
              {upComingCourses.map((item) => (
                <CourseItem key={item.id} item={item} upcoming={true} />
              ))}
            </div>
          </div>
        </div>

        {/* NOTE: RIGHT SIDE */}
        <div className="w-[25%] sticky top-20 bg-white shadow-lg rounded-lg px-6 py-5 my-5">
          <TodayClassRight />
        </div>
      </div>
    </div>
  );
};

export default MyCourseMain;
