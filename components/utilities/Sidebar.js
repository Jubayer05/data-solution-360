/* eslint-disable @next/next/no-img-element */
import React from "react";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import Link from "next/link";

import { Tooltip } from "antd";
import { useStateContextDashboard } from "../../src/context/UtilitiesContext";
import { linksAdmin } from "../../src/data/dummy";

const Sidebar = ({ links }) => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContextDashboard();

  const handleCloseMenu = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  console.log(activeMenu);

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-gray-600 text-md m-2  hover:bg-gray-100 hover:text-gray-400";

  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 h-screen">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              href="/"
              onClick={handleCloseMenu}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <a>
                <img src="/logo/logo.png" className="w-40 mt-4" alt="" />
              </a>
            </Link>

            {/* NOTE: TOOLTIP COMPONENT FROM ANTD */}
            <Tooltip title="Menu" color="#707070">
              <button
                className="text-xl"
                onClick={() =>
                  setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                }
              >
                <MdOutlineCancel />
              </button>
            </Tooltip>
          </div>

          <div className="mt-10">
            {linksAdmin.map((item) => (
              <div
                className="text-gray-400 m-3 mt-4 uppercase"
                key={item.title}
              >
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <Link
                    href={`${link.link}`}
                    key={link.name}
                    onClick={handleCloseMenu}
                  >
                    <a className={activeLink ? activeLink : normalLink}>
                      <span className="text-xl"> {link.icon}</span>
                      <span className="capitalize">{link.name}</span>
                    </a>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
