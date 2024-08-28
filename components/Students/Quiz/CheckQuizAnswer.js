import Image from 'next/image';
import React from 'react';
import { FaArrowRightLong, FaRegCircleCheck } from 'react-icons/fa6';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import QuizGameStart from './QuizGameStart';

const CheckQuizAnswer = () => {
  const { activeMenu } = useStateContextDashboard();

  return (
    <div>
      <div
        className={`${
          activeMenu ? 'w-full mx-auto px-4' : 'w-full pr-6 pl-[96px]'
        } mx-auto flex items-start gap-6`}
      >
        <div className="w-full mx-auto mb-10">
          <div className="bg-white shadow-lg rounded-xl px-8 pb-8 my-5">
            <h3 className="text-xl font-heading font-bold text-center pt-5">
              Quiz Result
            </h3>
            <div className="w-[70%] mx-auto bg-[#f9f9fa] px-5 py-7 rounded flex gap-5 mt-8">
              <div className="bg-[#ffffff] flex-1 p-4 rounded-md">
                <Image
                  width={500}
                  height={300}
                  src="/icon/question-mark.png"
                  className="w-10 mx-auto mb-3"
                  alt=""
                />
                <h2 className="text-2xl font-heading font-bold text-[#4478ff] text-center mb-1">
                  4/10
                </h2>
                <p className="text-sm font-semibold text-center">Correct</p>
              </div>
              <div className="bg-[#ffffff] flex-1 p-4 rounded-md">
                <Image
                  width={500}
                  height={300}
                  src="/icon/speedometer.png"
                  className="w-10 mx-auto mb-3"
                  alt=""
                />
                <h2 className="text-2xl font-heading font-bold text-[#12b76a] text-center mb-1">
                  40%
                </h2>
                <p className="text-sm font-semibold text-center">
                  Scores earned
                </p>
              </div>
              <div className="bg-[#ffffff] flex-1 p-4 rounded-md">
                <Image
                  width={500}
                  height={300}
                  src="/icon/clock_boost.png"
                  className="w-10 mx-auto mb-3"
                  alt=""
                />
                <h2 className="text-2xl font-heading font-bold text-[#ff4444] text-center mb-1">
                  20:00/20:00 Min.
                </h2>
                <p className="text-sm font-semibold text-center">Time</p>
              </div>
            </div>
            <div className="flex justify-center gap-8 my-5">
              <div className="flex items-center gap-2">
                <div className="bg-[#fee4ea] rounded-full  p-1">
                  <MdOutlineCancel className="text-2xl text-[#f1554a]" />
                </div>
                <p className="text-lg">= Incorrect Answer</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#d1fadf] rounded-full p-1.5">
                  <FaRegCircleCheck className="text-lg text-[#1fbc72]" />
                </div>
                <p className="text-lg">= Correct Answer</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#101828] rounded-full w-7 h-7" />
                <p className="text-lg"> = Your Answer</p>
              </div>
            </div>
            <QuizGameStart />

            <ButtonDashboard className="mx-auto mt-5 flex-1 bg-[#101828] text-white hover:bg-[#101828ca]">
              Back to Module <FaArrowRightLong />
            </ButtonDashboard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckQuizAnswer;
