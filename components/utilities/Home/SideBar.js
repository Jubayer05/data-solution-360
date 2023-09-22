import { Avatar, Switch } from 'antd';
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BiChevronRight } from 'react-icons/bi';
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
  return (
    <div className="w-screen z-10 bg-[rgba(0,0,0,0.6)] h-screen fixed top-0 left-0">
      <div
        className="block md:hidden z-20 fixed overflow-y-scroll bg-white w-9/12 -left-6 -top-5 
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
                <span>
                  {language === 'English' ? item.title : item.titleBang}
                </span>
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
          {/* <h2 className="text-center text-xl">Profile</h2> */}
          <h2 className="text-center text-xl">More</h2>

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
              className="w-full flex rounded-md justify-between items-center py-3 px-3 my-1 mt-20 text-[#fb407e] 
          bg-[rgba(246,108,122,0.2)]"
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
                className={`w-full flex rounded-md font-bold justify-center items-center py-3 px-3 my-1 mt-20 text-[#fb407e] 
                bg-[rgba(246,108,122,0.2)]`}
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
