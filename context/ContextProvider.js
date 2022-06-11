import React, { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    setLanguage(localStorage.getItem("lan"));
  }, []);

  return (
    <StateContext.Provider value={{ language, setLanguage }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
