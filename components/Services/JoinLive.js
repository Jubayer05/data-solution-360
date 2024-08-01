/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useState } from 'react';
import { MdOnlinePrediction } from 'react-icons/md';
import { useStateContext } from '../../src/context/ContextProvider';
import PhoneAuth from '../Login/PhoneLogin';

const JoinLive = () => {
  const { findCurrentUser } = useStateContext();
  const [hasZoomLink, setHasZoomLink] = useState(true);
  /*
   * Title: JOIN Live Class functionality
   * Description:
   * Author: Jubayer Ahmed
   * Date: 13 July, 2024
   *
   * 1. Create a new database for join live class
   * 2. Database will have each batch information
   * 3. Each batch will have a unique identifier
   * 4. Each batch will contain a images, join zoom link btn, Course title, class time
   * 5. If not authenticated then show the login button
   * 6. By clicking zoom links redirect zoom apps
   * 7. Handle Admin dashboard to manage it
   */
  return (
    <div className="max-w-5xl mx-auto my-20">
      <h2 className="text-2xl font-semibold">Join Live Class</h2>
      <hr className="mt-3" />
      <div className="flex gap-2 mt-10">
        <div className="w-[60%]">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/data-solution-360.appspot.com/o/courseImage%2Fsocialmedia46308%40gmail.com%2FData-Analytics-%26-Data-Science-2.png?alt=media&token=719bdc37-6747-4246-9de2-5227554d27a7"
            alt=""
            className="w-full object-cover rounded-xl"
          />
          <p className="text-lg font-bold mt-5">
            Mastering Social Media Banner Design: The Next Level
          </p>
          <div className="flex justify-between mt-3">
            <p className="bg-yellow-100 inline-block px-3 rounded-md">
              Social Media Banner Design 1
            </p>
            <p className="text-base font-medium">
              Class Time: <span className="text-primary">10PM - 11.30PM</span>
            </p>
          </div>
        </div>
        <div className="w-[40%]">
          <div className="border-l-[3px] border-[#000000] pl-5 py-2 rounded">
            <p className="font-semibold text-lg">
              Social Media Banner Design 1
            </p>
            <div className="flex mt-2 items-center gap-3">
              <p
                className="text-base flex justify-center items-center gap-2 px-2 rounded 
              bg-black text-white w-[30%]"
              >
                <MdOnlinePrediction /> Live Class
              </p>
              <p className="w-[70%]">
                {findCurrentUser?.email && hasZoomLink
                  ? 'Click this link to join the class.'
                  : findCurrentUser?.email && !hasZoomLink
                  ? 'Live class has ended. To see class recording click the following link.'
                  : 'Live class has ended. To see class recording please login.'}
              </p>
            </div>
          </div>
          {findCurrentUser?.email ? (
            <Link
              href={
                hasZoomLink ? 'https://zoom.us/' : '/students/class-joining'
              }
              className="flex justify-center items-center gap-2 bg-[#fecb63] hover:bg-[#e7b655] 
            font-semibold py-2 px-5 rounded transition-all duration-200 text-black visited:text-black mt-5"
            >
              {hasZoomLink ? 'Join Live' : 'Class Recording'}
            </Link>
          ) : (
            <div className="border mt-5 rounded pt-2 pb-5">
              <PhoneAuth />
              <p className="text-center font-semibold">
                For any help please call: +8801996104096{' '}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinLive;
