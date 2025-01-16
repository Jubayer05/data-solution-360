import React, { useEffect, useState } from 'react';

import { getAuth, signOut } from 'firebase/auth';

import { Grid, Grid2X2Icon, Grid3X3, LogIn, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useStateContext } from '../../src/context/ContextProvider';
import { navItems, navItems2 } from '../../src/data/data';
import LoginModal from '../Login/LoginModal';
import Sidebar from './Home/SideBar';

const Navbar = ({ home }) => {
  const {
    language,
    setLanguage,
    userName,
    photoUrl,
    userEmail,
    findCurrentUser,
  } = useStateContext();
  const auth = getAuth();
  const [url, setUrl] = useState(null);
  const [openNav, setOpenNav] = useState(null);
  const [eng, setEng] = useState(true);
  const [scrolled80px, setScrolled80px] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    Swal.fire({
      // title: 'Are you sure?',
      text: 'Do you want to exit the login/register process?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Exit',
    }).then((result) => {
      if (result.isConfirmed) {
        setModalIsOpen(false);
      }
    });
  };

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY >= 80 && !scrolled80px) {
        setScrolled80px(true);
      } else if (window.scrollY < 80 && scrolled80px) {
        setScrolled80px(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled80px]);

  useEffect(() => {
    if (eng) {
      localStorage.setItem('lan', 'English');
      setLanguage('English');
    } else {
      localStorage.setItem('lan', 'বাংলা');
      setLanguage('বাংলা');
    }
  }, [eng]);

  console.log(findCurrentUser);

  useEffect(() => {
    const url = window.location.href.split('/').slice(-1)[0];
    setUrl(url);
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        window.location.reload();
      })
      .catch((error) => {
        alert('Can not logout');
      });
  };

  const onClick = () => {};

  return (
    <div
      className={`w-full md:text-center z-[900] px-5 pt-4 pb-3 md:px-4 md:py-0 ${
        scrolled80px ? 'bg-white shadow-lg' : ' bg-transparent '
      } sticky ${home ? 'top-14' : '-top-[1px]'}`}
    >
      <div className="max-w-6xl mx-auto md:flex md:justify-between md:items-center md:h-20">
        <div className="flex justify-between items-center z-[900]">
          <Link href="/">
            <Image
              width={500}
              height={300}
              src="/logo/logo_updated.png"
              className="h-16 w-[80px]"
              alt="logo"
              unoptimized={true}
            />
          </Link>
          <div className="flex items-center gap-5 md:hidden">
            {userEmail ? (
              <div>
                <Link
                  href={
                    findCurrentUser?.role === 'student'
                      ? '/students/dashboard'
                      : '/admin/dashboard'
                  }
                >
                  <button
                    className="px-4 py-[10px] bg-primary_btn text-white rounded-lg flex items-center
      justify-center gap-2 text-sm"
                  >
                    Dashboard <Grid2X2Icon />
                  </button>
                </Link>
              </div>
            ) : (
              <button
                onClick={() => openModal()}
                className="relative px-8 py-[10px] font-bold text-white bg-gradient-to-r from-orange-500 to-pink-600 
              rounded-full shadow-lg hover:from-pink-600 hover:to-orange-500 focus:outline-none focus:ring-4 
              focus:ring-pink-300 transform transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-600 to-pink-700 
              opacity-0 rounded-full transition-opacity duration-300 group-hover:opacity-100"
                ></span>
                <span className="relative z-10">Login</span>
              </button>
            )}

            <Menu
              onClick={() => setOpenNav(true)}
              className="text-2xl text-nav"
            />
          </div>
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
            userEmail={userEmail}
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
                            <Grid />
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
              </ul>
            </div>

            {!userEmail && !modalIsOpen ? (
              <button
                onClick={() => openModal()}
                type="button"
                style={{
                  borderRadius: '5px',
                }}
                className={`text-md px-3 py-2 hover:drop-shadow-xl flex items-center text-white 
            bg-primary-bg transition-all duration-300 ease-linear hover:bg-white capitalize font-semibold
             hover:text-primary hover:border-primary`}
              >
                <LogIn className="text-sm" />
                <span
                  className={`pl-2 ${
                    language === 'English' ? 'font-body' : 'font-bangla'
                  }`}
                >
                  {language === 'English' ? 'Log in' : 'লগ ইন'}
                </span>
              </button>
            ) : userEmail ? (
              <div>
                <Link
                  href={
                    findCurrentUser?.role === 'student'
                      ? '/students/dashboard'
                      : findCurrentUser?.role === 'lead_member'
                      ? '/admin/lead-sells/lead-tracking'
                      : '/admin/dashboard'
                  }
                >
                  <button
                    className="px-4 py-3 bg-primary_btn text-white rounded-lg flex items-center
      justify-center gap-2"
                  >
                    Dashboard <Grid3X3 />
                  </button>
                </Link>
              </div>
            ) : null}
            <LoginModal
              modalIsOpen={modalIsOpen}
              closeModal={() => {
                closeModal();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
