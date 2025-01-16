/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { Badge, Tooltip } from 'antd';
import { Bell } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useStateContext } from '../../../src/context/ContextProvider';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import { userNamePrefix } from '../../../src/data/data';
// import { useStateContext } from "../../src/context/UtilitiesContext";

// const NavButton = ({ title, link, customFunc, icon, color, dotColor }) => {
//   return (
//     <Tooltip title={title} color="#707070">
//       <button
//         type="button"
//         style={{ color }}
//         className="relative text-xl rounded-full p-3 hover:bg-light-gray"
//         onClick={customFunc}
//       >
//         <span
//           style={{ background: dotColor }}
//           className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
//         />
//         {icon}
//       </button>
//     </Tooltip>
//   );
// };

const DashboardNavbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    handleClick,
    screenSize,
    setScreenSize,
    enrolledCourse,
  } = useStateContextDashboard();
  const { userName, findCurrentUser } = useStateContext();
  const [insideCourse, setInsideCourse] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const slug = window.location.href.split('/');
      if (slug.includes(enrolledCourse?.key)) {
        setInsideCourse(slug.includes('my-course'));
      } else {
        setInsideCourse(false);
      }
    }
  }, [enrolledCourse]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  function getInitials(name) {
    // Split the name into an array of words
    let words = name?.split(' ');

    // Filter out the prefixes from the words array
    words = words?.filter((word) => !userNamePrefix.includes(word));

    // Extract the first letter of each remaining word and join them together
    const initials = words?.map((word) => word.charAt(0)).join('');

    return initials?.toUpperCase(); // Ensure the initials are in uppercase
  }

  return (
    <div
      className={`border-b border-dashboard_border fixed right-0 bg-white z-50 ${
        activeMenu ? 'w-[calc(100%-256px)]' : 'w-[calc(100%-72px)]'
      }`}
    >
      <div className="flex justify-between items-center p-2 md:mx-6 relative ">
        <div>
          {enrolledCourse && insideCourse && (
            <div className="flex items-center gap-2">
              <Image
                width={500}
                height={300}
                src={enrolledCourse?.img}
                alt="Logo"
                className="h-12 w-24 rounded-md"
              />
              <div className="">
                <h4 className="text-base font-heading font-semibold">
                  {enrolledCourse?.title}
                </h4>
                <div className="flex gap-2 items-center ">
                  <p
                    className="font-medium text-center leading-[19px] tracking-[0.02em] 
        text-[13px] bg-[#85ffc82d] px-2 py-0.5 rounded-2xl border border-[#3d9970]"
                  >
                    Batch-1
                  </p>
                  <p className="text-sm text-[orangered] font-semibold">
                    {enrolledCourse?.status}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center ">
          <Link href="/students/notification">
            <div className="cursor-pointer mr-3 bg-hover_btn px-2 py-1 rounded">
              <Badge count={5}>
                <Bell className="text-2xl" />
              </Badge>
            </div>
          </Link>
          <Tooltip title="Profile" color="#707070">
            <Link
              href={
                findCurrentUser?.role == 'student'
                  ? '/students/profile'
                  : '/admin/dashboard'
              }
            >
              <div className="ml-2 flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
                <div className="flex items-center">
                  <div className="border-[3px] border-[#0389d7] rounded-full flex items-center justify-center">
                    {findCurrentUser?.photoUrl ? (
                      <Image
                        width={500}
                        height={300}
                        className="w-[40px] h-[40px] rounded-full"
                        src={findCurrentUser?.photoUrl}
                        alt={userName}
                      />
                    ) : (
                      <div
                        className="w-[40px] h-[40px] rounded-full flex justify-center items-center font-semibold
                    bg-primary_btn text-white tracking-wider"
                      >
                        {' '}
                        {getInitials(findCurrentUser?.full_name)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-800 font-bold ml-1 text-14 mb-0"></p>
                    {/* <p className="text-gray-500 font-bold ml-1 text-[10px] mb-0">
                    @{uniqueUserName}
                    </p> */}
                  </div>
                </div>
              </div>
            </Link>
          </Tooltip>

          {/* {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />} */}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
