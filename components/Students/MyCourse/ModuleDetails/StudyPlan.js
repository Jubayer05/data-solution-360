import { Checkbox, ConfigProvider } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaRegPlayCircle } from 'react-icons/fa';
import { RiLiveLine } from 'react-icons/ri';
import { useStudentContext } from '../../../../src/context/StudentContext';
import CustomModal from '../../../utilities/CustomModal';

import { convertToAMPM } from '../../../../src/utils/convertAMPM';
import { formatDateWithoutYear } from '../../../../src/utils/convertDate';
import ButtonDashboard from '../../../utilities/dashboard/ButtonDashboard';

const StudyPlan = ({ moduleData, enrolledCourse }) => {
  const { moduleShowComp, setModuleShowComp } = useStudentContext();
  const [currentUrl, setCurrentUrl] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  // console.log(enrolledCourse);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const todayDate = '5';

  const closeModal = () => {
    setModalIsOpen(false);
    setChecked(false);
  };

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div className="mt-2 mb-10 w-full border border-dashboard_border rounded-lg overflow-hidden shadow-md">
      {moduleShowComp == 'All' || moduleShowComp == 'Live Class' ? (
        <div>
          {moduleData?.lessons.map((item, index) => (
            <div
              key={item.id}
              className={`flex justify-between items-start self-stretch px-4 py-8 gap-4 
          border-b border-x-4 border-x-[transparent] hover:border-x-[gray] ${
            item?.liveClassLink && !item?.classFinished
              ? 'bg-primary_btn hover:bg-[#00172e]'
              : 'bg-white hover:bg-gray-100'
          }`}
            >
              <div className="w-[70%] flex items-start gap-3">
                <Image
                  src="/icon/live.png"
                  className="w-[60px]"
                  width={60}
                  height={60}
                  alt=""
                />
                <div>
                  <div className="flex gap-3 items-center mb-2">
                    <p
                      className={`text-center leading-[19px] tracking-[0.02em] flex justify-center items-center 
        text-[13px] px-2 py-1 rounded-md border border-[#3d9970] text-[#3d9970] font-semibold ${
          item?.liveClassLink && !item?.classFinished
            ? 'bg-[#ffffff]'
            : 'bg-[#85ffc82d]'
        }`}
                    >
                      Batch-{enrolledCourse?.batchNumber}
                    </p>
                    <p
                      className={`font-medium text-center leading-[19px] tracking-[0.02em] flex justify-center items-center 
        text-[13px]  px-2 py-1 rounded-md border border-dashboard_border  ${
          item?.liveClassLink && !item?.classFinished
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
                    className={`text-[22px] font-semibold mt-5 leading-6 font-subHeading ${
                      item?.liveClassLink && !item?.classFinished
                        ? 'text-white'
                        : 'text-black'
                    }`}
                  >
                    {item.title}
                  </h2>
                </div>
              </div>
              <div className="w-[30%] flex justify-end">
                {item?.liveClassLink && item?.classFinished ? (
                  <button
                    className="flex justify-between items-center gap-2 bg-[#e2e2e2] hover:bg-[#d5d5d5] font-semibold py-2
      px-5 rounded border-dashboard_border border transition-all duration-200"
                  >
                    <FaRegPlayCircle />
                    <span className="flex items-center gap-2">
                      Class Recording
                    </span>
                  </button>
                ) : item?.liveClassLink && !item?.classFinished ? (
                  <Link
                    href={`${currentUrl}/join/live/${item?.id}`}
                    className="flex justify-between items-center gap-2 bg-[#fecb63] hover:bg-[#e7b655] 
                font-semibold py-2 px-5 rounded transition-all duration-200 text-black visited:text-black"
                  >
                    <RiLiveLine />
                    <span className="flex items-center gap-2">Join Live</span>
                  </Link>
                ) : !item?.liveClassLink && !item?.classFinished ? (
                  <span className="bg-[#fff1da] text-orange-400 border border-[#ff893b] px-2 text-xs rounded-full font-semibold">
                    Upcoming
                  </span>
                ) : (
                  ''
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
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
                  Batch-1
                </p>
                <p
                  className={`font-medium text-center leading-[19px] tracking-[0.02em] flex justify-center items-center 
        text-[13px]  px-2 py-1 rounded-md border border-dashboard_border bg-[#cfcfcf74]`}
                >
                  16 May, 9.00 PM
                </p>
              </div>
              <h2
                className={`text-[20px] font-semibold mt-2 leading-6 font-subHeading`}
              >
                Quiz Title
              </h2>
              <div>
                <p>Check the result to see the answer sheet of the quiz.</p>
                <p className="text-sm">
                  <span className="text-xs">Notes:</span> The quiz will be based
                  on the prerecorded videos of the module and what has been
                  taught in the module.
                </p>
                <ol className="text-sm list-decimal ml-10">
                  <li className="mt-3">
                    There will be 10 total quizzes (MCQ, 4 options each). Time
                    will be 20 minutes.
                  </li>
                  <li className="mt-3">
                    The quiz should be participated within the deadline from the
                    day the quiz is unlocked.
                  </li>
                  <li className="mt-3">
                    Do not click the quiz just to see or see what happens when
                    you click this button. Because, once you open it, you have
                    to get out by answering the whole thing. And if you click
                    once, do an answer and come out, then you will not get a
                    chance to participate later.
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div className="w-[20%] flex justify-center flex-col items-end gap-3">
            <p
              className={`text-center leading-[19px] tracking-[0.02em] flex justify-center items-center 
        text-[13px] px-2 py-1 rounded-md border border-[#3d9970] text-[#3d9970] font-semibold bg-[#85ffc82d]`}
            >
              Mark 4/10
            </p>
            <Link
              href={`${currentUrl}/quiz/result`}
              className=" text-black visited:text-black"
            >
              <ButtonDashboard className="bg-[#e2e2e2] hover:bg-[#d5d5d5]">
                <span className="flex items-center gap-2">Result</span>
              </ButtonDashboard>
            </Link>
            <ButtonDashboard
              onClick={() => setModalIsOpen(true)}
              className="bg-[#ffefe2] hover:bg-[#f9e5d5] border border-[#f6b27a]"
            >
              <span className="flex items-center gap-2">Start Quiz</span>
            </ButtonDashboard>
          </div>
        </div>
      )}

      {/* NOTE: MODALS */}
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
          <strong className="text-[orangered]">50% Marks will be cut.</strong>
        </p>
        <div className="h-[350px] overflow-y-scroll px-10 pb-10 text-lg">
          <p>
            - You will not be able to take this quiz again. So, check if your
            internet connection and electricity are fine.
          </p>

          <p className="mt-5">
            - If you are disconnected for some reason in the middle of the quiz,
            you can login again and start the quiz. If your time is lost for any
            reason, it will not be given back to you.
          </p>

          <p className="mt-5">
            -You can join the test from another device if there is a problem
            with your device.
          </p>

          <p className="mt-5">
            - If you fail to submit the quiz on time, your quiz will be auto
            submitted. You will not be able to take this quiz again.
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
              deduction. The marks I get in this quiz will be minus 50% and I
              have no problem with that
            </Checkbox>
          </ConfigProvider>
        </div>
        <div className="px-10 pt-5 bg-white">
          <button
            disabled={checked ? false : true}
            onClick={() => (window.location.href = `${currentUrl}/quiz`)}
            className="w-full bg-[#101828] text-white hover:bg-[#101828dc] rounded-md px-5 py-2 bg-[#001f3f0e] 
            flex items-center font-semibold justify-center gap-3  transition duration-300"
          >
            Thanks, Got it
          </button>
        </div>
      </CustomModal>
    </div>
  );
};

export default StudyPlan;
