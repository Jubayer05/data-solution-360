import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { bg_colors, colors } from '../../../src/data/data';
import { leaderBoardArr } from '../../../src/data/dummy';

const LeaderBoard = () => {
  const [currentUrl, setCurrentUrl] = useState(null);

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
        {leaderBoardArr.map((item, index) => (
          <div
            key={item.photoUrl}
            className={`flex items-center px-4 py-2 gap-2 my-3 rounded`}
            style={{ backgroundColor: bg_colors[index] }}
          >
            <span
              className="text-lg font-bold"
              style={{ color: colors[index] }}
            >
              {item.position}
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
              <p className="text-lg font-bold" style={{ color: colors[index] }}>
                {item.marksPercentage}%
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
