import React, { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [language, setLanguage] = useState("English");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setLanguage(localStorage.getItem("lan"));
    setUserName(localStorage.getItem("userName"));
  }, []);

  return (
    <StateContext.Provider value={{ language, setLanguage, userName }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
