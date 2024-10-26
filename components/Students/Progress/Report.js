import { Progress } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsExclamationDiamond } from 'react-icons/bs';
import { FaArrowRight } from 'react-icons/fa6';
import useCourseStatistics from '../../../src/hooks/useCourseStatistics';
import CustomModal from '../../utilities/CustomModal';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';

const Report = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [scoreModal, setScoreModal] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(null);
  const {
    obtained_percentage_quiz,
    obtained_percentage_attendance,
    obtained_percentage_assignment,
    average_percentage,
  } = useCourseStatistics();

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
    setScoreModal(false);
  };

  return (
    <div className="bg-white border border-dashboard_border p-5 rounded">
      <div className="flex justify-between">
        <h5 className="text-base font-bold">Total Progress</h5>
        <button
          className="flex items-center gap-2 text-sm"
          onClick={() => setModalIsOpen(true)}
        >
          How calculate result? <BsExclamationDiamond />
        </button>
      </div>
      <CustomModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        setModalIsOpen={setModalIsOpen}
      >
        <div className="bg-[#ff950028] w-[100px] h-[100px] mx-auto flex items-center justify-center rounded-full">
          <Image
            width={500}
            height={200}
            src="/icon/loudspeaker.png"
            className="w-20 mx-auto -mt-5"
            alt=""
          />
        </div>
        <h2 className="text-3xl font-bold text-center mt-2 mb-5 text-[orangered]">
          **Important**
        </h2>
        <div className="h-[350px] overflow-y-scroll px-10 pb-10">
          <p>
            Welcome to the DataSolution360 Dashboard! You are about to embark on
            your skill development journey with us, where it&lsquo;s crucial to
            understand a few key aspects. What are they? Let&lsquo;s find out.
          </p>

          <p>
            &rarr; Progress Report We update your progress report every day at 3
            AM. Your overall progress calculation is as follows: Live Test/Live
            Coding Test 50% + Quiz 20% + Assignment 30% = 100%. Now, an
            important point: If you&lsquo;ve completed all the exams and see
            that your overall progress is low, don&lsquo;t panic. Once the
            results of your remaining assessments are published, your progress
            report will be updated that night.
          </p>

          <p>
            &rarr; Additional Information: Live Classes: You can easily join
            live classes from the &quot;Class Joining&quot; tab on the
            dashboard. You can join each class 10 minutes before it starts. The
            recording of your class will be uploaded to your dashboard within
            1-3 hours after the class ends.
          </p>

          <p>
            Quiz: Your quiz will open at a specific time, and you can
            participate in the quiz anytime within 24-48 hours of it opening.
            After participating and submitting the quiz, or when the time is up,
            you will receive your results. Once the quiz deadline passes,
            you&lsquo;ll be able to see the answers along with your results.
            Your quiz score will be added to your progress report at 3 AM.
          </p>

          <p>
            Assignment: Your assignment will open at a specific time, and you
            can submit the assignment anytime within 24-48 hours of it opening.
            You will not receive your results immediately after submitting the
            assignment. The instructor will check your assignment and give
            feedback, after which you will be able to see your assignment
            results, and your progress will be updated at 3 AM.
          </p>

          <p>
            Live Test: Just like in college or university, your live test will
            start at a specific time. You need to complete and submit your test
            within the allotted time (10-20 or 30 minutes). If you can&lsquo;t
            finish in time, only the portion you completed will be submitted.
            You won&lsquo;t receive your results immediately after submitting
            the live test. After the teacher checks your test and gives
            feedback, you&lsquo;ll receive your results, and your progress will
            be updated at 3 AM.
          </p>

          <p>
            Live Coding Test: If you are enrolled in a coding-related course,
            you might have to take a live coding test. The live coding test will
            start at a specific time, just like the live test. You&lsquo;ll
            solve the problem by coding, and once the time is up, you need to
            submit it.
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
      <CustomModal
        modalIsOpen={scoreModal}
        closeModal={closeModal}
        setModalIsOpen={setScoreModal}
      >
        <div className="bg-[#ff950028] w-[100px] h-[100px] mx-auto flex items-center justify-center rounded-full">
          <Image
            width={500}
            height={300}
            src="/icon/question.png"
            className="w-20 mx-auto -mt-5"
            alt=""
          />
        </div>

        <h2 className="text-3xl font-bold text-center mt-2 mb-5">
          How to get score?
        </h2>
        <div className="h-[350px] overflow-y-scroll px-10 pb-10">
          <p>
            Welcome to the DataSolution360 Dashboard! You are about to embark on
            your skill development journey with us, where it&lsquo;s crucial to
            understand a few key aspects. What are they? Let&lsquo;s find out.
          </p>

          <p>
            &rarr; Progress Report We update your progress report every day at 3
            AM. Your overall progress calculation is as follows: Live Test/Live
            Coding Test 50% + Quiz 20% + Assignment 30% = 100%. Now, an
            important point: If you&lsquo;ve completed all the exams and see
            that your overall progress is low, don&lsquo;t panic. Once the
            results of your remaining assessments are published, your progress
            report will be updated that night.
          </p>

          <p>
            &rarr; Additional Information: Live Classes: You can easily join
            live classes from the &quot;Class Joining&quot; tab on the
            dashboard. You can join each class 10 minutes before it starts. The
            recording of your class will be uploaded to your dashboard within
            1-3 hours after the class ends.
          </p>

          <p>
            Quiz: Your quiz will open at a specific time, and you can
            participate in the quiz anytime within 24-48 hours of it opening.
            After participating and submitting the quiz, or when the time is up,
            you will receive your results. Once the quiz deadline passes,
            you&lsquo;ll be able to see the answers along with your results.
            Your quiz score will be added to your progress report at 3 AM.
          </p>

          <p>
            Assignment: Your assignment will open at a specific time, and you
            can submit the assignment anytime within 24-48 hours of it opening.
            You will not receive your results immediately after submitting the
            assignment. The instructor will check your assignment and give
            feedback, after which you will be able to see your assignment
            results, and your progress will be updated at 3 AM.
          </p>

          <p>
            Live Test: Just like in college or university, your live test will
            start at a specific time. You need to complete and submit your test
            within the allotted time (10-20 or 30 minutes). If you can&lsquo;t
            finish in time, only the portion you completed will be submitted.
            You won&lsquo;t receive your results immediately after submitting
            the live test. After the teacher checks your test and gives
            feedback, you&lsquo;ll receive your results, and your progress will
            be updated at 3 AM.
          </p>

          <p>
            Live Coding Test: If you are enrolled in a coding-related course,
            you might have to take a live coding test. The live coding test will
            start at a specific time, just like the live test. You&lsquo;ll
            solve the problem by coding, and once the time is up, you need to
            submit it.
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
      <div className="flex items-center gap-2 mt-5">
        <Image
          width={500}
          height={300}
          src="/icon/fox.png"
          className="w-[70px] rounded-full border-2 border-orange-500 p-1"
          alt=""
        />
        <div>
          <h4 className="text-base font-semibold text-[#ff9d3b]">
            Wow! You are doing great.
          </h4>
          <p className="text-sm">
            Upgrade yourself a little bit. It is possible for you to be the
            best.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 bg-gray-100 px-2 py-2 border border-dashboard_border rounded">
        <p className="rounded font-semibold text-gray-600">Total Score</p>
        <Progress
          percent={average_percentage}
          status="active"
          trailColor="#ffffff"
          strokeColor="#12b76a"
          className="flex-1 font-bold text-lg"
        />
      </div>

      <div className="flex flex-wrap gap-3 mt-5">
        <div className="flex-1 bg-white shadow-lg text-center px-1 py-3 border border-dashboard_border rounded">
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
        <div className="flex-1 bg-white shadow-lg text-center px-1 py-3 border border-dashboard_border rounded">
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
        <div className="flex-1 bg-white shadow-lg text-center px-1 py-3 border border-dashboard_border rounded">
          <Progress
            strokeColor="#5d91ff"
            type="circle"
            percent={obtained_percentage_attendance}
            size={70}
            strokeWidth={12}
            className="shadow-lg rounded-full mb-1"
          />
          <p>Attendance</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 bg-gray-100 px-2 py-2 border border-dashboard_border rounded">
        <p className="rounded font-semibold text-gray-600">Attendance</p>
        <Progress
          percent={obtained_percentage_attendance}
          status="active"
          trailColor="#ffffff"
          strokeColor="#12b76a"
          className="flex-1 font-bold text-lg"
        />
      </div>
      {/* NOTE:  */}
      <Link href={`${currentUrl}/report`}>
        <button
          className="flex justify-center items-center gap-2 bg-secondary_btn hover:bg-[#34825f]
        font-semibold  py-2 px-4 rounded border-green-400 border w-full mt-4 text-white transition-all duration-200"
        >
          Report Details <FaArrowRight />
        </button>
      </Link>

      <button
        onClick={() => setScoreModal(true)}
        className="flex justify-center items-center gap-2 bg-[#c8ffe6] hover:bg-[#acf2d2]
        font-semibold  py-2 px-4 rounded border-green-400 border w-full mt-4 text-[#009351] transition-all duration-200"
      >
        How to calculate score <FaArrowRight />
      </button>
    </div>
  );
};

export default Report;
