/* eslint-disable @next/next/no-img-element */
import { Tooltip } from 'antd';
import Link from 'next/link';
import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BiPhoneOutgoing } from 'react-icons/bi';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import {
  footerExploreData,
  footerFollowUs,
  footerUsefulLinksData,
} from '../../src/data/data';

const Footer = () => {
  return (
    <div
      className="pt-8 pb-1 w-full"
      style={{ backgroundColor: '#231f40', color: '#ffffff' }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-between py-24 items-start">
        {/* NOTE: BASIC INFO */}
        <div className="px-4 text-center">
          <img src="/logo/logo-white.png" alt="logo" className="h-20" />
          <p className="mt-2 text-left text-base">
            If you are skilled enough, you don&apos;t need to seek for a job.
            Jobs will search for you.Just make a good portfolio.
          </p>
          <p className="text-white mt-4 text-xs text-right">
            Sakib Tarafder - (CEO)
          </p>

          {/* NOTE: FOLLOW US */}
          <div className="mt-8 flex justify-center">
            <div>
              <div className="flex">
                {footerFollowUs.map((item) => (
                  <Link href={item.link} key={item.id}>
                    <a
                      target="_blank"
                      style={{
                        color: '#ffffff',
                        transition: 'background-color 0.3s',
                      }}
                      className="text-2xl mx-2 bg-[#ffffff1A] p-3 rounded hover:bg-[#525FE1]"
                    >
                      <Tooltip
                        placement="topLeft"
                        title={item.title}
                        key={item.id}
                      >
                        {item.icon}
                      </Tooltip>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* NOTE: Explore */}
        <div className="text-base flex justify-center">
          <div>
            <h2 className="text-2xl text-white mb-10">Explore</h2>
            <ul>
              {footerExploreData.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center cursor-pointer my-2 py-1 text-white hover:text-blue-700 ease-in-out duration-300"
                >
                  <FaAngleDoubleRight />
                  <span className="ml-3">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* NOTE: Explore */}
        <div className="text-base flex justify-center">
          <div>
            <h2 className="text-2xl text-white mb-10">Useful Links</h2>
            <ul>
              {footerUsefulLinksData.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center cursor-pointer my-2 py-1 text-white hover:text-blue-700 ease-in-out duration-300"
                >
                  <FaAngleDoubleRight />
                  <span className="ml-3">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* NOTE: CONTACT */}
        <div className="flex justify-center ">
          <div>
            <h2 className="text-2xl text-white mb-10">Contact Us</h2>
            <ul className="">
              <li className="text-base flex items-center my-2 py-1 text-white">
                <GoLocation /> <span className="ml-2">Dhaka Mawa High Way</span>
              </li>
              <li className="text-base flex items-center cursor-pointer my-2 py-1 ">
                <BiPhoneOutgoing className="text-xl" />{' '}
                <Link href="tel:+8801996104096">
                  <a
                    target="_blank"
                    className="ml-2 text-white hover:text-blue-700 ease-in-out duration-300"
                  >
                    <span>+8801996104096</span>
                  </a>
                </Link>
              </li>

              <li className="text-base flex items-center cursor-pointer my-2 py-1 ">
                <AiOutlineMail className="text-xl" />{' '}
                <Link href="mailto:datasolution360.business@gmail.com">
                  <a
                    target="_blank"
                    className="ml-2 text-white hover:text-blue-700 ease-in-out duration-300"
                  >
                    <span>datasolution360.business@gmail.com</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* NOTE: COPYRIGHT */}
      <p className="text-center text-base pb-2">
        Copyright &copy; {new Date().getFullYear()}{' '}
        <Link href="/">
          <a
            className="font-semibold decoration-2 hover:underline"
            style={{ color: '#fff' }}
          >
            {' '}
            Data Solution - 360
          </a>
        </Link>
        . All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
