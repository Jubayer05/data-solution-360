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
  const [dashAdmin, setDashAdmin] = useState([]);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    setLanguage(localStorage.getItem("lan"));
    setUserName(localStorage.getItem("userName"));
    setUserEmail(localStorage.getItem("emailUser"));

    loadData("userLogin", setUserData);
    loadData("blogData", setBlogData);
    loadData("dashboard_admin", setDashAdmin);
    loadData("course_data", setCourseData);
  }, []);

  const loadData = (database, setState) => {
    db.collection(database).onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({
        key: doc.id,
        ...doc.data(),
      }));
      setState(data);
    });
  };

  const findCurrentUser = userData.find((item) => item.email === userEmail);
  const findAdmin = dashAdmin.find((item) => item.email === userEmail);

  // console.log(findAdmin);

  return (
    <StateContext.Provider
      value={{
        language,
        setLanguage,
        userName,
        userEmail,
        findCurrentUser,
        findAdmin,
        blogData,
        courseData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
