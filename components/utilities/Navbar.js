/* eslint-disable @next/next/no-img-element */
import { Avatar, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { VscTriangleUp } from 'react-icons/vsc';

import { getAuth, signOut } from 'firebase/auth';

import Link from 'next/link';
import { BiSolidChevronRight } from 'react-icons/bi';
import { useStateContext } from '../../src/context/ContextProvider';
import { navDropItems, navItems, navItems2 } from '../../src/data/data';
import styles from '../../styles/utility/Navbar.module.css';
import Sidebar from './Home/SideBar';

const Navbar = ({ home }) => {
  const { language, setLanguage, userName, findAdmin, photoUrl } =
    useStateContext();
  const auth = getAuth();
  const user = auth.currentUser;
  const [url, setUrl] = useState(null);
  const [openNav, setOpenNav] = useState(null);
  const [eng, setEng] = useState(true);
  const [scrolled80px, setScrolled80px] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY >= 80 && !scrolled80px) {
        console.log('Scroll 80px successful');
        setScrolled80px(true);
      } else if (window.scrollY < 80 && scrolled80px) {
        console.log('Scrolled back to the top');
        setScrolled80px(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled80px]);

  console.log(scrolled80px);

  useEffect(() => {
    if (eng) {
      localStorage.setItem('lan', 'English');
      setLanguage('English');
    } else {
      localStorage.setItem('lan', 'বাংলা');
      setLanguage('বাংলা');
    }
  }, [eng]);

  useEffect(() => {
    const url = window.location.href.split('/').slice(-1)[0];
    setUrl(url);
  }, []);

  const handleLogout = () => {
    // console.log('Hello');
    signOut(auth)
      .then(() => {
        localStorage.clear();
        window.location.reload();
      })
      .catch((error) => {
        alert('Can not logout');
      });
  };

  // console.log(photoUrl);

  return (
    <div
      className={`w-full md:text-center z-50 px-5 pt-4 pb-3 md:px-4 md:py-0 ${
        scrolled80px ? 'bg-white shadow-lg' : ' bg-transparent '
      } sticky ${home ? 'top-14' : 'top-0'}`}
    >
      <div className="max-w-6xl mx-auto md:flex md:justify-between md:items-center md:h-20">
        <div className="flex justify-between items-center z-50">
          <Link href="/">
            <img src="/logo/logo.png" className="h-16 " alt="logo" />
          </Link>
          <HiOutlineMenuAlt1
            onClick={() => setOpenNav(true)}
            className="text-2xl md:hidden text-nav"
          />
        </div>
        {openNav && (
          <Sidebar
            openNav={openNav}
            handleLogout={handleLogout}
            setOpenNav={setOpenNav}
            eng={eng}
            setEng={setEng}
            url={url}
            photoUrl={photoUrl}
            language={language}
            userName={userName}
          />
        )}
        <div
          className={`hidden bg-white pt-4 md:pt-0 md:flex-1 md:justify-between md:flex md:items-center 
                    md:bg-transparent md:pb-0 pb-12 md:static md:z-auto z-[-1] left-0 w-full 
                    md:w-auto md:pl-0 pl-9 transition-all duration-500  ease-in ${
                      openNav ? 'top-16 ' : 'top-[-490px]'
                    }`}
        >
          <div>
            <ul className="pl-4 md:inline-flex md:justify-between mb-0 list-none">
              {navItems2.map((item) => (
                <li key={item.id} className="mx-1 ">
                  <Link
                    href={item?.link}
                    className={`${
                      language === 'English' ? 'font-body' : 'font-bangla'
                    } cursor-pointer font-semibold tracking-[0.02em] capitalize
                       ${
                         url == item.slug
                           ? 'text-nav visited:text-nav  '
                           : 'text-nav visited:text-nav'
                       }  px-2 py-1 transition-all 
                      duration-500 rounded-md hover:text-primary`}
                  >
                    {language === 'English' ? item.title : item.titleBang}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side */}
          <div className="md:flex md:items-center">
            <div>
              <ul className="pl-8 md:inline-flex md:justify-between mb-0 list-none">
                {navItems.map((item) => (
                  <div className="relative group" key={item.id}>
                    <li className="mx-1">
                      <Link
                        href={item?.link}
                        className={`cursor-pointer font-semibold tracking-[0.02em]
                       ${
                         url == item.slug
                           ? 'text-nav visited:text-nav  '
                           : 'text-nav visited:text-nav'
                       } capitalize px-2 py-1 transition-all 
                      duration-500 rounded-md hover:text-primary flex items-center  `}
                      >
                        <span
                          className={`${
                            language === 'English' ? 'font-body' : 'font-bangla'
                          }`}
                        >
                          {language === 'English' ? item.title : item.titleBang}
                        </span>
                        {item.dropdown?.length > 0 && (
                          <span className="fort-bold text-xl -mt-0.5">
                            <BiSolidChevronRight />
                          </span>
                        )}
                      </Link>
                    </li>
                    {item.dropdown?.length > 0 && (
                      <div className="absolute hidden group-hover:block bg-white mt-0 border-t-4 border-[#0a5] py-2 w-52 rounded shadow-lg text-left font-semibold tracking-[0.02em] capitalize">
                        {item.dropdown.map((dropItem) => (
                          <Link
                            key={dropItem.id}
                            href={dropItem.link}
                            className={`block px-2 py-3 text-gray-800 hover:text-blue-600 ${
                              language === 'English'
                                ? 'font-body'
                                : 'font-bangla'
                            }
                            `}
                          >
                            {dropItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {findAdmin && (
                  <li className="">
                    <Link
                      href="/admin/dashboard"
                      className={`${
                        language === 'English' ? 'font-body' : 'font-bangla'
                      } cursor-pointer font-semibold tracking-[0.02em]
                      capitalize px-2 py-1 transition-all 
                      duration-500 rounded-md text-nav hover:text-primary visited:text-nav flex items-center`}
                    >
                      {language === 'English' ? 'Dashboard' : 'ড্যাশবোর্ড'}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="mr-3">
              <Switch
                handleBg="#d6295f"
                size={50}
                checkedChildren="en"
                unCheckedChildren="bn"
                defaultChecked
                onClick={() => setEng(!eng)}
              />
            </div>

            {userName ? (
              <div
                className={`${styles.dropdown__container} relative font-semibold text-left mr-4 py-4`}
              >
                <Avatar
                  size={48}
                  src={user?.photoURL || ''}
                  className="cursor-pointer"
                />

                <div
                  className={`${styles.dropdown__content} absolute z-50 bg-white shadow-2xl top-[80px] -right-4 w-[240px] pt-5 pb-2 px-8 rounded-lg`}
                >
                  <div className="relative">
                    <VscTriangleUp className="absolute top-[-39px] -right-2 text-nav text-3xl" />
                    <ul className="list-none">
                      {navDropItems.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={item.link}
                            className={`block font-semibold rounded-md py-3 cursor-pointer hover:text-navWhite px-4 hover:bg-[rgb(32,52,110)]
                  ${
                    url == item.slug
                      ? 'text-[#6440fb] visited:text-[#6440fb] bg-[rgba(100,64,251,0.2)] '
                      : 'text-[#140342] visited:text-[#140342] '
                  }`}
                          >
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      ))}
                      <li className="py-3 mt-2 bg-primary-bg hover:bg-[rgb(32,52,110)] flex items-center justify-center text-nav rounded-md cursor-pointer hover:text-navWhite px-4">
                        <button
                          type="button"
                          className={`text-md px-3 hover:drop-shadow-xl flex items-center justify-center text-gray-300 
                        transition-all duration-300 ease-linear
                        `}
                          onClick={handleLogout}
                        >
                          <FiLogOut className="text-sm" />{' '}
                          <span
                            className={`pl-2 ${
                              language === 'English'
                                ? 'font-body'
                                : 'font-bangla'
                            }`}
                          >
                            {language === 'English' ? 'Logout' : 'লগ আউট'}
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login">
                <button
                  type="button"
                  style={{
                    borderRadius: '5px',
                  }}
                  className={`text-md px-3 py-2 hover:drop-shadow-xl flex items-center text-gray-300 
                          bg-primary-bg transition-all duration-300 ease-linear hover:bg-white capitalize font-semibold
                           hover:text-primary hover:border-primary`}
                  onClick={() => {}}
                >
                  <FiLogIn className="text-sm" />{' '}
                  <span
                    className={`pl-2 ${
                      language === 'English' ? 'font-body' : 'font-bangla'
                    }`}
                  >
                    {language === 'English' ? 'Log in' : 'লগ ইন'}
                  </span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
