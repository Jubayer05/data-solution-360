/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';

import { Badge, Tooltip } from 'antd';
import { Bell, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useStateContext } from '../../../src/context/ContextProvider';
import { useNotifications } from '../../../src/context/NotificationContext';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import { useRouter } from 'next/router';
import { userNamePrefix } from '../../../src/data/data';

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
  const { notifications, unreadCount, markAsRead } = useNotifications(); // Add this
  const [insideCourse, setInsideCourse] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const previousUnreadCount = useRef(0);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside notification panel
      if (
        isNotificationOpen &&
        !event.target.closest('.notification-panel') &&
        !event.target.closest('.notification-trigger')
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotificationOpen]);

  useEffect(() => {
    if (unreadCount > previousUnreadCount.current) {
      const audio = new Audio('/mp3/notification-bell.mp3');
      audio.play().catch((error) => {
        // Handle any autoplay restrictions
        console.log('Audio autoplay failed:', error);
      });
    }
    previousUnreadCount.current = unreadCount;
  }, [unreadCount]);

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

  const handleNotificationClick = (e) => {
    e.preventDefault();
    setIsNotificationOpen(!isNotificationOpen);
  };

  function getInitials(name) {
    let words = name?.split(' ');
    words = words?.filter((word) => !userNamePrefix.includes(word));
    const initials = words?.map((word) => word.charAt(0)).join('');
    return initials?.toUpperCase();
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

        <div className="flex items-center">
          {/* Replace the existing notification section with this */}
          {findCurrentUser?.role !== 'student' && (
            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className="cursor-pointer mr-3 bg-hover_btn px-2 py-1 rounded flex items-center justify-center"
              >
                <Badge count={unreadCount}>
                  <Bell className="text-2xl" />
                </Badge>
              </button>

              {/* Notification Panel */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={() => markAllAsRead()}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => {
                            markAsRead(notification.id);
                            if (notification.leadId) {
                              // Navigate to lead details if needed
                              router.push(`/admin/lead-sells/sells-tracking`);
                            }
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <UserCircle className="h-8 w-8 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(
                                  notification.createdAt,
                                ).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

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
