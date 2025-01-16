import { Avatar } from 'antd';
import React, { useState } from 'react';

import {
  ChevronDown,
  ChevronRight,
  LogIn,
  LogOut,
  User,
  X,
} from 'lucide-react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { navDropItems, navItems } from '../../../src/data/data';
import LoginModal from '../../Login/LoginModal';

const Sidebar = ({
  url,
  setOpenNav,
  photoUrl,
  language,
  handleLogout,
  userEmail,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (itemId) => {
    setOpenDropdown(openDropdown === itemId ? null : itemId);
  };

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

  return (
    <div className="w-screen z-10 bg-[rgba(0,0,0,0.6)] h-screen fixed top-0 left-0">
      <div
        className="md:hidden z-20 fixed overflow-y-scroll bg-[#ffffff] w-[75%] -left-5 -top-5 
      pt-5 pb-2 h-[105vh]"
      >
        <div className="flex items-center justify-between pl-10 pr-3 pt-4">
          {photoUrl ? (
            <Avatar size={56} src={photoUrl} className="cursor-pointer" />
          ) : (
            <Avatar
              size={56}
              icon={<User />}
              style={{ display: 'flex', backgroundColor: '#3d9970' }}
              className="cursor-pointer flex justify-center items-center"
            />
          )}

          <X
            onClick={() => setOpenNav(false)}
            className="text-2xl text-[#333333]"
          />
        </div>

        <ul className="list-none pl-10 pr-5 pt-6 pb-4">
          {navItems.map((item) => (
            <li key={item.id}>
              {item.dropdown?.length > 0 ? (
                <>
                  <button
                    onClick={() => handleDropdownToggle(item.id)}
                    className={`${
                      openDropdown === item.id ? 'bg-[rgba(11,6,32,0.08)]' : ''
                    } text-[#333333] w-full font-semibold flex rounded-md justify-between items-center py-3 px-3 transition-all duration-300 ease-in-out`}
                  >
                    <span>
                      {language === 'English' ? item.title : item.titleBang}
                    </span>
                    {openDropdown === item.id ? (
                      <ChevronDown />
                    ) : (
                      <ChevronRight />
                    )}
                  </button>

                  {/* Display dropdown items when openDropdown matches the current item id */}
                  {openDropdown === item.id && (
                    <ul>
                      {item.dropdown.map((dropdownItem) => (
                        <li key={dropdownItem.id}>
                          <Link
                            href={dropdownItem.link}
                            className={`w-full font-semibold flex rounded-md justify-between items-center py-3 pr-3 pl-10
                           ${
                             url === dropdownItem.slug
                               ? 'text-[#333333] visited:text-[#333333] bg-[rgba(11,6,32,0.2)] '
                               : 'text-[#333333] visited:text-[#333333] '
                           }
                           my-1 `}
                          >
                            <span>
                              {language === 'English'
                                ? dropdownItem.title
                                : dropdownItem.titleBang}
                            </span>
                            <ChevronRight className="text-xl" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.link}
                  key={item.id}
                  className={`w-full font-semibold flex rounded-md justify-between items-center py-3 px-3
              ${
                url == item.slug
                  ? 'text-[#333333] visited:text-[#333333] bg-[rgba(11,6,32,0.2)] '
                  : 'text-[#333333] visited:text-[#333333] '
              } 
                my-1 `}
                >
                  <span>
                    {language === 'English' ? item.title : item.titleBang}
                  </span>
                  <ChevronRight className="text-xl" />
                </Link>
              )}
            </li>
          ))}
          {/* <div className="ml-[13px] mt-3 text-[#333333]">
            <span>Language &nbsp;</span>
            <Switch
              size={50}
              checkedChildren="en"
              unCheckedChildren="bn"
              defaultChecked
              onClick={() => setEng(!eng)}
            />
          </div> */}
        </ul>
        {userEmail && <div className="h-[1px] mb-4 bg-slate-300" />}

        <div className="pl-12 pr-6 pt-2 pb-4 ">
          {/* <h2 className="text-center text-xl">Profile</h2> */}
          {userEmail && (
            <h2 className="text-center text-xl text-[#333333]">More</h2>
          )}

          {/* NOTE: DROPDOWN */}
          {userEmail && (
            <ul className=" list-none pt-2 pb-4">
              {navDropItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.link}
                    className={`w-full font-semibold flex rounded-md justify-between items-center py-3 px-2
                  ${
                    url == item.slug
                      ? 'text-[#333333] visited:text-[#333333] bg-[rgba(100,64,251,0.2)] '
                      : 'text-[#333333] visited:text-[#333333] '
                  } 
                  my-1 `}
                  >
                    <span>
                      {language === 'English' ? item.title : item.titleBang}
                    </span>

                    <ChevronRight className="text-xl" />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* NOTE: LOGOUT */}
        </div>
        <div className={userEmail ? 'h-0' : 'h-36'} />
        <div className="pl-10 pr-5 pb-2">
          {userEmail ? (
            <button
              className="w-full flex rounded-md justify-between items-center py-3 px-6 
              my-1 mt-8 text-[#ffffff] bg-primary_btn"
              onClick={handleLogout}
            >
              <span className="font-bold">Logout</span>
              <LogOut className="text-lg" />
            </button>
          ) : (
            <div>
              <>
                <LoginModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
              </>
              <button
                onClick={() => openModal()}
                type="button"
                style={{
                  borderRadius: '5px',
                }}
                className={`w-full flex rounded-md font-bold justify-center items-center 
                  py-3 px-3 my-1 mt-8 text-[#fff] bg-secondary_btn`}
              >
                <LogIn className="text-sm" />{' '}
                <span
                  className={`pl-2 ${
                    language === 'English' ? 'font-body' : 'font-bangla'
                  }`}
                >
                  {language === 'English' ? 'Log in' : 'লগ ইন'}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
