import { ConfigProvider, Spin } from 'antd';
import {
  ArrowLeftFromLineIcon,
  ArrowRightFromLineIcon,
  Timer,
} from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { useStateContext } from '../../../src/context/ContextProvider';
import useSubmitQuizAndUpdateLeaderboard from '../../../src/hooks/useSubmitQuizAndUpdateLeaderboard';
import useUpdateLessonData from '../../../src/hooks/useUpdateLessonData';
import CustomModal from '../../utilities/CustomModal';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import PastQuizResult from './PastQuizResult';

const QuizGameStart = ({ quizData, findLessons }) => {
  const TOTAL_TIME = quizData?.length * 2 * 60;
  const { findCurrentUser } = useStateContext();
  const { updateLessonData } = useUpdateLessonData();
  const { submitQuizAndUpdateLeaderboard } =
    useSubmitQuizAndUpdateLeaderboard();
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TIME);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const countdownRef = useRef(null); // To store the countdown interval ID

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (userAlreadyGiveQuiz) {
      setIsQuizCompleted(true);
    }
  }, [userAlreadyGiveQuiz]);

  useEffect(() => {
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
      const { selectedAnswers, timeRemaining } = JSON.parse(savedProgress);
      setSelectedAnswers(selectedAnswers);
      setTimeRemaining(timeRemaining);
    }

    countdownRef.current = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdownRef.current);
          handleSubmitQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdownRef.current); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const quizProgress = {
      selectedAnswers,
      timeRemaining,
    };
    localStorage.setItem('quizProgress', JSON.stringify(quizProgress));
  }, [selectedAnswers, timeRemaining]);

  const handleOptionClick = (question, option) => {
    const findQuestion = selectedAnswers.find(
      (item) => item.id === question.id,
    );

    if (findQuestion) {
      findQuestion.user_answer = option.text;
    } else {
      setSelectedAnswers([
        ...selectedAnswers,
        { user_answer: option.text, ...question },
      ]);
    }
  };

  const userAlreadyGiveQuiz = Array.isArray(findLessons?.user_quizData)
    ? findLessons.user_quizData.find(
        (user) => user.student_id === findCurrentUser.student_id,
      )
    : null;

  const handleSubmitQuiz = async () => {
    if (isQuizCompleted) {
      return; // Prevent resubmission if the quiz is already completed
    }

    setLoading(true);
    let calculatedScore = 0;
    const submissionDate = new Date().toISOString();

    // Calculate the user's score by comparing their answers with the correct answers
    quizData?.forEach((question) => {
      const userAnswer = selectedAnswers.find(
        (item) => item.id === question.id,
      )?.user_answer;

      if (userAnswer?.trim() === question.correct_answer?.trim()) {
        calculatedScore += 1;
      }
    });

    // Check if the user has already submitted the quiz
    if (userAlreadyGiveQuiz) {
      Swal.fire('Warning', 'You have already taken this quiz.', 'warning');
      return; // Exit early to prevent duplicate submission
    }

    // Update the quiz data with the user's answers
    const updatedQuizData = quizData?.map((question) => {
      const findQuestion = selectedAnswers.find(
        (item) => item.id === question.id,
      );
      if (findQuestion) {
        question.user_answer = findQuestion.user_answer;
      }
      return question;
    });

    // Prepare the new quiz data to be stored
    const updatedLessonContent = {
      quizDataUser: updatedQuizData,
      obtained_marks: calculatedScore,
      student_id: findCurrentUser.student_id,
      submission_date: submissionDate,
      timeTaken: TOTAL_TIME - timeRemaining,
    };

    try {
      await submitQuizAndUpdateLeaderboard(
        findCurrentUser.student_id,
        calculatedScore,
      );

      // Await the updateLessonData to ensure it completes before moving forward
      await updateLessonData({
        user_quizData: [
          ...(findLessons?.user_quizData || []), // Preserve previous quiz attempts
          updatedLessonContent,
        ],
      });

      // Stop the timer
      clearInterval(countdownRef.current);
      setLoading(false);
      setIsQuizCompleted(true);
      localStorage.removeItem('quizProgress');
      closeModal();

      Swal.fire({
        title: 'Quiz Submitted',
        text: 'Your quiz has been submitted successfully!',
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'There was a problem submitting your quiz. Please try again later.',
        icon: 'error',
      });
      console.error('Quiz submission error:', error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m:${secs < 10 ? '0' : ''}${secs}s`;
  };

  return (
    <div className="relative mx-auto p-6 rounded-lg">
      {isQuizCompleted ? (
        <div>
          <PastQuizResult />
        </div>
      ) : (
        <div>
          {/* Timer always visible */}
          <div className="fixed top-[54px] right-[20px] mt-4 z-50">
            <p className="text-base font-semibold flex items-center gap-1 bg-green-200 p-1 rounded">
              <Timer /> {formatTime(timeRemaining)}
            </p>
          </div>

          <div className="mb-8">
            {quizData?.map((question, index) => (
              <div key={index} className="mb-6">
                <p className="mb-2 text-gray-700 font-bold p-4">
                  <span className="inline-flex justify-center items-center text-lg w-7 h-7 rounded-full bg-blue-500 text-white">
                    {index + 1}
                  </span>
                  {'  '}
                  {question.question}
                </p>
                <div>
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      onClick={() => handleOptionClick(question, option)}
                      className={`cursor-pointer p-4 mb-4 rounded-lg border flex items-center gap-2 ${
                        selectedAnswers.find((item) => item.id === question.id)
                          ?.user_answer === option.text
                          ? 'bg-[#1f2b43] border-[#1f2b43] text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-7 h-7 rounded-full font-bold bg-[#eaecf0] text-black`}
                      >
                        {optionIndex + 1}
                      </div>
                      {option.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center">
              <ButtonDashboard className="">
                <ArrowLeftFromLineIcon />
                Back
              </ButtonDashboard>
              <p className="bg-gray-200 px-2 py-1 rounded-md">
                {Object.keys(selectedAnswers).length}/{quizData.length}{' '}
                Questions Answered
              </p>
              <ButtonDashboard
                onClick={() => setModalIsOpen(true)}
                className=" bg-[#101828] text-white hover:bg-[#101828ca]"
              >
                Finish Exam <ArrowRightFromLineIcon />
              </ButtonDashboard>
            </div>
          </div>
        </div>
      )}

      <CustomModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        setModalIsOpen={setModalIsOpen}
      >
        <Image
          width={500}
          height={300}
          src="/icon/qa.png"
          className="w-20 mx-auto -mt-5"
          alt=""
        />
        <h2 className="text-3xl font-bold text-center mt-2  text-[orangered]">
          {' '}
          {Object.keys(selectedAnswers).length}/{quizData.length} Questions
          Answered
        </h2>
        <p className="text-center mb-10">Are you sure want to submit?</p>
        <div className="flex justify-between items-center gap-2 px-8 py-4">
          <ButtonDashboard onClick={closeModal} className="text-gray-500">
            Back to Exam
          </ButtonDashboard>

          <ButtonDashboard
            onClick={handleSubmitQuiz}
            className="bg-[#101828] text-white hover:bg-[#101828ca]"
          >
            {loading ? (
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#ffffff',
                  },
                }}
              >
                <Spin size="small" />
              </ConfigProvider>
            ) : (
              'Submit Answer'
            )}
          </ButtonDashboard>
        </div>
      </CustomModal>
    </div>
  );
};

export default QuizGameStart;
