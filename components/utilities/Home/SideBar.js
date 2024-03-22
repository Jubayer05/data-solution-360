import { Avatar, Switch } from 'antd';
import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import {
  BiChevronRight,
  BiSolidChevronDown,
  BiSolidChevronRight,
} from 'react-icons/bi';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

import Link from 'next/link';
import { navDropItems, navItems } from '../../../src/data/data';

const Sidebar = ({
  url,
  setOpenNav,
  eng,
  setEng,
  photoUrl,
  language,
  handleLogout,
  userName,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (itemId) => {
    setOpenDropdown(openDropdown === itemId ? null : itemId);
  };

  return (
    <div className="w-screen z-10 bg-[rgba(0,0,0,0.6)] h-screen fixed top-0 left-0">
      <div
        className="block md:hidden z-20 fixed overflow-y-scroll bg-[#ffffff] w-9/12 -left-6 -top-5 
      pt-5 pb-2 h-[105vh]"
      >
        <div className="flex items-center justify-between pl-10 pr-3 pt-4">
          {photoUrl ? (
            <Avatar size={56} src={photoUrl} className="cursor-pointer" />
          ) : (
            <Avatar
              size={56}
              icon={<AiOutlineUser />}
              style={{ display: 'flex' }}
              className="cursor-pointer flex justify-center items-center"
            />
          )}

          <MdClose
            onClick={() => setOpenNav(false)}
            className="text-2xl text-[#333333]"
          />
        </div>

        <ul className=" list-none pl-12 pr-6 pt-6 pb-4">
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
                      <BiSolidChevronDown />
                    ) : (
                      <BiSolidChevronRight />
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
                            <BiChevronRight className="text-xl" />
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
                  <BiChevronRight className="text-xl" />
                </Link>
              )}
            </li>
          ))}
          <div className="ml-[13px] mt-3 text-[#333333]">
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
          {/* <h2 className="text-center text-xl">Profile</h2> */}
          <h2 className="text-center text-xl text-[#333333]">More</h2>

          {/* NOTE: DROPDOWN */}
          <ul className=" list-none pt-2 pb-4">
            {navDropItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  className={`w-full font-semibold flex rounded-md justify-between items-center py-3 px-3
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

                  <BiChevronRight className="text-xl" />
                </Link>
              </li>
            ))}
          </ul>

          {/* NOTE: LOGOUT */}
          {userName ? (
            <button
              className="w-full flex rounded-md justify-between items-center py-3 px-3 
              my-1 mt-20 text-[#333333] bg-[rgba(0,0,0,0.2)]"
              onClick={handleLogout}
            >
              <span className="font-bold">Logout</span>
              <FiLogOut className="text-lg" />
            </button>
          ) : (
            <Link href="/login">
              <button
                type="button"
                style={{
                  borderRadius: '5px',
                }}
                className={`w-full flex rounded-md font-bold justify-center items-center py-3 px-3 my-1 mt-20 text-[#fff] 
                bg-[rgba(40,97,51,0.2)]`}
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
  );
};

export default Sidebar;
