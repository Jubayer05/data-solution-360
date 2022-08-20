/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiLogIn } from "react-icons/fi";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { BsChevronDown } from "react-icons/bs";

import styles from "../../styles/utility/Navbar.module.css";
import { navItems } from "../../src/data/data";
import { useStateContext } from "../../src/context/ContextProvider";
import Link from "next/link";

const Navbar = () => {
  const { language, setLanguage, userName } = useStateContext();
  const [scroll, setScroll] = useState(false);
  const [width, setWidth] = useState(null);
  const [openNav, setOpenNav] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", (e) => {
        if (window.pageYOffset > 0) {
          setScroll(true);
        } else {
          setScroll(false);
        }
      });

      setWidth(window.innerWidth);
    }
  }, [scroll]);

  const handleLanguage = (lan) => {
    localStorage.setItem("lan", lan);
    setLanguage(lan);
  };
  return (
    <div
      className={`fixed w-full md:text-center bg-white z-50 px-5 pt-4 pb-3 md:px-3 md:py-0 ${
        scroll ? "shadow-lg bg-white" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto md:flex md:justify-between md:items-center md:h-16 ">
        <div className="flex justify-between items-center z-50">
          <HiOutlineMenuAlt1
            onClick={() => setOpenNav(!openNav)}
            className="text-2xl md:hidden"
          />
          <Link href="/">
            <a>
              <img src="/logo/logo.png" className="h-12" alt="logo" />
            </a>
          </Link>
        </div>

        <div
          className={`bg-white pt-4 md:flex-1 md:justify-between md:flex md:items-center md:bg-transparent md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            openNav ? "top-16" : "top-[-490px]"
          }`}
        >
          <div className="flex-1 ">
            <ul className="md:inline-flex  md:justify-between mb-0">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  className="font-bangla mx-2 cursor-pointer border-b-2 border-transparent  md:hover:border-slate-500 font-bold"
                >
                  <Link href={item?.link}>
                    <a className="text-gray-500">
                      {language === "English" ? item.title : item.titleBang}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:flex md:items-center">
            <div className="font-semibold text-left mr-4">
              {userName ? "Hello," : ""}
              <p className="text-orange-500">{userName}</p>
            </div>

            {width > 768 ? (
              <div className={`relative pr-5 ${styles.dropdown__container}`}>
                <span className="text-md flex font-bangla items-center leading-16 hover:text-red-600">
                  {language} &nbsp; <BsChevronDown />
                </span>
                <ul
                  className={`absolute top-full -left-4 bg-white py-3 pl-5 pr-20 pt-2 -z-10 ${styles.dropdown__content}`}
                >
                  <li
                    className="text-left font-bangla hover:text-red-700 cursor-pointer text-sm"
                    onClick={() => handleLanguage("বাংলা")}
                  >
                    বাংলা
                  </li>
                  <li
                    className="text-left hover:text-red-700 cursor-pointer text-sm mt-2"
                    onClick={() => handleLanguage("English")}
                  >
                    English
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <ul className="flex -mt-3">
                  <li
                    className={`px-3 ${
                      language === "বাংলা" ? "text-red-600" : ""
                    }`}
                    onClick={() => handleLanguage("বাংলা")}
                  >
                    বাংলা
                  </li>
                  <li
                    className={`px-3 ${
                      language === "English" ? "text-red-600" : ""
                    }`}
                    onClick={() => handleLanguage("English")}
                  >
                    English
                  </li>
                </ul>
              </div>
            )}

            <Link href="/login">
              <a>
                <button
                  type="button"
                  style={{
                    borderRadius: "5px",
                  }}
                  className={`text-md px-3 py-2 hover:drop-shadow-xl flex items-center border-1 border-slate-700 text-gray-300 bg-slate-700 transition-all duration-300 ease-linear hover:bg-white hover:text-gray-800`}
                  onClick={() => {}}
                >
                  <FiLogIn className="text-sm" />{" "}
                  <span className="pl-2 font-bangla">
                    {language === "English" ? "Log in" : "লগ ইন"}
                  </span>
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
