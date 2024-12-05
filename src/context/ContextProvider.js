import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase, { auth } from '../../firebase';
import { loadData } from '../hooks/loadData';

const db = firebase.firestore();

const StateContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(true);
  const [language, setLanguage] = useState('English');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [userData, setUserData] = useState([]);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    // Set the language from localStorage
    setLanguage(localStorage.getItem('lan') || 'English');

    // Set up the Firebase authentication state observer
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, update the state
        setUserName(user.displayName);
        setUserEmail(user.email);
        setPhotoUrl(user.photoURL);
      } else {
        // User is signed out, clear the state
        setUserName('');
        setUserEmail('');
        setPhotoUrl('');
      }
      setGlobalLoading(false); // Ensure loading state is updated
    });

    // Load data from Firestore
    loadData('users', setUserData);
    // loadDataByOrder('course_data', setCourseData, 'order_course', 'asc');
    loadData('course_data', setCourseData, {
      orderBy: 'order_course',
      orderDirection: 'asc',
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const loadDataByOrder = (database, setState, orderProperty, orderBy) => {
    db.collection(database)
      .orderBy(orderProperty, orderBy)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => ({
          key: doc.id,
          ...doc.data(),
        }));
        setState(data);
      });
  };

  const findCurrentUser = userData.find((item) => item.email === userEmail);
  const uniqueUserName = userEmail?.split('@')[0];
  const enrolledCourseIds = findCurrentUser?.enrolled_courses?.map(
    (course) => course.batchId,
  );

  return (
    <StateContext.Provider
      value={{
        language,
        setLanguage,
        userName,
        userEmail,
        findCurrentUser,
        enrolledCourseIds,
        courseData,
        photoUrl,
        uniqueUserName,
        globalLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
