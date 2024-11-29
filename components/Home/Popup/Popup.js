import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import { loadData } from '../../../src/hooks/loadData';

const Popup = ({ handler }) => {
  const [popupImage, setPopupImage] = useState([]);
  const [trendingCourse, setTrendingCourse] = useState(null);

  useEffect(() => {
    // Check sessionStorage for cached data
    const cachedCourse = sessionStorage.getItem('trendingCourse');
    if (cachedCourse) {
      setTrendingCourse(JSON.parse(cachedCourse));
      return; // Stop further loading if data is found
    }

    // Load data if not cached
    loadData('popupImage', (data) => {
      setPopupImage(data);
      const foundCourse = data.find(
        (item) => item.id === 'fkmw579u5iajG01FzncO',
      );
      if (foundCourse) {
        setTrendingCourse(foundCourse);
        sessionStorage.setItem('trendingCourse', JSON.stringify(foundCourse));
      }
    });
  }, []);

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-[#0000008f] z-[1000] flex justify-center items-center overflow-scroll">
      <div className="max-h-[80%] w-[350px] md:w-[500px] lg:w-[600px] rounded-md relative flex items-center flex-col bg-cover">
        {trendingCourse && (
          <>
            <Image
              width={500}
              height={300}
              src={trendingCourse.photoUrl}
              alt="Popup img"
              className="rounded-lg w-[300px] md:w-[500px] lg:w-[600px]"
            />
            <Link href={trendingCourse.trendingCourseLink || '#'}>
              <button className="mt-3 relative px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-orange-500 to-pink-600 rounded-full shadow-lg hover:from-pink-600 hover:to-orange-500 focus:outline-none focus:ring-4 focus:ring-pink-300 transform transition-all duration-300 hover:scale-105 active:scale-95">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-600 to-pink-700 opacity-0 rounded-full transition-opacity duration-300 group-hover:opacity-100"></span>
                <span className="relative z-10">Know More</span>
              </button>
            </Link>
          </>
        )}
        <div className="absolute -top-3 md:-top-4 right-3 md:-right-4">
          <MdCancel
            onClick={() => handler(false)}
            className="text-2xl md:text-3xl cursor-pointer text-[#ff0066] rounded-full bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
