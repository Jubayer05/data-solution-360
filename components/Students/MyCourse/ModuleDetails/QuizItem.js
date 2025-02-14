import { Checkbox, ConfigProvider } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../../../src/context/ContextProvider';
import useEnrolledCourseData from '../../../../src/hooks/useEnrolledCourseData';
import { convertToAMPM } from '../../../../src/utils/convertAMPM';
import { formatDate } from '../../../../src/utils/convertDate';
import CustomModal from '../../../utilities/CustomModal';
import ButtonDashboard from '../../../utilities/dashboard/ButtonDashboard';

const QuizItem = ({ item, enrolledCourse }) => {
  const { findCurrentUser } = useStateContext();
  const { moduleData } = useEnrolledCourseData();
  const [currentUrl, setCurrentUrl] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [quizId, setQuizId] = useState(null);
  const [isLate, setIsLate] = useState(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
    setChecked(false);
  };

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  const isOver36Hours = (classDate, classTime) => {
    const classDateTime = new Date(`${classDate}T${classTime}`);
    const currentTime = new Date();
    const hoursDifference = (currentTime - classDateTime) / (1000 * 60 * 60);
    return hoursDifference > 36;
  };

  const handleOpenQuiz = (lesson) => {
    const isOverdue = isOver36Hours(lesson.classDate, lesson.classTime);
    setIsLate(isOverdue);
    setModalIsOpen(isOverdue); // Only show modal if overdue
    setQuizId(lesson.id);

    // If not overdue, directly navigate to quiz
    if (!isOverdue) {
      window.location.href = `${currentUrl}/quiz/${lesson.id}`;
    }
  };

  console.log(moduleData?.lessons);

  return (
    <div>
      {moduleData?.lessons
        .filter(
          (item) =>
            item.quizData && item.quizData.length > 0 && item.classFinished,
        )
        ?.map((lesson, index) => {
          const userAlreadyGiveQuiz = Array.isArray(lesson?.user_quizData)
            ? lesson.user_quizData.find(
                (user) => user.student_id === findCurrentUser.student_id,
              )
            : null;

          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center self-stretch px-4 py-8 gap-4 
              border-b border-x-4 border-x-transparent hover:border-x-gray bg-white"
            >
              <div className="w-full sm:w-[80%] flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Image
                  src="/icon/quiz.png"
                  className="w-12 sm:w-[60px]"
                  width={60}
                  height={60}
                  alt=""
                />
                <div>
                  <div className="flex flex-wrap gap-3 items-center mb-2">
                    <p className="text-center text-[13px] px-2 py-1 rounded-md border border-[#3d9970] text-[#3d9970] font-semibold bg-[#85ffc82d]">
                      Batch-{enrolledCourse?.batchNumber}
                    </p>
                    <p className="text-[13px] px-2 py-1 rounded-md border border-dashboard_border bg-[#cfcfcf74]">
                      {formatDate(lesson?.classDate)},{' '}
                      {convertToAMPM(lesson?.classTime)}
                    </p>
                  </div>
                  <h2 className="text-lg sm:text-[20px] font-semibold mt-2">
                    {lesson?.title}
                  </h2>
                  <div>
                    <p className="text-sm sm:text-base">
                      Check the result to see the answer sheet of the quiz.
                    </p>
                    <p className="text-xs sm:text-sm italic mt-1 text-[#656565]">
                      The quiz will be based on the prerecorded videos of the
                      module and what has been taught in the module.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-[20%] flex justify-center sm:justify-end flex-col items-end gap-3">
                {userAlreadyGiveQuiz && (
                  <p className="text-center text-[13px] px-2 py-1 rounded-md border border-[#3d9970] text-[#3d9970] font-semibold bg-[#85ffc82d]">
                    Mark {userAlreadyGiveQuiz?.obtained_marks}/
                    {userAlreadyGiveQuiz?.quizDataUser?.length}
                  </p>
                )}
                {userAlreadyGiveQuiz ? (
                  <Link
                    href={`${currentUrl}/quiz/${lesson.id}/result`}
                    className="text-black visited:text-black"
                  >
                    <ButtonDashboard className="bg-[#ffefe2] hover:bg-[#f9e5d5] border border-[#f6b27a]">
                      <span className="flex items-center gap-2">Result</span>
                    </ButtonDashboard>
                  </Link>
                ) : (
                  <ButtonDashboard
                    onClick={() => handleOpenQuiz(lesson)}
                    className="bg-primary_btn hover:bg-[#001f3fdb] text-white"
                  >
                    <span className="flex items-center gap-2">Start Quiz</span>
                  </ButtonDashboard>
                )}
              </div>
              {isLate && (
                <CustomModal
                  modalIsOpen={modalIsOpen}
                  closeModal={closeModal}
                  setModalIsOpen={setModalIsOpen}
                >
                  <Image
                    width={500}
                    height={200}
                    src="/icon/warning-sign.png"
                    className="w-24 mx-auto -mt-5"
                    alt=""
                  />
                  <h2 className="text-xl sm:text-3xl font-bold text-center mt-2 text-[#ff4400a7]">
                    Careful! Know about the rules of quiz.
                  </h2>
                  <p className="text-center mb-5 text-sm sm:text-base">
                    You have missed the deadline of the quiz.{' '}
                    <strong className="text-[orangered]">
                      50% Marks will be cut.
                    </strong>
                  </p>
                  <div className="h-60 sm:h-[350px] overflow-y-scroll px-4 sm:px-10 pb-4 sm:pb-10 text-sm sm:text-lg">
                    <p>
                      - Ensure your internet and electricity are stable during
                      the quiz.
                    </p>
                    <p className="mt-5">
                      - If disconnected, you can log in again, but time lost
                      will not be restored.
                    </p>
                    <p className="mt-5">
                      - You may switch devices if necessary.
                    </p>
                    <p className="mt-5">
                      - The quiz will auto-submit if time runs out; retakes are
                      not allowed.
                    </p>
                    <ConfigProvider
                      theme={{
                        components: {
                          Checkbox: { colorPrimary: '#02274b', fontSize: 14 },
                        },
                      }}
                    >
                      <Checkbox
                        onChange={onChange}
                        className="text-lg bg-[#ffefe2] mt-5 p-2 rounded-md border border-[#f9c296]"
                      >
                        I accept the 50% mark deduction for missing the
                        deadline.
                      </Checkbox>
                    </ConfigProvider>
                  </div>
                  <div className="px-4 sm:px-10 pt-5 bg-white">
                    <button
                      disabled={!checked}
                      onClick={() =>
                        (window.location.href = `${currentUrl}/quiz/${quizId}`)
                      }
                      className="w-full bg-[#101828] text-white hover:bg-[#101828dc] rounded-md px-5 py-2 transition duration-300"
                    >
                      Proceed to Quiz
                    </button>
                  </div>
                </CustomModal>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default QuizItem;
