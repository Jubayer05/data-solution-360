import { collection, getDocs, query, where } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from '../../firebase';
import { loadData } from '../hooks/loadData';

const db = firebase.firestore();

const StateContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(true);
  const [language, setLanguage] = useState('English');
  const [userData, setUserData] = useState([]);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    // Set the language from localStorage
    setLanguage(localStorage.getItem('lan') || 'English');

    // Load data from Firestore
    loadData('course_data', setCourseData, {
      orderBy: 'order_course',
      orderDirection: 'asc',
    });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('auth_token'); // Read token from cookies
      if (!token) {
        setGlobalLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        let userData = { ...decoded, role: null };

        const q = query(
          collection(db, 'users'),
          where('email', '==', decoded.email),
        );
        const querySnapshot = await getDocs(q); // Await Firestore query

        if (!querySnapshot.empty) {
          const userFirestoreData = querySnapshot.docs[0].data();
          userData = { ...decoded, ...userFirestoreData };
        } else {
          console.warn('No user data found in Firestore for:', decoded.email);
        }

        setUserData(userData);
      } catch (error) {
        console.error('Error decoding token or fetching user data:', error);
        setUserData(null);
      } finally {
        setGlobalLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const enrolledCourseIds = userData?.enrolled_courses?.map(
    (course) => course.batchId,
  );

  if (userData?.full_name) {
    // Set the user's full name in session storage
    sessionStorage.setItem('fullName', userData.full_name);
  }

  return (
    <StateContext.Provider
      value={{
        language,
        setLanguage,
        findCurrentUser: userData,
        enrolledCourseIds,
        courseData,
        globalLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
