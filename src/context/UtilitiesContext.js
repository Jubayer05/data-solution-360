import React, { createContext, useContext, useEffect, useState } from 'react';
import { videosPlaylist } from '../data/dummy';

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
  const [showedItem, setShowedItem] = useState();

  const handleClick = (clicked) => {
    setIsClicked({ initialState, [clicked]: true });
  };

  useEffect(() => {
    setShowedItem(videosPlaylist[0].videoUrl[0]);
  }, []);

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
        showedItem,
        setShowedItem,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContextDashboard = () => useContext(StateContext);
