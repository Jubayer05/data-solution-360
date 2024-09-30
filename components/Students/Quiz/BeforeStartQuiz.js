import { useRouter } from 'next/router';
import React from 'react';
import { FaArrowLeft, FaArrowRightLong } from 'react-icons/fa6';
// import { videosPlaylist } from '../../../../src/data/data';
import Image from 'next/image';
import { useState } from 'react';
import { BiStopwatch } from 'react-icons/bi';
import { useStateContext } from '../../../src/context/ContextProvider';
import { useStudentContext } from '../../../src/context/StudentContext';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import useEnrolledCourseData from '../../../src/hooks/useEnrolledCourseData';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import CheckQuizAnswer from './CheckQuizAnswer';
import PastQuizResult from './PastQuizResult';
import QuizGameStart from './QuizGameStart';

const BeforeStartQuiz = () => {
  const { findCurrentUser } = useStateContext();
  const { activeMenu } = useStateContextDashboard();
  const { showResult, setShowResult, checkAnswer, setCheckAnswer } =
    useStudentContext();
  const [startQuiz, setStartQuiz] = useState(false);

  const { moduleData } = useEnrolledCourseData();
  const router = useRouter();
  const { quizId } = router.query;

  const findLessons = moduleData?.lessons?.find((quiz) => quiz.id === quizId);

  const quizData = findLessons?.quizData;

  // Check if the user has already submitted the quiz
  const userAlreadyGiveQuiz = Array.isArray(findLessons?.user_quizData)
    ? findLessons.user_quizData.find(
        (user) => user.student_id === findCurrentUser.student_id,
      )
    : null;

  const handleBack = () => {
    router.back();
  };

  console.log(showResult, checkAnswer);

  return (
    <div>
      {startQuiz ? (
        <QuizGameStart quizData={quizData} findLessons={findLessons} />
      ) : showResult ? (
        <PastQuizResult />
      ) : checkAnswer ? (
        <CheckQuizAnswer userAlreadyGiveQuiz={userAlreadyGiveQuiz} />
      ) : (
        <div
          className={`${
            activeMenu
              ? 'w-full mx-auto px-16'
              : 'w-full pr-3 md:pr-[6] pl-[84px] md:pl-[96px]'
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
              src="/icon/quiz.png"
              className="w-8"
              alt=""
            />
            <h5 className="text-base font-bold">Quiz</h5>
            <div className="flex-1 h-[0.5px] bg-gray-300" />
          </div>

          {/* NOTE: QUIZ INFO SEGMENT */}
          <div className="bg-[#101828] p-1.5 mt-8 rounded">
            <h2 className="text-xl text-center text-white pb-1">Quiz</h2>
            <div className="bg-white flex justify-between items-center p-5">
              <div className="flex items-center gap-3">
                <Image
                  width={500}
                  height={300}
                  src="/icon/speedometer.png"
                  alt="Speedometer"
                  className="w-10"
                />
                <div>
                  <p>Total Marks</p>
                  <p className="text-xl font-bold text-[#12b76a] text-center">
                    {quizData?.length * 2 || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold">Time:</span>
                <div className="bg-gray-200 flex items-center gap-1 px-3 py-2 font-bold text-xl rounded">
                  <BiStopwatch className="text-2xl" />
                  <p>{quizData?.length * 2 || 0} Minutes</p>
                </div>
              </div>
            </div>
          </div>

          {/* NOTE: SCORE SEGMENT */}
          <div className="bg-white border border-dashboard_border p-5 rounded my-8">
            <Image
              width={500}
              height={300}
              src="/icon/issue.png"
              className="w-16 mx-auto"
              alt=""
            />
            <div className="w-[75%] mx-auto mt-5 text-lg">
              <p>
                The quiz questions will be based on what has been taught in
                class and the resources provided. So practice those more.
              </p>
              <strong className="inline-block mt-2">Guidelines: </strong>
              <p className="mt-3">
                1. Quiz duration is 20 minutes. Once you participate in the quiz
                you have to complete the quiz within 20 minutes.{' '}
              </p>
              <p className="mt-3">
                2. Quiz can be given 1 time. Cannot participate in more than 1
                quiz.
              </p>
              <p className="mt-3">3. Make sure your answers are submitted.</p>
              <p className="mt-3">
                4. Answer all questions MCQ. Only 1 option can be selected.
              </p>
              <p className="mt-3">
                5. The quiz must be submitted once started and cannot be
                deducted.
              </p>
              <p>Thank you</p>

              {userAlreadyGiveQuiz ? (
                <ButtonDashboard
                  onClick={() => setShowResult(true)}
                  className=" bg-[#101828] text-white hover:bg-[#101828ca] mx-auto mt-8"
                >
                  Show Result <FaArrowRightLong />
                </ButtonDashboard>
              ) : (
                <ButtonDashboard
                  onClick={() => setStartQuiz(true)}
                  className=" bg-[#101828] text-white hover:bg-[#101828ca] mx-auto mt-8"
                >
                  Start Exam <FaArrowRightLong />
                </ButtonDashboard>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeforeStartQuiz;
