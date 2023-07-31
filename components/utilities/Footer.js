/* eslint-disable @next/next/no-img-element */
import { Tooltip } from 'antd';
import Link from 'next/link';
import React from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import {
  footerAboutData,
  footerExploreData,
  footerFollowUs,
  footerUsefulLinksData,
} from '../../src/data/data';

const Footer = () => {
  return (
    <div
      className="pt-8 pb-1 w-full"
      style={{ backgroundColor: '#ffffff', color: '#5f5246' }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-between py-8 items-start">
        {/* NOTE: BASIC INFO */}
        <div className="px-4 text-center">
          <img src="/logo/logo.png" alt="logo" className="h-20" />

          <ul className="">
            <li className="text-base flex items-center -mt-2 py-1 text-[#212529]">
              <GoLocation />{' '}
              <span className="ml-2">
                173/2, Al Amin Vila, Middle Badda, Gulshan-1,Dhaka
              </span>
            </li>
            <li className="text-base flex items-center cursor-pointer mt-4">
              {/* <BiPhoneOutgoing className="text-xl" />{' '} */}
              <Link
                href="tel:+8801996104096"
                target="_blank"
                className="ml-2 text-blue-500 hover:text-blue-800 ease-in-out duration-300"
              >
                <span>+8801996104096</span>
              </Link>
            </li>

            <li className="text-base flex items-center cursor-pointer ">
              {/* <AiOutlineMail className="text-xl" /> */}
              <Link
                href="mailto:datasolution360.business@gmail.com"
                target="_blank"
                className="ml-2 text-blue-500 hover:text-blue-800 ease-in-out duration-300"
              >
                <span>datasolution360.business@gmail.com</span>
              </Link>
            </li>
          </ul>

          {/* NOTE: FOLLOW US */}
          <div className="mt-8 flex justify-center">
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

        {/* NOTE: Explore */}
        <div className="text-base flex  w-[250px] mx-auto mt-5 md:mt-0">
          <div>
            <h2 className="text-2xl text-[#212529] mb-3">Explore</h2>
            <ul>
              {footerExploreData.map((item) => (
                <Link href={item.Link} key={item.id}>
                  <li className="flex items-center cursor-pointer text-[#6c757d] hover:text-blue-700 ease-in-out duration-300">
                    <FaAngleDoubleRight />
                    <span className="ml-3">{item.title}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        {/* NOTE: Useful Links */}
        <div className="text-base flex  w-[250px] mx-auto mt-5 md:mt-0">
          <div>
            <h2 className="text-2xl text-[#212529] mb-3">Useful Links</h2>
            <ul>
              {footerUsefulLinksData.map((item) => (
                <Link href={item.Link} key={item.id}>
                  <li className="flex items-center cursor-pointer text-[#6c757d] hover:text-blue-700 ease-in-out duration-300">
                    <FaAngleDoubleRight />
                    <span className="ml-3">{item.title}</span>
                  </li>
                </Link>
              ))}
              <Link
                target="_blank"
                href="https://docs.google.com/forms/d/e/1FAIpQLScwvqWOoQ51ZJKDJAOxvgE5uFc1LXARSm2dWHPxIT-Rd7Hy1A/viewform?usp=sf_link"
              >
                <li className="flex items-center cursor-pointer text-[#6c757d] hover:text-blue-700 ease-in-out duration-300">
                  <FaAngleDoubleRight />
                  <span className="ml-3">Join as instructor</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>

        {/* NOTE: About */}
        <div className="text-base flex  w-[250px] mx-auto mt-5 md:mt-0">
          <div>
            <h2 className="text-2xl text-[#212529] mb-3">In Details</h2>
            <ul>
              {footerAboutData.map((item) => (
                <Link href={item.Link} key={item.id}>
                  <li className="flex items-center cursor-pointer text-[#6c757d] hover:text-blue-700 ease-in-out duration-300">
                    <FaAngleDoubleRight />
                    <span className="ml-3">{item.title}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* NOTE: COPYRIGHT */}
      <p className="text-center text-base pb-2 px-2">
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
