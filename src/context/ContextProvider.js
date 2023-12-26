import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from '../../firebase';
const db = firebase.firestore();

const StateContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [language, setLanguage] = useState('English');
  const [userName, setUserName] = useState('');
  // const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [userData, setUserData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [dashAdmin, setDashAdmin] = useState([]);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    setLanguage(localStorage.getItem('lan'));
    setUserName(localStorage.getItem('userName'));
    setUserEmail(localStorage.getItem('emailUser'));
    setPhotoUrl(localStorage.getItem('photoUrl'));

    loadData('userLogin', setUserData);
    loadDataByOrder('blogData', setBlogData);
    loadData('dashboard_admin', setDashAdmin);
    loadDataByOrder('course_data', setCourseData);
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
  const loadDataByOrder = (database, setState) => {
    db.collection(database)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => ({
          key: doc.id,
          ...doc.data(),
        }));
        setState(data);
      });
  };

  const findCurrentUser = userData.find((item) => item.email === userEmail);
  const findAdmin = dashAdmin.find((item) => item.email === userEmail);
  const uniqueUserName = userEmail?.split('@')[0];

  // console.log(userData);

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
        photoUrl,
        uniqueUserName,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
