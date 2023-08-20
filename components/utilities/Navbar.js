/* eslint-disable @next/next/no-img-element */
import { Avatar, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { VscTriangleUp } from 'react-icons/vsc';

import { getAuth, signOut } from 'firebase/auth';

import Link from 'next/link';
import { useStateContext } from '../../src/context/ContextProvider';
import { navDropItems, navItems, navItems2 } from '../../src/data/data';
import styles from '../../styles/utility/Navbar.module.css';

const Navbar = ({ home }) => {
  const { language, setLanguage, userName, findAdmin, photoUrl } =
    useStateContext();
  const auth = getAuth();
  const user = auth.currentUser;
  // const [scroll, setScroll] = useState(false);
  const [url, setUrl] = useState(null);
  const [openNav, setOpenNav] = useState(null);
  const [eng, setEng] = useState(true);

  console.log(user?.photoURL);

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
    console.log('Hello');
    signOut(auth)
      .then(() => {
        localStorage.clear();
        window.location.reload();
      })
      .catch((error) => {
        alert('Can not logout');
      });
  };

  console.log(photoUrl);

  return (
    <div
      className={`w-full border-b-1 border-[rgb(79,91,140)] md:text-center z-10 px-5 pt-4 pb-3 md:px-4 md:py-0 bg-[rgb(38,52,110)] sticky ${
        home ? 'top-14' : 'top-0'
      }`}
    >
      <div className="max-w-7xl mx-auto md:flex md:justify-between md:items-center md:h-16 ">
        <div className="flex justify-between items-center z-10">
          <Link href="/">
            <img src="/logo/logo-white.png" className="h-16" alt="logo" />
          </Link>
          <HiOutlineMenuAlt1
            onClick={() => setOpenNav(true)}
            className="text-2xl md:hidden text-white"
          />
        </div>
        {openNav && (
          <Sidebar
            openNav={openNav}
            setOpenNav={setOpenNav}
            eng={eng}
            setEng={setEng}
            url={url}
            photoUrl={photoUrl}
          />
        )}
        <div
          className={`hidden bg-white pt-4 md:pt-0 md:flex-1 md:justify-between md:flex md:items-center 
                    md:bg-transparent md:pb-0 pb-12 md:static md:z-auto z-[-1] left-0 w-full 
                    md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
                      openNav ? 'top-16 ' : 'top-[-490px]'
                    }`}
        >
          <div>
            <ul className="pl-4 md:inline-flex md:justify-between mb-0">
              {navItems2.map((item) => (
                <li key={item.id} className="">
                  <Link
                    href={item?.link}
                    className={`${
                      language === 'English' ? 'font-body' : 'font-bangla'
                    } cursor-pointer font-medium  
                       ${
                         url == item.slug
                           ? 'text-[#61CE70] visited:text-[#61CE70] bg-[rgba(0,0,0,0.3)] '
                           : 'text-white visited:text-white'
                       } px-4 py-3 hover:bg-[rgba(0,0,0,0.3)] transition-all 
                      duration-500 rounded-md hover:text-[#61CE70] `}
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
              <ul className="pl-8 md:inline-flex md:justify-between mb-0">
                {navItems.map((item) => (
                  <li key={item.id} className="">
                    <Link
                      href={item?.link}
                      className={`${
                        language === 'English' ? 'font-body' : 'font-bangla'
                      } cursor-pointer font-medium  
                       ${
                         url == item.slug
                           ? 'text-[#61CE70] visited:text-[#61CE70] bg-[rgba(0,0,0,0.3)] '
                           : 'text-white visited:text-white'
                       } px-4 py-3 hover:bg-[rgba(0,0,0,0.3)] transition-all 
                      duration-500 rounded-md hover:text-[#61CE70] `}
                    >
                      {language === 'English' ? item.title : item.titleBang}
                    </Link>
                  </li>
                ))}
                {findAdmin && (
                  <li className="">
                    <Link
                      href="/admin/dashboard"
                      className={`${
                        language === 'English' ? 'font-body' : 'font-bangla'
                      } cursor-pointer font-medium visited:text-white text-white 
                        px-4 py-3 hover:bg-[rgba(0,0,0,0.3)] rounded-md hover:text-[#61CE70]`}
                    >
                      {language === 'English' ? 'Dashboard' : 'ড্যাশবোর্ড'}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="mr-3">
              <Switch
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
                  src={
                    user?.photoURL ||
                    'https://lh3.googleusercontent.com/a/AEdFTp6la6cinLFex3jaJIjVsSizEDeTo8nl5dBrSFwCiw=s96-c'
                  }
                  className="cursor-pointer"
                />

                <div
                  className={`${styles.dropdown__content} absolute z-10 bg-white shadow-2xl top-[80px] -right-4 w-[240px] pt-5 pb-2 px-8 rounded-lg`}
                >
                  <div className="relative">
                    <VscTriangleUp className="absolute top-[-39px] -right-2 text-white text-3xl" />
                    <ul>
                      {navDropItems.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={item.link}
                            className={`block font-semibold rounded-md py-3 cursor-pointer hover:text-white px-4 hover:bg-[rgb(32,52,110)]
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
                      <li className="py-3 mt-2 bg-primary-bg hover:bg-[rgb(32,52,110)] flex items-center justify-center text-white rounded-md cursor-pointer hover:text-white px-4">
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
                            {language === 'English' ? 'Logout' : 'লগ ইন'}
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
                          bg-primary-bg transition-all duration-300 ease-linear hover:bg-white
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

const Sidebar = ({ url, setOpenNav, eng, setEng, photoUrl }) => {
  return (
    <div className="w-screen z-10 bg-[rgba(0,0,0,0.6)] h-screen fixed top-0 left-0">
      <div
        className="block md:hidden z-20 fixed overflow-y-scroll bg-white w-9/12 -left-6 -top-5 
      pt-5 pb-2 h-[105vh]"
      >
        <div className="flex items-center justify-between pl-10 pr-3 pt-4">
          <Avatar size={56} src={photoUrl} className="cursor-pointer" />
          <MdClose
            onClick={() => setOpenNav(false)}
            className="text-2xl text-[#fb4050]"
          />
        </div>

        <ul className="pl-12 pr-6 pt-6 pb-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                key={item.id}
                className={`w-full font-semibold flex rounded-md justify-between items-center py-3 px-3
            ${
              url == item.slug
                ? 'text-[#6440fb] visited:text-[#6440fb] bg-[rgba(100,64,251,0.2)] '
                : 'text-[#140342] visited:text-[#140342] '
            } 
              my-1 `}
              >
                <span>{item.title}</span>
                <BiChevronRight className="text-xl" />
              </Link>
            </li>
          ))}
          <div className="ml-[13px] mt-3">
            <span>Language &nbsp;</span>
            <Switch
              size={50}
              checkedChildren="en"
              unCheckedChildren="bn"
              defaultChecked
              onClick={() => setEng(!eng)}
            />
          </div>
        </ul>
        <div className="h-[1px] mb-4 bg-slate-300" />

        <div className="pl-12 pr-6 pt-2 pb-4">
          <h2 className="text-center text-xl">Profile</h2>

          {/* NOTE: DROPDOWN */}
          <ul className="pt-2 pb-4">
            {navDropItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  className={`w-full font-semibold flex rounded-md justify-between items-center py-3 px-3
                  ${
                    url == item.slug
                      ? 'text-[#6440fb] visited:text-[#6440fb] bg-[rgba(100,64,251,0.2)] '
                      : 'text-[#140342] visited:text-[#140342] '
                  } 
                  my-1 `}
                >
                  <span>{item.title}</span>
                  <BiChevronRight className="text-xl" />
                </Link>
              </li>
            ))}
          </ul>

          {/* NOTE: LOGOUT */}
          <button
            className="w-full flex rounded-md justify-between items-center py-3 px-3 my-1 mt-20 text-[#fb407e] 
          bg-[rgba(246,108,122,0.2)]"
          >
            <span className="font-bold">Logout</span>
            <FiLogOut className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};
