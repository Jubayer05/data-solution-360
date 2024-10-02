import { Progress } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsExclamationDiamond } from 'react-icons/bs';
import { FaArrowLeft } from 'react-icons/fa6';
// import { videosPlaylist } from '../../../../src/data/data';
import Image from 'next/image';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import useCourseStatistics from '../../../src/hooks/useCourseStatistics';
import CustomModal from '../../utilities/CustomModal';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import ReportDetails from './ReportDetails';

const ReportHome = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { activeMenu } = useStateContextDashboard();

  const {
    obtained_percentage_quiz,
    obtained_percentage_attendance,
    obtained_percentage_assignment,
    average_percentage,
  } = useCourseStatistics();

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <div
        className={`${
          activeMenu
            ? 'w-full mx-auto px-16'
            : 'w-full pr-3 md:pr-6 pl-[84px] md:pl-[96px]'
        } mx-auto `}
      >
        <div className="flex items-end gap-4 pt-6">
          <ButtonDashboard onClick={handleBack}>
            <FaArrowLeft />
            Back
          </ButtonDashboard>
        </div>

        {/* NOTE: HEADING SEGMENT */}
        <div className="flex justify-between items-center gap-5 mt-8">
          <Image
            width={500}
            height={300}
            src="/icon/rising.png"
            className="w-8"
            alt=""
          />
          <h5 className="text-base font-bold">Progress</h5>
          <div className="flex-1 h-[0.5px] bg-gray-300" />
          <button
            className="flex items-center gap-2 text-sm"
            onClick={() => setModalIsOpen(true)}
          >
            How calculate result? <BsExclamationDiamond />
          </button>
          <CustomModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            setModalIsOpen={setModalIsOpen}
          >
            <Image
              width={500}
              height={300}
              src="/icon/loudspeaker.png"
              className="w-20 mx-auto -mt-5"
              alt=""
            />
            <h2 className="text-3xl font-bold text-center mt-2 mb-5 text-[orangered]">
              **Important**
            </h2>
            <div className="h-[350px] overflow-y-scroll px-10 pb-10">
              <p>
                Welcome to the DataSolution360 Dashboard! You are about to
                embark on your skill development journey with us, where
                it&lsquo;s crucial to understand a few key aspects. What are
                they? Let&lsquo;s find out.
              </p>

              <p>
                &rarr; Progress Report We update your progress report every day
                at 3 AM. Your overall progress calculation is as follows: Live
                Test/Live Coding Test 50% + Quiz 20% + Assignment 30% = 100%.
                Now, an important point: If you&lsquo;ve completed all the exams
                and see that your overall progress is low, don&lsquo;t panic.
                Once the results of your remaining assessments are published,
                your progress report will be updated that night.
              </p>

              <p>
                &rarr; Additional Information: Live Classes: You can easily join
                live classes from the &quot;Class Joining&quot; tab on the
                dashboard. You can join each class 10 minutes before it starts.
                The recording of your class will be uploaded to your dashboard
                within 1-3 hours after the class ends.
              </p>

              <p>
                Quiz: Your quiz will open at a specific time, and you can
                participate in the quiz anytime within 24-48 hours of it
                opening. After participating and submitting the quiz, or when
                the time is up, you will receive your results. Once the quiz
                deadline passes, you&lsquo;ll be able to see the answers along
                with your results. Your quiz score will be added to your
                progress report at 3 AM.
              </p>

              <p>
                Assignment: Your assignment will open at a specific time, and
                you can submit the assignment anytime within 24-48 hours of it
                opening. You will not receive your results immediately after
                submitting the assignment. The instructor will check your
                assignment and give feedback, after which you will be able to
                see your assignment results, and your progress will be updated
                at 3 AM.
              </p>

              <p>
                Live Test: Just like in college or university, your live test
                will start at a specific time. You need to complete and submit
                your test within the allotted time (10-20 or 30 minutes). If you
                can&lsquo;t finish in time, only the portion you completed will
                be submitted. You won&lsquo;t receive your results immediately
                after submitting the live test. After the teacher checks your
                test and gives feedback, you&lsquo;ll receive your results, and
                your progress will be updated at 3 AM.
              </p>

              <p>
                Live Coding Test: If you are enrolled in a coding-related
                course, you might have to take a live coding test. The live
                coding test will start at a specific time, just like the live
                test. You&lsquo;ll solve the problem by coding, and once the
                time is up, you need to submit it.
              </p>
            </div>
            <div className="px-10 pt-5 bg-white">
              <ButtonDashboard
                onClick={closeModal}
                className="w-full bg-[#101828] text-white hover:bg-[#101828dc] rounded-md"
              >
                Thanks, Got it
              </ButtonDashboard>
            </div>
          </CustomModal>
        </div>

        {/* NOTE: SCORE SEGMENT */}
        <div className="bg-white border border-dashboard_border pb-5 rounded mt-8">
          <h3 className="pl-10 py-4 text-xl font-bold font-heading">
            Total Score
          </h3>
          <div className="flex gap-10">
            <div className="flex justify-center gap-3 flex-1">
              <div
                className="bg-white shadow-lg text-center px-1 py-3 border border-dashboard_border 
              rounded flex justify-center items-center flex-col w-[140px] h-[200px]"
              >
                <Progress
                  strokeColor="#a855f7"
                  status="active"
                  type="circle"
                  percent={obtained_percentage_quiz}
                  size={70}
                  strokeWidth={12}
                  className="shadow-lg rounded-full mb-1"
                />
                <p>Quiz</p>
              </div>
              <div
                className="bg-white shadow-lg text-center px-1 py-3 border border-dashboard_border 
              rounded flex justify-center items-center flex-col w-[140px] h-[200px]"
              >
                <Progress
                  strokeColor="#ff7d4e"
                  type="circle"
                  percent={obtained_percentage_assignment}
                  size={70}
                  strokeWidth={12}
                  className="shadow-lg rounded-full mb-1"
                />
                <p>Assignment</p>
              </div>
              <div
                className="bg-white shadow-lg text-center px-1 py-3 border border-dashboard_border 
              rounded flex justify-center items-center flex-col w-[140px] h-[200px]"
              >
                <Progress
                  strokeColor="#5d91ff"
                  type="circle"
                  percent={obtained_percentage_attendance}
                  size={70}
                  strokeWidth={12}
                  className="shadow-lg rounded-full mb-1"
                />
                <p>Live Test</p>
              </div>
            </div>

            <div className="flex-1 border border-[#12b76a] p-5 mr-10 rounded-lg">
              <div className="flex items-center gap-2">
                <Image
                  width={500}
                  height={300}
                  src="/icon/medal.png"
                  className="w-[70px] rounded-full border-2 border-[#12b76a] p-1"
                  alt=""
                />
                <div>
                  <h4 className="text-base font-semibold text-[#ff9d3b]">
                    Wow! You are doing great.
                  </h4>
                  <p className="text-sm">
                    Upgrade yourself a little bit. It is possible for you to be
                    the best.
                  </p>
                </div>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between gap-3 mt-5">
                <div className="flex-1 px-2 py-2 border border-dashboard_border rounded">
                  <p className="rounded font-semibold text-gray-600">
                    Total Score
                  </p>
                  <Progress
                    percent={average_percentage}
                    size={['100%', 12]}
                    status="active"
                    trailColor="#ffffff"
                    strokeColor="#12b76a"
                    className="flex-1 font-bold text-xl text-[#12b76a]"
                  />
                </div>
                <div className="w-[1px] bg-gray-300" />
                <div className="flex-1 px-2 py-2 border border-dashboard_border rounded">
                  <p className="rounded font-semibold text-gray-600">
                    Attendance
                  </p>
                  <Progress
                    percent={obtained_percentage_attendance}
                    size={['100%', 12]}
                    status="active"
                    trailColor="#ffffff"
                    strokeColor="#4478ff"
                    className="flex-1 font-bold text-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* NOTE: MODULE SEGMENT */}
        <ReportDetails />
      </div>
    </div>
  );
};

export default ReportHome;
