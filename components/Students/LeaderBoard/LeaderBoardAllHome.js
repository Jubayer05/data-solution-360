import { useRouter } from 'next/router';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
// import { videosPlaylist } from '../../../../src/data/data';
import { useStateContext } from '../../../src/context/ContextProvider';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import { bg_colors, colors } from '../../../src/data/data';
import { leaderBoardArr } from '../../../src/data/dummy';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import Image from 'next/image';

const LeaderBoardHome = () => {
  const { activeMenu } = useStateContextDashboard();
  const { userEmail } = useStateContext();

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const sortedArray = leaderBoardArr.sort(
    (a, b) => b.marksPercentage - a.marksPercentage,
  );

  const topThree = sortedArray.slice(0, 3);

  const remainingSorted = sortedArray.slice(3);

  const findUserLeaderboard = sortedArray.find(
    (item) => item.email === userEmail,
  );

  const findUserLeaderboardIndex = sortedArray.findIndex(
    (item) => item.email === userEmail,
  );
  console.log(findUserLeaderboard);

  return (
    <div>
      <div
        className={`${
          activeMenu ? 'w-full mx-auto px-16' : 'w-full pr-6 pl-[96px]'
        } mx-auto mb-10`}
      >
        <div className="flex items-end gap-4 pt-6">
          <ButtonDashboard onClick={handleBack}>
            <FaArrowLeft />
            Back
          </ButtonDashboard>
        </div>

        {/* NOTE: TOP THREE PROFILE */}
        <div className="grid grid-cols-3 gap-5 my-5">
          {topThree.map((item, index) => (
            <div
              key={item.photoUrl}
              className={`flex items-center px-4 py-2 gap-2 rounded`}
              style={{ backgroundColor: bg_colors[index] }}
            >
              <span
                className="text-lg font-bold"
                style={{ color: colors[index] }}
              >
                {index + 1}
              </span>
              <Image
                width={500}
                height={300}
                src={item.photoUrl}
                className="w-[50px] rounded-full"
                alt=""
              />
              <p className="font-semibold">{item.name}</p>
              <div className="ml-auto">
                <p
                  className="text-lg font-bold"
                  style={{ color: colors[index] }}
                >
                  {item.marksPercentage}%
                </p>
                <p className="text-xs -mt-1">Marks</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-3 border rounded-lg">
          {/* NOTE: YOUR PROFILE */}
          <div className="grid grid-cols-3">
            <div
              key={findUserLeaderboard?.photoUrl}
              className={`flex items-center px-4 py-2 gap-2 rounded relative overflow-hidden border`}
              style={{ backgroundColor: bg_colors[6] }}
            >
              <span className="bg-white px-3 absolute -left-4 -top-1 rotate-[-45deg]">
                You
              </span>
              <span className="text-lg font-bold" style={{ color: colors[6] }}>
                {findUserLeaderboardIndex + 1}
              </span>
              <Image
                width={500}
                height={300}
                src={findUserLeaderboard?.photoUrl}
                className="w-[50px] rounded-full"
                alt=""
              />
              <p className="font-semibold">{findUserLeaderboard?.name}</p>
              <div className="ml-auto">
                <p className="text-lg font-bold" style={{ color: colors[6] }}>
                  {findUserLeaderboard?.marksPercentage}%
                </p>
                <p className="text-xs -mt-1">Marks</p>
              </div>
            </div>
          </div>

          {/* NOTE: OTHERS PROFILE */}
          <p className="mt-5 text-lg font-semibold">Others</p>
          <hr className="my-2" />
          <div className="grid grid-cols-3 gap-6 mb-5 ">
            {remainingSorted.map((item, index) => (
              <div
                key={item.photoUrl}
                className={`flex items-center px-4 py-2 gap-2 rounded-lg border-b-1`}
                // style={{ backgroundColor: bg_colors[index] }}
              >
                <span className="text-lg font-bold">{index + 4}</span>
                <Image
                  width={500}
                  height={300}
                  src={item.photoUrl}
                  className="w-[50px] rounded-full"
                  alt=""
                />
                <p className="font-semibold">{item.name}</p>
                <div className="ml-auto">
                  <p className="text-lg font-bold">{item.marksPercentage}%</p>
                  <p className="text-xs -mt-1">Marks</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardHome;
