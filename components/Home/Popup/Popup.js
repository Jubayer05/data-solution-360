import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { loadData } from '../../../src/hooks/loadData';

const Popup = ({ handler }) => {
  const [popupImage, setPopupImage] = useState([]);
  useEffect(() => {
    loadData('popupImage', setPopupImage);
  }, []);

  const findTrendingCourse = popupImage.find(
    (item) => item.id === 'fkmw579u5iajG01FzncO',
  );

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-[#0000008f] z-[1000] flex justify-center items-center">
      <div className="-top-36 h-[230px] md:h-[350px] lg:h-[380px] w-[350px] md:w-[500px] lg:w-[600px] rounded-md relative flex items-center flex-col bg-cover">
        <Image
          width={500}
          height={300}
          src={findTrendingCourse?.photoUrl}
          alt="Popup img"
          className="rounded-lg"
        />
        <Link href={findTrendingCourse?.trendingCourseLink || '#'}>
          <button
            className={`text-md px-3 py-2 hover:drop-shadow-xl flex items-center text-gray-300 rounded-md mt-2
          bg-primary-bg transition-all duration-300 ease-linear `}
          >
            Click Here for Details
          </button>
        </Link>
        <div className="absolute -top-3 -right-3">
          <RxCross1
            onClick={() => handler(false)}
            className="text-2xl cursor-pointer bg-black border-2 p-1 rounded-full text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
