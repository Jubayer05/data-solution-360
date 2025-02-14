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
  const TOTAL_TIME = quizData?.length * 0.5 * 60;
  const { findCurrentUser } = useStateContext();
  const { updateLessonData } = useUpdateLessonData();
  const { submitQuizAndUpdateLeaderboard } =
    useSubmitQuizAndUpdateLeaderboard();
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TIME);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const quizStartTimeRef = useRef(null);
  const countdownRef = useRef(null);
  const autoSubmitTimeoutRef = useRef(null);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const userAlreadyGiveQuiz = Array.isArray(findLessons?.user_quizData)
    ? findLessons.user_quizData.find(
        (user) => user.student_id === findCurrentUser.student_id,
      )
    : null;

  // Function to check if quiz time has expired
  const hasQuizExpired = () => {
    const savedProgress = localStorage.getItem('quizProgress');
    if (!savedProgress) return false;

    const { startTime, originalTime } = JSON.parse(savedProgress);
    const elapsedSeconds = Math.floor(
      (Date.now() - new Date(startTime).getTime()) / 1000,
    );
    return elapsedSeconds >= originalTime;
  };

  // Setup auto-submit timeout
  const setupAutoSubmit = (remainingTime) => {
    if (autoSubmitTimeoutRef.current) {
      clearTimeout(autoSubmitTimeoutRef.current);
    }

    autoSubmitTimeoutRef.current = setTimeout(() => {
      if (!isQuizCompleted && !isSubmitting) {
        handleSubmitQuiz(true);
      }
    }, remainingTime * 1000);
  };

  // Initialize quiz
  useEffect(() => {
    const initializeQuiz = () => {
      const savedProgress = localStorage.getItem('quizProgress');

      if (savedProgress) {
        const {
          selectedAnswers: savedAnswers,
          startTime,
          originalTime,
        } = JSON.parse(savedProgress);
        const elapsedSeconds = Math.floor(
          (Date.now() - new Date(startTime).getTime()) / 1000,
        );
        const remainingTime = Math.max(0, originalTime - elapsedSeconds);

        if (remainingTime <= 0 || hasQuizExpired()) {
          handleSubmitQuiz(true);
          return;
        }

        setSelectedAnswers(savedAnswers);
        setTimeRemaining(remainingTime);
        quizStartTimeRef.current = startTime;
        setupAutoSubmit(remainingTime);
      } else {
        const startTime = new Date().toISOString();
        quizStartTimeRef.current = startTime;
        localStorage.setItem(
          'quizProgress',
          JSON.stringify({
            selectedAnswers: [],
            startTime,
            originalTime: TOTAL_TIME,
          }),
        );
        setupAutoSubmit(TOTAL_TIME);
      }
    };

    if (!isQuizCompleted && !userAlreadyGiveQuiz) {
      initializeQuiz();
    }

    return () => {
      if (autoSubmitTimeoutRef.current) {
        clearTimeout(autoSubmitTimeoutRef.current);
      }
    };
  }, [TOTAL_TIME, isQuizCompleted, userAlreadyGiveQuiz]);

  // Start countdown timer
  useEffect(() => {
    if (isQuizCompleted || userAlreadyGiveQuiz) return;

    countdownRef.current = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdownRef.current);
          handleSubmitQuiz(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    const handleVisibilityChange = () => {
      if (!document.hidden && !isQuizCompleted) {
        // Check if quiz should auto-submit when tab becomes visible
        if (hasQuizExpired()) {
          handleSubmitQuiz(true);
        }
      }
    };

    const handleBeforeUnload = (e) => {
      if (!isQuizCompleted) {
        e.preventDefault();
        e.returnValue =
          "You haven't submitted your quiz yet. Are you sure you want to leave?";
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(countdownRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isQuizCompleted, userAlreadyGiveQuiz]);

  // Save progress
  useEffect(() => {
    if (quizStartTimeRef.current && !isQuizCompleted) {
      const quizProgress = {
        selectedAnswers,
        startTime: quizStartTimeRef.current,
        originalTime: TOTAL_TIME,
      };
      localStorage.setItem('quizProgress', JSON.stringify(quizProgress));
    }
  }, [selectedAnswers, TOTAL_TIME, isQuizCompleted]);

  const handleOptionClick = (question, option) => {
    if (isQuizCompleted || isSubmitting) return;

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

  const handleSubmitQuiz = async (isAutoSubmit = false) => {
    if (isQuizCompleted || isSubmitting) return;

    setIsSubmitting(true);
    setLoading(true);

    // Clear all timers
    if (countdownRef.current) clearInterval(countdownRef.current);
    if (autoSubmitTimeoutRef.current)
      clearTimeout(autoSubmitTimeoutRef.current);

    let calculatedScore = 0;
    const submissionDate = new Date().toISOString();

    quizData?.forEach((question) => {
      const userAnswer = selectedAnswers.find(
        (item) => item.id === question.id,
      )?.user_answer;

      if (userAnswer?.trim() === question.correct_answer?.trim()) {
        calculatedScore += 1;
      }
    });

    const updatedQuizData = quizData?.map((question) => {
      const findQuestion = selectedAnswers.find(
        (item) => item.id === question.id,
      );
      if (findQuestion) {
        question.user_answer = findQuestion.user_answer;
      }
      return question;
    });

    const updatedLessonContent = {
      quizDataUser: updatedQuizData,
      obtained_marks: calculatedScore,
      student_id: findCurrentUser.student_id,
      submission_date: submissionDate,
      timeTaken: TOTAL_TIME - timeRemaining,
      isAutoSubmitted: isAutoSubmit,
    };

    try {
      // First update the lesson data
      await updateLessonData({
        user_quizData: [
          ...(findLessons?.user_quizData || []),
          updatedLessonContent,
        ],
      });

      // Then try to update the leaderboard
      try {
        await submitQuizAndUpdateLeaderboard(
          findCurrentUser.student_id,
          calculatedScore,
        );
      } catch (leaderboardError) {
        console.error('Leaderboard update error:', leaderboardError);
        // Don't show error to user as quiz is already submitted
      }

      setIsQuizCompleted(true);
      localStorage.removeItem('quizProgress');
      closeModal();

      if (isAutoSubmit) {
        Swal.fire({
          title: "Time's Up!",
          text: 'Your quiz has been automatically submitted.',
          icon: 'info',
        });
      } else {
        Swal.fire({
          title: 'Quiz Submitted',
          text: 'Your quiz has been submitted successfully!',
          icon: 'success',
        });
      }
    } catch (error) {
      console.error('Quiz submission error:', error);

      // For auto-submit, keep trying to submit
      if (isAutoSubmit) {
        const retrySubmission = async () => {
          try {
            await updateLessonData({
              user_quizData: [
                ...(findLessons?.user_quizData || []),
                updatedLessonContent,
              ],
            });

            setIsQuizCompleted(true);
            localStorage.removeItem('quizProgress');

            Swal.fire({
              title: "Time's Up!",
              text: 'Your quiz has been automatically submitted.',
              icon: 'info',
            });
          } catch (retryError) {
            console.error('Retry submission error:', retryError);
            // If still failing, try again after 5 seconds
            setTimeout(retrySubmission, 5000);
          }
        };

        retrySubmission();
      } else {
        Swal.fire({
          title: 'Error',
          text: 'There was a problem submitting your quiz. Please try again.',
          icon: 'error',
        });
      }
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m:${secs < 10 ? '0' : ''}${secs}s`;
  };

  // Rest of the render logic remains the same...
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
                {Object.keys(selectedAnswers).length}/{quizData?.length}{' '}
                Questions Answered
              </p>
              <ButtonDashboard
                onClick={() => setModalIsOpen(true)}
                className=" bg-[#101828] text-white hover:bg-[#101828ca]"
                disabled={isSubmitting}
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
            onClick={() => handleSubmitQuiz(false)}
            className="bg-[#101828] text-white hover:bg-[#101828ca]"
            disabled={isSubmitting}
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
