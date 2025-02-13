import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { bg_colors, colors } from '../../../src/data/data';
import useLeaderboardData from '../../../src/hooks/useLeaderBoardData';

const LeaderBoard = () => {
  const [currentUrl, setCurrentUrl] = useState(null);
  const allLeaderBoardData = useLeaderboardData();

  const sortedArray = allLeaderBoardData?.sort(
    (a, b) => b.totalStudentScore - a.totalStudentScore,
  );

  const topTen = sortedArray?.slice(0, 10);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <div className="px-3 pt-3 pb-5 bg-white mt-4 rounded border border-dashboard_border">
      <div className="flex justify-between">
        <h4>Leader board</h4>
        <Link href={`${currentUrl}/leaderboard`}>
          <button>See All</button>
        </Link>
      </div>
      <div>
        {topTen?.map((item, index) => (
          <div
            key={item.photoUrl}
            className={`flex items-center px-4 py-2 gap-2 my-3 rounded`}
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
              src={item.photoUrl || '/icon/profile.png'}
              className="w-[50px] rounded-full"
              alt=""
            />

            <p className="font-semibold">{item.full_name}</p>
            <div className="ml-auto">
              <p className="text-lg font-bold" style={{ color: colors[index] }}>
                {item.totalStudentScore || 0}%
              </p>
              <p className="text-xs -mt-1">Marks</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
