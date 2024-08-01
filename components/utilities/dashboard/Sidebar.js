/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineMenuFold } from 'react-icons/ai';

import { Tooltip } from 'antd';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import { linksAdmin, linksStudents } from '../../../src/data/dummy';

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContextDashboard();
  const [url, setUrl] = useState('');
  useEffect(() => {
    const url = window.location.href.split('/');
    setUrl(url[3]);
  }, []);

  const handleCloseMenu = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  return (
    <div className="md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 h-screen">
      <>
        <div
          className={`flex items-center ${
            activeMenu ? 'justify-start px-5' : 'justify-center'
          } mt-4 border-b border-dashboard_border pb-[13px]`}
        >
          <Tooltip title="Menu" color="#707070">
            <button
              className={`text-2xl bg-[#f3f4f7] p-2 rounded transition-all duration-[400ms] ease-linear ${
                activeMenu ? '' : 'rotate-180'
              }`}
              onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
            >
              <AiOutlineMenuFold />
            </button>
          </Tooltip>

          {activeMenu && (
            <Link
              href="/"
              onClick={handleCloseMenu}
              className="items-center gap-3 ml-3 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <img src="/logo/logo_dashboard.png" className="w-32" alt="" />
            </Link>
          )}
        </div>

        <div className="mt-10">
          {url == 'students'
            ? linksStudents.map((item) => (
                <div
                  className={`text-gray-400 mt-1.5 uppercase ${
                    activeMenu ? 'mx-2' : 'ml-2 mr-2'
                  }`}
                  key={item.title}
                >
                  <Link
                    href={`${item.link}`}
                    key={item.name}
                    onClick={handleCloseMenu}
                    className={`flex items-center ${
                      activeMenu
                        ? 'justify-start pl-5 rounded-lg'
                        : 'justify-center py-2 rounded'
                    } gap-5 p-2 text-md text-gray-600 mx-1 hover:bg-[#fecb6c3a]`}
                  >
                    <span className="text-xl"> {item.icon}</span>
                    {activeMenu && (
                      <span className="capitalize">{item.name}</span>
                    )}
                  </Link>
                </div>
              ))
            : linksAdmin.map((item) => (
                <div
                  className={`text-gray-400  mt-4 uppercase ${
                    activeMenu ? 'm-3' : 'm-0'
                  }`}
                  key={item.title}
                >
                  <p
                    className={`text-gray-400  mt-4 uppercase ${
                      activeMenu ? 'm-3' : 'm-0'
                    }`}
                  >
                    {item.title}
                  </p>
                  {item.links.map((link) => (
                    <Link
                      href={`${link.link}`}
                      key={link.name}
                      onClick={handleCloseMenu}
                      className={`flex items-center ${
                        activeMenu
                          ? 'justify-start pl-5 rounded-lg'
                          : 'justify-center py-2 rounded'
                      } gap-5 p-2 text-md text-gray-600 mx-1 hover:bg-link_bg`}
                    >
                      <span className="text-xl"> {link.icon}</span>
                      {activeMenu && (
                        <span className="capitalize">{link.name}</span>
                      )}
                    </Link>
                  ))}
                </div>
              ))}
        </div>
      </>
    </div>
  );
};

export default Sidebar;
