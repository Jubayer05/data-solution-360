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

  // const findLessons = moduleData?.lessons?.find((quiz) => quiz.id === quizId);

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

  const handleOpenQuiz = (item) => {
    setModalIsOpen(true);
    setQuizId(item);
  };

  return (
    <div>
      {moduleData?.lessons
        .filter((item) => item.quizData && item.quizData.length > 0)
        ?.map((lesson, index) => {
          const userAlreadyGiveQuiz = Array.isArray(lesson?.user_quizData)
            ? lesson.user_quizData.find(
                (user) => user.student_id === findCurrentUser.student_id,
              )
            : null;

          return (
            <div
              key={index}
              className={`flex justify-between items-start self-stretch px-4 py-8 gap-4 
          border-b border-x-4 border-x-[transparent] hover:border-x-[gray] bg-white 
          `}
            >
              <div className="w-[80%] flex items-start gap-3">
                <Image
                  src="/icon/quiz.png"
                  className="w-[60px]"
                  width={60}
                  height={60}
                  alt=""
                />
                <div>
                  <div className="flex gap-3 items-center mb-2">
                    <p
                      className={`text-center leading-[19px] tracking-[0.02em] flex justify-center items-center 
                text-[13px] px-2 py-1 rounded-md border border-[#3d9970] text-[#3d9970] font-semibold bg-[#85ffc82d]`}
                    >
                      Batch-{enrolledCourse?.batchNumber}
                    </p>
                    <p
                      className={`font-medium text-center leading-[19px] tracking-[0.02em] flex justify-center items-center 
        text-[13px]  px-2 py-1 rounded-md border border-dashboard_border bg-[#cfcfcf74]`}
                    >
                      {formatDate(lesson?.classDate)}
                      {', '}
                      {convertToAMPM(lesson?.classTime)}
                    </p>
                  </div>
                  <h2
                    className={`text-[20px] font-semibold mt-2 leading-6 font-subHeading`}
                  >
                    {lesson?.title}
                  </h2>
                  <div>
                    <p>Check the result to see the answer sheet of the quiz.</p>
                    <p className="text-sm italic mt-1 text-[#656565]">
                      The quiz will be based on the prerecorded videos of the
                      module and what has been taught in the module.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[20%] flex justify-center flex-col items-end gap-3">
                {userAlreadyGiveQuiz && (
                  <p
                    className={`text-center leading-[19px] tracking-[0.02em] flex justify-center items-center 
            text-[13px] px-2 py-1 rounded-md border border-[#3d9970] text-[#3d9970] font-semibold bg-[#85ffc82d]`}
                  >
                    Mark {userAlreadyGiveQuiz?.obtained_marks}/
                    {userAlreadyGiveQuiz?.quizDataUser?.length}
                  </p>
                )}
                {userAlreadyGiveQuiz ? (
                  <Link
                    href={`${currentUrl}/quiz/${lesson.id}/result`}
                    className=" text-black visited:text-black"
                  >
                    <ButtonDashboard className="bg-[#ffefe2] hover:bg-[#f9e5d5] border border-[#f6b27a]">
                      <span className="flex items-center gap-2">Result</span>
                    </ButtonDashboard>
                  </Link>
                ) : (
                  <ButtonDashboard
                    onClick={() => handleOpenQuiz(lesson.id)}
                    className="bg-primary_btn hover:bg-[#001f3fdb] text-white"
                  >
                    <span className="flex items-center gap-2">Start Quiz</span>
                  </ButtonDashboard>
                )}
              </div>
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
                <h2 className="text-3xl font-bold text-center mt-2  text-[#ff4400a7]">
                  Careful! Know about the rules of quiz.
                </h2>
                <p className="text-center mb-5">
                  You have missed the deadline of the quiz.{' '}
                  <strong className="text-[orangered]">
                    50% Marks will be cut.
                  </strong>
                </p>
                <div className="h-[350px] overflow-y-scroll px-10 pb-10 text-lg">
                  <p>
                    - You will not be able to take this quiz again. So, check if
                    your internet connection and electricity are fine.
                  </p>

                  <p className="mt-5">
                    - If you are disconnected for some reason in the middle of
                    the quiz, you can login again and start the quiz. If your
                    time is lost for any reason, it will not be given back to
                    you.
                  </p>

                  <p className="mt-5">
                    -You can join the test from another device if there is a
                    problem with your device.
                  </p>

                  <p className="mt-5">
                    - If you fail to submit the quiz on time, your quiz will be
                    auto submitted. You will not be able to take this quiz
                    again.
                  </p>

                  <ConfigProvider
                    theme={{
                      components: {
                        Checkbox: {
                          colorBorder: '#aaaaaa',
                          colorPrimary: '#02274b',
                          colorPrimaryBorder: '#02274b',
                          colorPrimaryHover: '#02274b',
                          fontSize: 14,
                        },
                      },
                    }}
                  >
                    <Checkbox
                      onChange={onChange}
                      className="text-lg bg-[#ffefe2] mt-5 p-2 rounded-md border border-[#f9c296]"
                    >
                      I want to take the quiz now and am aware of the 50% mark
                      deduction. The marks I get in this quiz will be minus 50%
                      and I have no problem with that
                    </Checkbox>
                  </ConfigProvider>
                </div>
                <div className="px-10 pt-5 bg-white">
                  <button
                    disabled={checked ? false : true}
                    onClick={() =>
                      (window.location.href = `${currentUrl}/quiz/${quizId}`)
                    }
                    className="w-full bg-[#101828] text-white hover:bg-[#101828dc] rounded-md px-5 py-2 bg-[#001f3f0e] 
            flex items-center font-semibold justify-center gap-3  transition duration-300"
                  >
                    Thanks, Got it
                  </button>
                </div>
              </CustomModal>
            </div>
          );
        })}
      {/* NOTE: MODALS */}
    </div>
  );
};

export default QuizItem;
