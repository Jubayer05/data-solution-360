import React, { createContext, useContext, useEffect, useState } from 'react';

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const UtilityContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);
  const [language, setLanguage] = useState('English');
  const [enrolledCourse, setEnrolledCourse] = useState(null);

  const handleClick = (clicked) => {
    setIsClicked({ initialState, [clicked]: true });
  };


  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        language,
        setLanguage,
        enrolledCourse,
        setEnrolledCourse,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContextDashboard = () => useContext(StateContext);
