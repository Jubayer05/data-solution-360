import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiLogIn } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";

import styles from "../../styles/utility/Navbar.module.css";
import { navItems } from "../../src/data/data";
import { useStateContext } from "../../src/context/ContextProvider";
import Link from "next/link";

const Navbar = () => {
  const { language, setLanguage } = useStateContext();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.pageYOffset > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }, [scroll]);

  const handleLanguage = (lan) => {
    localStorage.setItem("lan", lan);
    setLanguage(lan);
  };
  return (
    <div
      className={`fixed bg-white w-full text-center z-50 ${
        scroll ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center h-20">
        <Image src="/logo/logo.png" width="80px" height="80px" alt="logo" />

        <ul className="flex justify-between mb-0">
          {navItems.map((item) => (
            <li
              key={item.id}
              className="font-bangla mx-2 cursor-pointer border-b-2 border-transparent hover:border-slate-500 font-bold"
            >
              <Link href={item.link}>
                <a className="text-gray-500">
                  {language === "English" ? item.title : item.titleBang}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          <div className={`relative pr-5 ${styles.dropdown__container}`}>
            <span className="text-md flex font-bangla items-center leading-20 hover:text-red-600">
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

          <Link href="/login">
            <a>
              <button
                type="button"
                style={{
                  backgroundColor: "#555",
                  borderRadius: "5px",
                  color: "#eee",
                }}
                className={`text-md px-3 py-2 hover:drop-shadow-xl flex items-center`}
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
  );
};

export default Navbar;
