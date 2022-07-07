/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { footerContactData, footerFollowUs } from "../../src/data/data";
import { Tooltip } from "antd";

const Footer = () => {
  return (
    <div
      className="pt-20 pb-1 w-full"
      style={{ backgroundColor: "#333", color: "#b3b3b3" }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-between pb-6 ">
        {/* NOTE: BASIC INFO */}
        <div className="px-4 text-center">
          <img src="/logo/logo-white.png" alt="logo" className="h-20 mx-auto" />
          <p className="mt-2 text-left">
            If you are skilled enough, you don&apos;t need to seek a job. Jobs
            will search for you.Just make a good portfolio.
          </p>
          <p className="text-gray-400 mt-4 text-xs">Sakib Tarafder - (CEO)</p>
        </div>

        {/* NOTE: CONTACT */}
        <div className="flex justify-center">
          <ul className="mt-8">
            <li className="text-2xl font-bold mb-3">Contact</li>
            {footerContactData.map((item) => (
              <li key={item.id} className="leading-7 flex items-center mt-3">
                {item.icon} <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* NOTE: FOLLOW US */}
        <div className="mt-8 flex justify-center">
          <div>
            <p className="text-xl font-bold mb-3">Follow Us</p>

            <div className="flex">
              {footerFollowUs.map((item) => (
                <Link href={item.link} key={item.id}>
                  <a
                    target="_blank"
                    style={{ color: "#c5c5c5" }}
                    className="text-3xl mx-2"
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

      {/* NOTE: COPYRIGHT */}
      <p className="text-center text-sm mt-6">
        Copyright &copy; {new Date().getFullYear()}{" "}
        <Link href="/">
          <a
            className="font-semibold decoration-2 hover:underline"
            style={{ color: "#b3b3b3" }}
          >
            {" "}
            Data Solution - 360
          </a>
        </Link>
        . All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
