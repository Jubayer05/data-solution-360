/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Switch } from "antd";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { BsChevronDown } from "react-icons/bs";
import { getAuth, signOut } from "firebase/auth";

import styles from "../../styles/utility/Navbar.module.css";
import { navDropItems, navItems } from "../../src/data/data";
import { useStateContext } from "../../src/context/ContextProvider";
import Link from "next/link";

const Navbar = () => {
  const { language, setLanguage, userName, findAdmin } = useStateContext();
  const auth = getAuth();
  // const [scroll, setScroll] = useState(false);
  const [width, setWidth] = useState(null);
  const [openNav, setOpenNav] = useState(null);
  const [eng, setEng] = useState(true);

  useEffect(() => {
    if (eng) {
      localStorage.setItem("lan", "English");
      setLanguage("English");
    } else {
      localStorage.setItem("lan", "বাংলা");
      setLanguage("বাংলা");
    }
  }, [eng]);

  const handleLanguage = () => {};

  const handleLogout = () => {
    console.log("Hello");
    signOut(auth)
      .then(() => {
        localStorage.clear();
        window.location.reload();
      })
      .catch((error) => {
        alert("Can not logout");
      });
  };
  return (
    <div
      className={`w-full border-b-1 border-[rgb(79,91,140)] md:text-center  z-50 px-5 pt-4 pb-3 
                 md:px-4 md:py-0 bg-[rgb(38,52,110)]`}
    >
      <div className="max-w-7xl mx-auto md:flex md:justify-between md:items-center md:h-20 ">
        <div className="flex justify-between items-center z-50">
          <HiOutlineMenuAlt1
            onClick={() => setOpenNav(!openNav)}
            className="text-2xl md:hidden"
          />
          <Link href="/">
            <a>
              <img src="/logo/logo-white.png" className="h-16" alt="logo" />
            </a>
          </Link>
        </div>

        <div
          className={`bg-white pt-4 md:pt-0 md:flex-1 md:justify-between md:flex md:items-center 
                    md:bg-transparent md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full 
                    md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
                      openNav ? "top-16" : "top-[-490px]"
                    }`}
        >
          <div className="">
            <ul className="pl-8 md:inline-flex md:justify-between mb-0">
              {navItems.map((item) => (
                <li key={item.id} className="">
                  <Link href={item?.link}>
                    <a
                      className="font-bangla cursor-pointer font-medium visited:text-white 
                      text-white px-4 py-3 hover:bg-[rgba(0,0,0,0.3)] transition-all 
                      duration-500 rounded-md hover:text-[#61CE70]"
                    >
                      {language === "English" ? item.title : item.titleBang}
                    </a>
                  </Link>
                </li>
              ))}
              {findAdmin && (
                <li className="">
                  <Link href="/admin/dashboard">
                    <a
                      className="font-bangla cursor-pointer font-medium visited:text-white text-white 
                                  px-4 py-3 hover:bg-[rgba(0,0,0,0.3)] rounded-md hover:text-[#61CE70]"
                    >
                      {language === "English" ? "Dashboard" : "ড্যাশবোর্ড"}
                    </a>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="md:flex md:items-center">
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
              <div className="relative font-semibold text-left mr-4">
                <Avatar
                  size={45}
                  src="https://randomuser.me/api/portraits/med/men/78.jpg"
                  className="cursor-pointer"
                />

                <div className="absolute z-10 bg-white top-[60px] -right-4 w-[240px] pt-5 pb-2 px-8 rounded-lg">
                  <ul>
                    {navDropItems.map((item) => (
                      <li
                        key={item.id}
                        className="py-3 rounded-md cursor-pointer hover:text-white px-4 hover:bg-[rgb(32,52,110)]"
                      >
                        {item.title}
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
                        <FiLogOut className="text-sm" />{" "}
                        <span className="pl-2 font-bangla">
                          {language === "English" ? "Logout" : "লগ ইন"}
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link href="/login">
                <a>
                  <button
                    type="button"
                    style={{
                      borderRadius: "5px",
                    }}
                    className={`text-md px-3 py-2 hover:drop-shadow-xl flex items-center text-gray-300 
                          bg-primary-bg transition-all duration-300 ease-linear hover:bg-white
                           hover:text-primary hover:border-primary`}
                    onClick={() => {}}
                  >
                    <FiLogIn className="text-sm" />{" "}
                    <span className="pl-2 font-bangla">
                      {language === "English" ? "Log in" : "লগ ইন"}
                    </span>
                  </button>
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
