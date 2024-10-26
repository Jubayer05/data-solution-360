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
          <button className="mt-3 relative px-8 py-3 font-bold text-white bg-gradient-to-r from-orange-500 to-pink-600 rounded-full shadow-lg hover:from-pink-600 hover:to-orange-500 focus:outline-none focus:ring-4 focus:ring-pink-300 transform transition-all duration-300 hover:scale-105 active:scale-95">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-600 to-pink-700 opacity-0 rounded-full transition-opacity duration-300 group-hover:opacity-100"></span>
            <span className="relative z-10">Know More</span>
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
