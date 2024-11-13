import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaRegPlayCircle } from 'react-icons/fa';
import { RiLiveLine } from 'react-icons/ri';
import { useStudentContext } from '../../../../src/context/StudentContext';

import Swal from 'sweetalert2';
import { convertToAMPM } from '../../../../src/utils/convertAMPM';
import {
  formatDateWithoutYear,
  getTimeDifference,
  isToday,
} from '../../../../src/utils/convertDate';
import ButtonDashboard from '../../../utilities/dashboard/ButtonDashboard';
import QuizItem from './QuizItem';

const StudyPlan = ({ moduleData, enrolledCourse }) => {
  const { moduleShowComp } = useStudentContext();
  const [currentUrl, setCurrentUrl] = useState(null);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const showClassRecording = (item) => {
    if (item?.recordingLink) {
      window.location.href = item.recordingLink;
    } else {
      Swal.fire(
        'Dear Student',
        'Class Recording is not available now. It will uploaded within 24 hours of class end.',
        'warning',
      );
    }
  };

  const handleJoinLive = (item) => {
    const timeDifference = getTimeDifference(item?.classTime);

    if (timeDifference > 20) {
      Swal.fire(
        'Dear Student',
        'You can join each class 10 minutes before it starts.',
        'warning',
      );
    } else {
      window.location.href = `${currentUrl}/join/live/${item?.id}`;
    }
  };

  return (
    <div className="mt-2 mb-10 w-full border border-dashboard_border rounded-lg overflow-hidden shadow-md">
      {moduleShowComp == 'Live Class' ? (
        <div>
          {moduleData?.lessons.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row justify-between items-start px-4 py-6 md:py-8 gap-4 
              border-b border-x-4 border-x-[transparent] hover:border-x-[gray] ${
                item?.liveClassLink && isToday(item?.classDate)
                  ? 'bg-primary_btn hover:bg-[#00172e]'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <div className="md:w-[70%] flex items-start gap-3">
                <Image
                  src="/icon/live.png"
                  className="w-14 md:w-[60px]"
                  width={60}
                  height={60}
                  alt=""
                />
                <div>
                  <div className="flex flex-wrap gap-3 items-center mb-2">
                    <p
                      className={`text-center leading-[19px] tracking-[0.02em] flex justify-center items-center 
                        text-[13px] px-2 py-1 rounded-md border border-[#3d9970] text-[#3d9970] font-semibold ${
                          item?.liveClassLink && isToday(item?.classDate)
                            ? 'bg-[#ffffff]'
                            : 'bg-[#85ffc82d]'
                        }`}
                    >
                      Batch-{enrolledCourse?.batchNumber}
                    </p>
                    <p
                      className={`font-medium text-center leading-[19px] tracking-[0.02em] flex justify-center items-center 
                        text-[13px] px-2 py-1 rounded-md border border-dashboard_border  ${
                          item?.liveClassLink && isToday(item?.classDate)
                            ? 'bg-[#ffffff]'
                            : 'bg-[#cfcfcf74]'
                        }`}
                    >
                      {formatDateWithoutYear(item?.classDate)}
                      {', '}
                      {convertToAMPM(item?.classTime)}
                    </p>
                  </div>
                  <h2
                    className={`text-lg md:text-[22px] font-semibold mt-2 md:mt-5 leading-6 font-subHeading ${
                      item?.liveClassLink && isToday(item?.classDate)
                        ? 'text-white'
                        : 'text-black'
                    }`}
                  >
                    {item.title}
                  </h2>
                </div>
              </div>
              <div className="w-full md:w-[30%] flex justify-center md:justify-end">
                {item?.liveClassLink && item?.classFinished ? (
                  <button
                    onClick={() => showClassRecording(item)}
                    className="flex justify-between items-center gap-2 bg-[#e2e2e2] hover:bg-[#d5d5d5] font-semibold py-2 px-5 rounded border-dashboard_border border transition-all duration-200 text-sm md:text-base"
                  >
                    <FaRegPlayCircle />
                    <span>Class Recording</span>
                  </button>
                ) : isToday(item?.classDate) ? (
                  <ButtonDashboard
                    onClick={() => handleJoinLive(item)}
                    // href={`${currentUrl}/join/live/${item?.id}`}
                    className="flex justify-between items-center gap-2 bg-[#fecb63] hover:bg-[#e7b655] 
                    font-semibold py-2 px-5 rounded transition-all duration-200 text-black visited:text-black text-sm md:text-base"
                  >
                    <RiLiveLine />
                    <span>Join Live</span>
                  </ButtonDashboard>
                ) : (
                  <span className="bg-[#fff1da] text-orange-400 border border-[#ff893b] px-2 text-xs md:text-sm rounded-full font-semibold">
                    Upcoming
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="bg-white border-b-1">
            <p className="ml-4 md:ml-10 pt-5 font-dash_heading font-semibold text-primary">
              NOTE:{' '}
            </p>
            <ol className="text-sm list-decimal mx-4 md:mx-10 pb-8">
              <li className="pt-3">
                There will be 10 total quizzes (MCQ, 4 options each). Time will
                be 20 minutes.
              </li>
              <li className="mt-3">
                The quiz should be participated within the deadline from the day
                the quiz is unlocked.
              </li>
              <li className="mt-3">
                Do not click the quiz just to see or see what happens when you
                click this button. Because, once you open it, you have to get
                out by answering the whole thing. And if you click once, do an
                answer and come out, then you will not get a chance to
                participate later.
              </li>
            </ol>
          </div>
          <QuizItem moduleData={moduleData} enrolledCourse={enrolledCourse} />
        </div>
      )}
    </div>
  );
};

export default StudyPlan;
