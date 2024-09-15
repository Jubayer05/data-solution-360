import { Collapse, ConfigProvider } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineMenuFold } from 'react-icons/ai';
const { Panel } = Collapse;

import { Tooltip } from 'antd';
import Image from 'next/image';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import { linksAdmin, linksStudents } from '../../../src/data/data';
// import '../../../styles/utility/Sidebar.css';

const Sidebar = ({ status }) => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContextDashboard();
  const [url, setUrl] = useState('');
  const [currentPage, setCurrentPage] = useState([]);
  useEffect(() => {
    const url = window.location.href.split('/');
    setCurrentPage(url.map((str) => str.toUpperCase()));
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
          className={`flex items-center gap-3 ${
            activeMenu && status === 'admin'
              ? 'justify-center px-5'
              : activeMenu && status === 'student'
              ? 'justify-start px-5'
              : 'justify-center'
          } mt-4 border-b border-dashboard_border pb-[13px]`}
        >
          {status == 'student' && (
            <Tooltip title="Menu" color="#707070">
              <button
                className={`text-2xl bg-[#f3f4f7] p-2 rounded transition-all duration-[400ms] ease-linear ${
                  activeMenu ? '' : 'rotate-180'
                }`}
                onClick={() =>
                  setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                }
              >
                <AiOutlineMenuFold />
              </button>
            </Tooltip>
          )}

          {activeMenu && (
            <Link
              href="/"
              onClick={handleCloseMenu}
              className="items-center gap-3 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <Image
                width={500}
                height={300}
                src="/logo/logo_dashboard.png"
                className="w-32"
                alt=""
              />
            </Link>
          )}
        </div>

        <div className="mt-5">
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
                    } ${
                      currentPage.includes(
                        item?.name?.split(' ').join('-').toUpperCase(),
                      )
                        ? 'bg-[#fecb6c55]'
                        : ' '
                    } gap-5 p-2 text-md text-gray-600 mx-1 hover:bg-[#fecb6c55]`}
                  >
                    <span className="text-xl"> {item.icon}</span>
                    {activeMenu && (
                      <span className="capitalize">{item.name} </span>
                    )}
                  </Link>
                </div>
              ))
            : linksAdmin.map((item) => (
                <div
                  className={`${activeMenu ? 'mx-3' : 'm-0'}`}
                  key={item.title}
                >
                  <ConfigProvider
                    theme={{
                      components: {
                        Collapse: {
                          border: '1px solid #000000',

                          /* here is your component tokens */
                        },
                        Panel: {},
                      },
                    }}
                  >
                    <Collapse
                      collapsible="header"
                      expandIconPosition="end"
                      expandIcon={({ isActive, key }) =>
                        isActive ? (
                          <div>
                            <FaAngleDown className="text-lg group-hover:text-blue-500 font-medium text-blue-500" />
                          </div>
                        ) : (
                          <div>
                            <FaAngleRight className="text-lg group-hover:text-blue-500 font-medium" />
                          </div>
                        )
                      }
                      defaultActiveKey={['1']}
                      ghost={true}
                    >
                      <Panel
                        className="text-base -mt-2 group"
                        header={
                          <p className="transition duration-300 group-hover:text-blue-500 font-medium">
                            {item.title}
                          </p>
                        }
                        key={item.id}
                      >
                        {item.links.map((link) => (
                          <Link
                            href={`${link.link}`}
                            key={link.name}
                            onClick={handleCloseMenu}
                            className={`flex items-center ${
                              activeMenu
                                ? 'justify-start pl-5 rounded-lg'
                                : 'justify-center py-2 rounded'
                            } ${
                              currentPage.includes(
                                item?.name?.split(' ').join('-').toUpperCase(),
                              )
                                ? 'bg-[#fecb6c55]'
                                : ' '
                            } gap-5 p-2 text-md text-gray-600 mx-1 hover:bg-[#fecb6c55]`}
                          >
                            <span className="text-xl"> {link.icon}</span>
                            {activeMenu && (
                              <span className="capitalize">{link.name}</span>
                            )}
                          </Link>
                        ))}
                      </Panel>
                    </Collapse>
                  </ConfigProvider>
                </div>
              ))}
        </div>
      </>
    </div>
  );
};

export default Sidebar;
