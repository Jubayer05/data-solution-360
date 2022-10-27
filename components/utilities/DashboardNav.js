/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineMenuOpen } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "antd";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

import { Tooltip } from "antd";
import { useStateContextDashboard } from "../../src/context/UtilitiesContext";
import { useStateContext } from "../../src/context/ContextProvider";
// import { useStateContext } from "../../src/context/UtilitiesContext";

const NavButton = ({ title, link, customFunc, icon, color, dotColor }) => {
  return (
    <Tooltip title={title} color="#707070">
      <button
        type="button"
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
        onClick={customFunc}
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </Tooltip>
  );
};

const DashboardNavbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
  } = useStateContextDashboard();
  const { userName, photoUrl, uniqueUserName } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="flex justify-between items-center p-2 md:mx-6 relative">
      <NavButton
        icon={activeMenu ? <MdOutlineMenuOpen /> : <AiOutlineMenu />}
        customFunc={() => setActiveMenu((prev) => !prev)}
        title="Menu"
        color="blue"
      />

      <div className="px-2 py-1 flex items-center bg-[#e2ecff] w-1/3 rounded-lg">
        <AiOutlineSearch className="text-xl mr-2" />
        <input
          placeholder="Quic searching"
          className="rounded-md bg-[#e2ecff] h-8 outline-none w-full"
        />
      </div>

      <div className="flex items-center">
        <NavButton
          icon={<BsChatLeft />}
          customFunc={() => handleClick("chat")}
          title="Chat"
          color="blue"
          dotColor="#03c9d7"
        />

        <NavButton
          icon={<RiNotification3Line />}
          customFunc={() => handleClick("notification")}
          title="Notification"
          color="blue"
          dotColor="#03c9d7"
        />
        <Tooltip title="Profile" color="#707070">
          <div
            className="ml-2 flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            {/* <img src={avatar} alt="" className="h-8 w-8 rounded-full" /> */}
            <div className="flex items-center">
              <div className="border-[3px] border-[#0389d7] rounded-full flex items-center justify-center">
                <img
                  className="w-[40px] h-[40px] rounded-full"
                  src={photoUrl}
                  alt={userName}
                />
              </div>
              <div>
                <p className="text-gray-800 font-bold ml-1 text-14 mb-0">
                  {userName}
                </p>
                <p className="text-gray-500 font-bold ml-1 text-[10px] mb-0">
                  @{uniqueUserName}
                </p>
              </div>
            </div>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </Tooltip>

        {/* {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />} */}
      </div>
    </div>
  );
};

export default DashboardNavbar;
