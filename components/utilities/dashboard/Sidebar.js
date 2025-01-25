import { Collapse, ConfigProvider } from 'antd';
import { ChevronDown, ChevronRight, MenuIcon, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../../src/context/ContextProvider';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import { linksAdmin, linksStudents } from '../../../src/data/data';

const { Panel } = Collapse;

const Sidebar = ({ status }) => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContextDashboard();
  const { findCurrentUser } = useStateContext();
  const [url, setUrl] = useState('');
  const [currentPage, setCurrentPage] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const currentUrl = window.location.href.split('/');
    setCurrentPage(currentUrl.map((str) => str.toUpperCase()));
    setUrl(currentUrl[3]);
  }, []);

  useEffect(() => {
    // Adjust menu behavior based on screen size
    if (screenSize <= 900) {
      // Mobile screens
      setActiveMenu(isMobileMenuOpen);
    } else {
      // Desktop screens
      setActiveMenu(true);
      setIsMobileMenuOpen(false);
    }
  }, [screenSize, isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const renderLinks = (links) =>
    links.map((item) => (
      <div
        key={item.title}
        className={`text-gray-400 mt-1.5 uppercase ${
          activeMenu ? 'mx-2' : 'ml-2 mr-2'
        }`}
      >
        <Link
          href={`${item.link}`}
          onClick={closeMobileMenu}
          className={`flex items-center ${
            activeMenu
              ? 'justify-start pl-5 rounded-lg'
              : 'justify-center py-2 rounded'
          } ${
            currentPage.includes(item?.name?.split(' ').join('-').toUpperCase())
              ? 'bg-[#fecb6c55]'
              : ' '
          } gap-5 p-2 text-md text-gray-600 mx-1 hover:bg-[#fecb6c55]`}
        >
          <span className="text-xl">{item.icon}</span>
          {activeMenu && <span className="capitalize">{item.name}</span>}
        </Link>
      </div>
    ));

  const renderAdminLinks = () =>
    linksAdmin.map((item) => {
      const filteredLinks = item.links.filter((link) =>
        Array.isArray(link.role)
          ? link.role.includes(findCurrentUser?.role)
          : link.role === findCurrentUser?.role,
      );

      return (
        filteredLinks.length > 0 && (
          <div key={item.title} className={`${activeMenu ? 'mx-3' : 'm-0'}`}>
            <ConfigProvider>
              <Collapse
                collapsible="header"
                expandIconPosition="end"
                expandIcon={({ isActive }) =>
                  isActive ? (
                    <ChevronDown className="text-lg group-hover:text-blue-500 font-medium text-blue-500" />
                  ) : (
                    <ChevronRight className="text-lg group-hover:text-blue-500 font-medium" />
                  )
                }
                defaultActiveKey={['1']}
                ghost={true}
              >
                <Panel
                  className="text-base -mt-2 group"
                  header={
                    activeMenu ? (
                      <p className="transition duration-300 group-hover:text-blue-500 font-medium">
                        {item.title}
                      </p>
                    ) : null
                  }
                  key={item.id}
                >
                  {filteredLinks.map((link) => (
                    <Link
                      href={`${link.link}`}
                      key={link.name}
                      onClick={closeMobileMenu}
                      className={`flex items-center ${
                        activeMenu
                          ? 'justify-start pl-5 rounded-lg'
                          : 'justify-center py-2 rounded'
                      } ${
                        currentPage.includes(
                          link.name?.split(' ').join('-').toUpperCase(),
                        )
                          ? 'bg-[#fecb6c55]'
                          : ' '
                      } gap-5 p-2 text-md text-gray-600 mx-1 hover:bg-[#fecb6c55]`}
                    >
                      <span className="text-xl">{link.icon}</span>
                      {activeMenu && (
                        <span className="capitalize">{link.name}</span>
                      )}
                    </Link>
                  ))}
                </Panel>
              </Collapse>
            </ConfigProvider>
          </div>
        )
      );
    });

  return (
    <>
      {/* Mobile Menu Toggle */}
      {screenSize <= 900 && (
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={toggleMobileMenu}
            className="bg-gray-100 p-2 rounded-md"
          >
            {isMobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 
          w-64 lg:w-auto border-r-1
          bg-white 
          transform transition-transform duration-300
          ${
            screenSize <= 900
              ? isMobileMenuOpen
                ? 'translate-x-0'
                : '-translate-x-full'
              : 'translate-x-0'
          }
          overflow-hidden pb-10 h-screen
        `}
      >
        <div className="flex items-center gap-3 justify-between px-5 mt-4 border-dashboard_border pb-[13px]">
          {activeMenu && (
            <Link
              href="/"
              onClick={closeMobileMenu}
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

        <div className="w-64 h-[0.5px] mt-[1px] bg-gray-200" />

        <div className="mt-5">
          {url === 'students' ? renderLinks(linksStudents) : renderAdminLinks()}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
