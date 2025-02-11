import { ArrowRightFromLineIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useStateContext } from '../../../src/context/ContextProvider';
import { useStudentContext } from '../../../src/context/StudentContext';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import useEnrolledCourseData from '../../../src/hooks/useEnrolledCourseData';
import { formatDate } from '../../../src/utils/convertDate';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import CheckQuizAnswer from './CheckQuizAnswer';

const PastQuizResult = ({}) => {
  const { activeMenu } = useStateContextDashboard();
  const { setShowResult, setCheckAnswer, checkAnswer, showResult } =
    useStudentContext();
  const { findCurrentUser } = useStateContext();

  const handleCheckAnswer = () => {
    setShowResult(false);
    setCheckAnswer(true);
  };

  const { moduleData } = useEnrolledCourseData();
  const router = useRouter();
  const { courseId, moduleId, quizId } = router.query;

  const findLessons = moduleData?.lessons?.find((quiz) => quiz.id === quizId);

  // Check if the user has already submitted the quiz
  const userAlreadyGiveQuiz = Array.isArray(findLessons?.user_quizData)
    ? findLessons.user_quizData.find(
        (user) => user.student_id === findCurrentUser.student_id,
      )
    : null;

  const obtained_percentage =
    (userAlreadyGiveQuiz?.obtained_marks /
      userAlreadyGiveQuiz?.quizDataUser?.length) *
    100;

  return (
    <div>
      {!checkAnswer ? (
        <div
          className={`${
            activeMenu ? 'w-full mx-auto px-4' : 'w-full px-4'
          } mx-auto flex items-start gap-6`}
        >
          <div className="w-[70%] mx-auto mb-10">
            <div className="bg-white shadow-lg rounded-xl px-8 pb-8 my-5">
              <Image
                width={500}
                height={300}
                src="/icon/award.png"
                className="w-24 mx-auto pt-8 pb-6"
                alt=""
              />
              <h2 className="text-[rgba(18,183,106)] font-bold text-3xl text-center">
                Quiz is over
              </h2>
              <hr className="my-10" />
              <div>
                <p className="text-center text-base font-semibold">
                  {formatDate(
                    userAlreadyGiveQuiz?.submission_date.split('T')[0],
                  )}
                </p>
                <h2 className="text-xl font-bold text-center">
                  {findLessons?.title}
                </h2>
              </div>

              <div className="bg-[#f9f9fa] px-5 py-7 rounded flex gap-10 mt-8">
                <div className="bg-[#ffffff] flex-1 p-4 rounded-md">
                  <Image
                    width={500}
                    height={300}
                    src="/icon/question-mark.png"
                    className="w-10 mx-auto mb-3"
                    alt=""
                  />
                  <div>
                    <div className="flex items-center justify-between font-semibold font-heading">
                      <p>Total Question</p>
                      <p className="text-[#4478ff]">
                        {userAlreadyGiveQuiz?.quizDataUser?.length}
                      </p>
                    </div>
                    <div className="flex items-center justify-between font-semibold font-heading mt-1">
                      <p>Incorrect Answer</p>
                      <p className="text-[#f04438]">
                        {userAlreadyGiveQuiz?.quizDataUser?.length -
                          userAlreadyGiveQuiz?.obtained_marks}
                      </p>
                    </div>
                    <div className="flex items-center justify-between font-semibold font-heading mt-1">
                      <p>Correct Answer</p>
                      <p className="text-[#12b76a]">
                        {userAlreadyGiveQuiz?.obtained_marks}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#ffffff] flex-1 p-4 rounded-md">
                  <Image
                    width={500}
                    height={300}
                    src="/icon/clock.png"
                    className="w-10 mx-auto mb-3"
                    alt=""
                  />
                  <div>
                    <div className="flex items-center justify-between font-semibold font-heading ">
                      <p>Total Time</p>
                      <p className="text-[#4478ff]">
                        {userAlreadyGiveQuiz?.quizDataUser?.length * 2}:00 Min
                      </p>
                    </div>
                    <div className="flex items-center justify-between font-semibold font-heading mt-1">
                      <p>Time Taken</p>
                      <p className="text-[#f04438]">
                        {Math.ceil(userAlreadyGiveQuiz?.timeTaken / 60)}:00 Min
                      </p>
                    </div>
                    <div className="flex items-center justify-between font-semibold font-heading mt-1">
                      <p>Total Score</p>
                      <p className="text-[#12b76a]">
                        {Math.ceil(obtained_percentage)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-3">
                <ButtonDashboard className="flex-1" onClick={handleCheckAnswer}>
                  Check Answer
                </ButtonDashboard>
                <Link
                  href={`/students/my-course/${courseId}/module/${moduleId}`}
                >
                  <ButtonDashboard className="flex-1 bg-[#101828] text-white hover:bg-[#101828ca]">
                    Back to Module <ArrowRightFromLineIcon />
                  </ButtonDashboard>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CheckQuizAnswer userAlreadyGiveQuiz={userAlreadyGiveQuiz} />
      )}
    </div>
  );
};

export default PastQuizResult;
