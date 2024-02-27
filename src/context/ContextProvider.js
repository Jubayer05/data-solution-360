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
  const [faqData, setFaqData] = useState([]);
  const [trendingCourse, setTrendingCourse] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const [youtubeVideo, setYouTubeVideo] = useState([]);
  const [technologyStack, setTechnologyStack] = useState([]);
  const [studentReview, setStudentReview] = useState([]);

  useEffect(() => {
    setLanguage(localStorage.getItem('lan'));
    setUserName(localStorage.getItem('userName'));
    setUserEmail(localStorage.getItem('emailUser'));
    setPhotoUrl(localStorage.getItem('photoUrl'));

    loadData('userLogin', setUserData);
    loadData('instructors', setInstructor);
    loadData('trendingCourse', setTrendingCourse);
    loadData('youtubeVideo', setYouTubeVideo);
    loadData('dashboard_admin', setDashAdmin);
    loadData('student_review', setStudentReview);

    loadData('technology_stack', setTechnologyStack);
    loadDataByOrder('faqData', setFaqData, 'orderFaq', 'asc');
    loadDataByOrder('blogData', setBlogData, 'orderNo', 'asc');
    loadDataByOrder('course_data', setCourseData, 'createdAt', 'desc');
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
        faqData,
        trendingCourse,
        youtubeVideo,
        instructor,
        technologyStack,
        studentReview,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
