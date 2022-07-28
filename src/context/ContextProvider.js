import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "../../firebase";
const db = firebase.firestore();

const StateContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [language, setLanguage] = useState("English");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userData, setUserData] = useState([]);
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    setLanguage(localStorage.getItem("lan"));
    setUserName(localStorage.getItem("userName"));
    setUserEmail(localStorage.getItem("emailUser"));

    db.collection("userLogin").onSnapshot((snap) => {
      const userData = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserData(userData);
    });

    db.collection("blogData").onSnapshot((snap) => {
      const userData = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogData(userData);
    });
  }, []);

  const findCurrentUser = userData.find((item) => item.email === userEmail);

  return (
    <StateContext.Provider
      value={{ language, setLanguage, userName, userEmail, findCurrentUser, blogData }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
