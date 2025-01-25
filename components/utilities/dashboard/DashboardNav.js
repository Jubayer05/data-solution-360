import { Badge, Drawer, Tooltip } from 'antd';
import { Bell, Menu, UserCircle, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useStateContext } from '../../../src/context/ContextProvider';
import { useNotifications } from '../../../src/context/NotificationContext';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import { userNamePrefix } from '../../../src/data/data';

const DashboardNavbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    screenSize,
    setScreenSize,
    enrolledCourse,
  } = useStateContextDashboard();
  const { userName, findCurrentUser } = useStateContext();
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();
  const [insideCourse, setInsideCourse] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const previousUnreadCount = useRef(0);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize(width);
      // Automatically close mobile menu on larger screens
      if (width > 900) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (unreadCount > previousUnreadCount.current) {
      const audio = new Audio('/mp3/notification-bell.mp3');
      audio.play().catch((error) => {
        console.log('Audio autoplay failed:', error);
      });
    }
    previousUnreadCount.current = unreadCount;
  }, [unreadCount]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const slug = window.location.href.split('/');
      setInsideCourse(
        enrolledCourse?.key &&
          slug.includes(enrolledCourse.key) &&
          slug.includes('my-course'),
      );
    }
  }, [enrolledCourse]);

  useEffect(() => {
    setActiveMenu(screenSize > 900);
  }, [screenSize]);

  function getInitials(name) {
    let words = name?.split(' ');
    words = words?.filter((word) => !userNamePrefix.includes(word));
    const initials = words?.map((word) => word.charAt(0)).join('');
    return initials?.toUpperCase();
  }

  const NotificationPanel = () => (
    <div className="absolute right-0 mt-2 w-80 max-w-[95vw] bg-white rounded-lg shadow-lg z-50 border border-gray-200">
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
          <div className="p-4 text-center text-gray-500">No notifications</div>
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
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div
      className={`
      fixed right-0 bg-white z-50 border-b border-dashboard_border 
      ${activeMenu ? 'w-[calc(100%-256px)]' : 'w-[calc(100%-72px)]'}
      ${screenSize <= 900 ? '!w-full' : ''}
    `}
    >
      <div className="flex justify-between items-center p-2 md:mx-6 relative">
        {/* Mobile Menu Toggle for Sidebar */}
        {screenSize <= 900 && (
          <button
            onClick={() => setActiveMenu(!activeMenu)}
            className="p-2 mr-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            {activeMenu ? <X /> : <Menu />}
          </button>
        )}

        {/* Course Info */}
        <div className="flex-grow overflow-x-auto">
          {enrolledCourse && insideCourse && (
            <div className="flex items-center gap-2 min-w-max">
              <Image
                width={500}
                height={300}
                src={enrolledCourse?.img}
                alt="Logo"
                className="h-10 w-20 rounded-md object-cover"
              />
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h4 className="text-sm sm:text-base font-heading font-semibold truncate">
                  {enrolledCourse?.title}
                </h4>
                <div className="flex gap-2 items-center flex-wrap">
                  <p
                    className="font-medium text-center leading-[19px] tracking-[0.02em] 
                    text-[11px] sm:text-[13px] bg-[#85ffc82d] px-2 py-0.5 rounded-2xl border border-[#3d9970]"
                  >
                    Batch-1
                  </p>
                  <p className="text-xs sm:text-sm text-[orangered] font-semibold">
                    {enrolledCourse?.status}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          {findCurrentUser?.role !== 'student' && (
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="cursor-pointer bg-hover_btn p-2 rounded flex items-center justify-center"
              >
                <Badge count={unreadCount}>
                  <Bell className="text-xl" />
                </Badge>
              </button>

              {screenSize > 640 && isNotificationOpen && <NotificationPanel />}

              {/* Mobile Notifications Drawer */}
              {screenSize <= 640 && (
                <Drawer
                  title="Notifications"
                  placement="right"
                  onClose={() => setIsNotificationOpen(false)}
                  open={isNotificationOpen}
                  width="100%"
                >
                  {notifications.length === 0 ? (
                    <div className="text-center text-gray-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => {
                          markAsRead(notification.id);
                          if (notification.leadId) {
                            router.push(`/admin/lead-sells/sells-tracking`);
                            setIsNotificationOpen(false);
                          }
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <UserCircle className="h-8 w-8 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-600">
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
                </Drawer>
              )}
            </div>
          )}

          {/* Profile */}
          <Tooltip title="Profile" color="#707070">
            <Link
              href={
                findCurrentUser?.role == 'student'
                  ? '/students/profile'
                  : '/admin/dashboard'
              }
            >
              <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
                <div className="border-[3px] border-[#0389d7] rounded-full">
                  {findCurrentUser?.photoUrl ? (
                    <Image
                      width={500}
                      height={300}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                      src={findCurrentUser?.photoUrl}
                      alt={userName}
                    />
                  ) : (
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex justify-center items-center font-semibold
                      bg-primary_btn text-white tracking-wider text-sm sm:text-base"
                    >
                      {getInitials(findCurrentUser?.full_name)}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
