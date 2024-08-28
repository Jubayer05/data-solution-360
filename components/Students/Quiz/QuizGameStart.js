import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { IoTimerOutline } from 'react-icons/io5';
import { quizData } from '../../../src/data/dummy';
import CustomModal from '../../utilities/CustomModal';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import PastQuizResult from './PastQuizResult';
import QuizResult from './QuizResult';

const TOTAL_TIME = 20 * 60;

const QuizGameStart = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TIME);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
      const { selectedAnswers, timeRemaining } = JSON.parse(savedProgress);
      setSelectedAnswers(selectedAnswers);
      setTimeRemaining(timeRemaining);
    }

    const countdown = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          handleSubmitQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    const quizProgress = {
      selectedAnswers,
      timeRemaining,
    };
    localStorage.setItem('quizProgress', JSON.stringify(quizProgress));
  }, [selectedAnswers, timeRemaining]);

  const handleOptionClick = (questionIndex, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });
    console.log(selectedAnswers);
  };

  const handleSubmitQuiz = () => {
    let calculatedScore = 0;
    quizData.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setIsQuizCompleted(true);
    localStorage.removeItem('quizProgress');
    closeModal();
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
          <QuizResult quizData={quizData} selectedAnswers={selectedAnswers} />
        </div>
      ) : (
        <div>
          {/* Timer always visible */}
          <div className="fixed top-[54px] right-[20px] mt-4 z-50">
            <p className="text-base font-semibold flex items-center gap-1 bg-green-200 p-1 rounded">
              <IoTimerOutline /> {formatTime(timeRemaining)}
            </p>
          </div>

          <div className="mb-8">
            {quizData.map((question, index) => (
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
                      onClick={() => handleOptionClick(index, option)}
                      className={`cursor-pointer p-4 mb-4 rounded-lg border flex items-center gap-2 ${
                        selectedAnswers[index] === option
                          ? 'bg-[#1f2b43] border-[#1f2b43] text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-7 h-7 rounded-full font-bold bg-[#eaecf0] text-black`}
                      >
                        {optionIndex + 1}
                      </div>
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center">
              <ButtonDashboard className="">
                <FaArrowLeftLong />
                Back
              </ButtonDashboard>
              <p className="bg-gray-200 px-2 py-1 rounded-md">
                {Object.keys(selectedAnswers).length}/10 Questions Answered
              </p>
              <ButtonDashboard
                onClick={() => setModalIsOpen(true)}
                className=" bg-[#101828] text-white hover:bg-[#101828ca]"
              >
                Finish Exam <FaArrowRightLong />
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
          {Object.keys(selectedAnswers).length}/10 Questions Answered
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
            Submit Answer
          </ButtonDashboard>
        </div>
      </CustomModal>
    </div>
  );
};

export default QuizGameStart;
