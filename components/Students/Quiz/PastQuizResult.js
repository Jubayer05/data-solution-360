import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';

const PastQuizResult = ({ setShowResult, setCheckAnswer }) => {
  const { activeMenu } = useStateContextDashboard();

  const handleCheckAnswer = () => {
    setCheckAnswer(true);
    setShowResult(false);
  };

  const router = useRouter();
  const { courseId, moduleId } = router.query;

  return (
    <div>
      <div
        className={`${
          activeMenu
            ? 'w-full mx-auto px-4'
            : 'w-full pr-3 md:pr-[6] pl-[84px] md:pl-[96px]'
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
                24 April, 2024
              </p>
              <h2 className="text-xl font-bold text-center">Module 2 Quiz</h2>
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
                    <p className="text-[#4478ff]">10</p>
                  </div>
                  <div className="flex items-center justify-between font-semibold font-heading mt-1">
                    <p>Incorrect Answer</p>
                    <p className="text-[#f04438]">10</p>
                  </div>
                  <div className="flex items-center justify-between font-semibold font-heading mt-1">
                    <p>Correct Answer</p>
                    <p className="text-[#12b76a]">10</p>
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
                    <p className="text-[#4478ff]">20:00 Min</p>
                  </div>
                  <div className="flex items-center justify-between font-semibold font-heading mt-1">
                    <p>Time Taken</p>
                    <p className="text-[#f04438]">10</p>
                  </div>
                  <div className="flex items-center justify-between font-semibold font-heading mt-1">
                    <p>Total Score</p>
                    <p className="text-[#12b76a]">40%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-3">
              <ButtonDashboard className="flex-1" onClick={handleCheckAnswer}>
                Check Answer
              </ButtonDashboard>
              <Link href={`/students/my-course/${courseId}/module/${moduleId}`}>
                <ButtonDashboard className="flex-1 bg-[#101828] text-white hover:bg-[#101828ca]">
                  Back to Module <FaArrowRightLong />
                </ButtonDashboard>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastQuizResult;
