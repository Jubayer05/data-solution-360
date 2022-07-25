/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

import { Tooltip } from "antd";
import { useStateContext } from "../../src/context/UtilitiesContext";

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
  } = useStateContext();

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
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        icon={<AiOutlineMenu />}
        customFunc={() => setActiveMenu((prev) => !prev)}
        title="Menu"
        color="blue"
      />

      <div className="flex">
        <NavButton
          icon={<FiShoppingCart />}
          customFunc={() => handleClick("cart")}
          title="Cart"
          color="blue"
        />

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
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            {/* <img src={avatar} alt="" className="h-8 w-8 rounded-full" /> */}
            <p className="mb-0">
              <span className="text-gray-400 text-14">Hi, </span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Jubayer
              </span>
            </p>
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
