import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../../src/context/ContextProvider';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import { loadData } from '../../../src/hooks/loadData';
import CourseItem from '../../Courses/HomeCourseItem';
import EnrolledCourseHome from './EnrolledCourseHome';
import TodayClassRight from './TodayClassRight';

const MyCourseMain = () => {
  const { language, courseData, findCurrentUser } = useStateContext();
  const { activeMenu } = useStateContextDashboard();
  const [courseDataBatch, setCourseDataBatch] = useState([]);

  useEffect(() => {
    loadData('course_data_batch', setCourseDataBatch, {
      orderBy: 'batchNumber',
      orderDirection: 'asc',
    });
  }, []);

  const courseData2 = [
    { unique_batch_id: 'uuid1', enrolled_student: ['student1', 'student3'] },
    { unique_batch_id: 'uuid2', enrolled_student: ['student1', 'student2'] },
    { unique_batch_id: 'uuid3', enrolled_student: ['student1', 'student2'] },
  ];

  const studentInfo = {
    enrolled_courses: [{ batchId: 'uuid2' }, { batchId: 'uuid3' }],
    student_id: 'student2',
  };

  const enrolledCourseIds = findCurrentUser?.enrolled_courses.map(
    (course) => course.batchId,
  );

  console.log(enrolledCourseIds);

  const findEnrolledCourse = courseDataBatch.filter(
    (course) =>
      enrolledCourseIds.includes(course.unique_batch_id) &&
      course.enrolled_students.includes(findCurrentUser.student_id),
  );

  console.log(findEnrolledCourse);

  const registrationGoingOnCourses = courseData?.filter(
    (val) => val.status === 'Registration Going on',
  );
  const upComingCourses = courseData?.filter(
    (val) => val.status === 'Upcoming',
  );

  return (
    <div className="p-0 sm:p-4">
      <div
        className={`flex flex-col md:flex-row md:items-start
           gap-6 ${
             activeMenu
               ? 'w-full mx-auto px-4'
               : 'w-full pr-3 md:pr-[6] pl-[84px] md:pl-[96px]'
           }`}
      >
        {/* LEFT SIDE */}
        <div className={`flex-1`}>
          <div className="bg-white shadow-lg rounded-lg px-6 pb-8 pt-4 my-5">
            <h2 className="font-heading font-bold text-2xl my-2">My Courses</h2>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6`}
            >
              {findEnrolledCourse.map((item) => (
                <EnrolledCourseHome key={item.id} item={item} running={true} />
              ))}
            </div>
          </div>

          <div className="bg-transparent shadow-lg border rounded-lg px-6 pb-8 pt-4 mt-20 mb-10">
            <h2 className="font-heading font-bold text-2xl mt-2 capitalize">
              Recommended Courses for you
            </h2>
            <p className="mb-5 text-base font-semibold">
              You have the option to select additional courses that align with
              your career goals and interests.
            </p>
            <div className="h-[1px] bg-[#ff440059] mb-5" />
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6`}
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

        {/* RIGHT SIDE */}

        <div className="w-full md:w-1/4 sticky top-20 bg-white shadow-lg rounded-lg px-6 py-5 my-5">
          <TodayClassRight />
        </div>
      </div>
    </div>
  );
};

export default MyCourseMain;
