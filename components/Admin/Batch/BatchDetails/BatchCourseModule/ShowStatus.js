import React from 'react';
import useIsToday from '../../../../../src/utils/useIsToday';

const ShowStatus = ({ item }) => {
  const isToday = useIsToday(item?.classDate);
  return (
    <div>
      {item?.liveClassLink && item?.classFinished ? (
        <span className="bg-green-50 border border-green-500 px-2 text-xs rounded-full font-semibold text-[#48bb78]">
          Class Finished
        </span>
      ) : item?.liveClassLink && isToday ? (
        <span className="bg-blue-100 border border-blue-500 px-2 text-xs rounded-full font-semibold text-[#4299e1]">
          Live Class Today
        </span>
      ) : item?.liveClassLink && isToday === false ? (
        <span className="bg-purple-100 border border-purple-500 px-2 text-xs rounded-full font-semibold text-[#6b46c1]">
          Upcoming
        </span>
      ) : (
        ''
      )}
    </div>
  );
};

export default ShowStatus;
