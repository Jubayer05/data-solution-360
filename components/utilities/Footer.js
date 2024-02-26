/* eslint-disable @next/next/no-img-element */
import { Tooltip } from 'antd';
import Link from 'next/link';
import React from 'react';
import { CiPhone } from 'react-icons/ci';
import { RiMailUnreadLine } from 'react-icons/ri';
import { SlLocationPin } from 'react-icons/sl';
import {
  footerAboutData,
  footerExploreData,
  footerFollowUs,
} from '../../src/data/data';

const Footer = () => {
  return (
    <div
      className="pt-20 pb-1 w-full"
      style={{ backgroundColor: '#fffbee', color: '#5f5246' }}
    >
      <div className="flex flex-col md:!flex-row items-stretch justify-between h-full max-w-[1240px] mx-auto flex-wrap">
        {/* NOTE: BASIC INFO */}
        <div className="w-full md:w-[260px] text-center md:text-left flex md:block justify-center items-center flex-col">
          <img src="/logo/logo.png" alt="logo" className="h-20" />
          <p className="text-base mt-3">
            Online Live Data Science Learning Platform
          </p>

          <p className="text-base mt-8">Stay connected with the community</p>
          {/* NOTE: FOLLOW US */}
          <div className="mt-4 flex justify-start">
            <div>
              <div className="flex">
                {footerFollowUs.map((item) => (
                  <Link
                    href={item.link}
                    key={item.id}
                    target="_blank"
                    style={{
                      backgroundColor: item.brandColor,
                    }}
                    className={`text-2xl text-white visited:text-white mx-2 p-2 rounded-full hover:text-white`}
                  >
                    <Tooltip
                      placement="topLeft"
                      title={item.title}
                      key={item.id}
                    >
                      {item.icon}
                    </Tooltip>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* NOTE: Useful Links */}
        <div className="text-base w-full md:w-[259px] mt-5 md:mt-0 ml-0 md:ml-6">
          <div>
            <h2 className="text-2xl text-[#212529] mb-6 text-center md:text-left mt-10 md:mt-0">
              Quick Links
            </h2>
            <ul>
              {footerExploreData.map((item) => (
                <li
                  key={item.id}
                  className="list-none mb-3 text-center md:text-left"
                >
                  <Link href={item.Link}>
                    <span
                      className="border-b-[1.5px] border-solid border-transparent cursor-pointer text-[#212529] hover:text-[orangered]
                    hover:border-[orangered] ease-in-out duration-300 "
                    >
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* NOTE: Contacts */}
        <div className="text-base w-full md:w-[300px] mt-5 md:mt-0 md:mr-12 md:px-5">
          <div>
            <h2 className="text-2xl text-[#212529] mb-6 text-center md:text-left mt-10 md:mt-0">
              Contacts
            </h2>
            <ul className="">
              <li
                className="border-b-[1.5px] border-solid border-transparent cursor-pointer text-[#212529] hover:text-[orangered]
                  hover:border-[orangered] ease-in-out duration-300 text-base flex items-center justify-center md:justify-start mt-2 gap-2"
              >
                <SlLocationPin className="text-lg" />{' '}
                <span className="text-left">
                  House 22, 1st Floor, Road 119, Gulshan -1
                </span>
              </li>
              <li className="text-base flex items-center justify-center md:justify-start cursor-pointer mt-4">
                {/* <BiPhoneOutgoing className="text-xl" />{' '} */}
                <Link
                  href="tel:+8801996104096"
                  target="_blank"
                  className="border-b-[1.5px] border-solid border-transparent cursor-pointer text-[#212529] hover:text-[orangered]
                  hover:border-[orangered] ease-in-out duration-300 flex items-center gap-2"
                >
                  <CiPhone className="text-lg" />
                  <span>+8801996104096</span>
                </Link>
              </li>

              <li className="text-base flex items-center justify-center md:justify-start cursor-pointer mt-4">
                {/* <AiOutlineMail className="text-xl" /> */}
                <Link
                  href="mailto:datasolution360.business@gmail.com"
                  target="_blank"
                  className="border-b-[1.5px] border-solid border-transparent cursor-pointer text-[#212529] hover:text-[orangered]
                  hover:border-[orangered] ease-in-out duration-300 flex items-center gap-2"
                >
                  <RiMailUnreadLine className="text-lg" />
                  <span>datasolution360.business@gmail.com</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* NOTE: About */}
        <div className="text-base w-full md:w-[260px] mt-5 md:mt-0">
          <div>
            <h2 className="text-2xl text-[#212529] mb-6 text-center md:text-left mt-10 md:mt-0">
              Company
            </h2>
            <ul>
              {footerAboutData.map((item) => (
                <li
                  key={item.id}
                  className="list-none mb-3 text-center md:text-left"
                >
                  <Link href={item.Link}>
                    <span
                      className="border-b-[1.5px] border-solid border-transparent cursor-pointer text-[#212529] hover:text-[orangered]
                   hover:border-[orangered] ease-in-out duration-300 "
                    >
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* NOTE: COPYRIGHT */}
      <p className="text-center text-base pb-2 px-2 mt-10">
        Copyright &copy; {new Date().getFullYear()}{' '}
        <Link
          href="/"
          className="font-semibold decoration-2 hover:underline"
          style={{ color: '#000' }}
        >
          Data Solution - 360
        </Link>
        . All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
