/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { bg_colors, colors } from '../../../src/data/data';

const LeaderBoard = () => {
  const leaderBoardArr = [
    {
      position: '1',
      name: 'John Smith',
      marksPercentage: '85',
      photoUrl: 'https://randomuser.me/api/portraits/med/men/1.jpg',
    },
    {
      position: '2',
      name: 'Emily Davis',
      marksPercentage: '90',
      photoUrl: 'https://randomuser.me/api/portraits/med/women/1.jpg',
    },
    {
      position: '3',
      name: 'Michael Johnson',
      marksPercentage: '75',
      photoUrl: 'https://randomuser.me/api/portraits/med/men/2.jpg',
    },
    {
      position: '4',
      name: 'Sarah Brown',
      marksPercentage: '80',
      photoUrl: 'https://randomuser.me/api/portraits/med/women/2.jpg',
    },
    {
      position: '5',
      name: 'David Wilson',
      marksPercentage: '88',
      photoUrl: 'https://randomuser.me/api/portraits/med/men/3.jpg',
    },
  ];

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
            <img src={item.photoUrl} className="w-[50px] rounded-full" alt="" />
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
