import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase, { auth } from '../../firebase';

const db = firebase.firestore();

const StateContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(true);
  const [language, setLanguage] = useState('English');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [userData, setUserData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [dashAdmin, setDashAdmin] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [faqData, setFaqData] = useState([]);
  const [trendingCourse, setTrendingCourse] = useState([]);
  const [popupImage, setPopupImage] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const [teamMember, setTeamMember] = useState([]);
  const [youtubeVideo, setYouTubeVideo] = useState([]);
  const [technologyStack, setTechnologyStack] = useState([]);
  const [studentReview, setStudentReview] = useState([]);
  const [slidesMainBannerData, setSlidesMainBannerData] = useState([]);
  

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
    loadData('student_data', setUserData);
    loadData('instructors', setInstructor);
    loadData('team_members', setTeamMember);
    loadData('trendingCourse', setTrendingCourse);
    loadData('popupImage', setPopupImage);
    loadData('youtubeVideo', setYouTubeVideo);
    loadData('dashboard_users', setDashAdmin);
    loadData('student_review', setStudentReview);
    loadData('slides_main_banner', setSlidesMainBannerData);
    loadData('technology_stack', setTechnologyStack);
    loadDataByOrder('faqData', setFaqData, 'orderFaq', 'asc');
    loadDataByOrder('blogData', setBlogData, 'orderNo', 'asc');
    loadDataByOrder('course_data', setCourseData, 'createdAt', 'desc');

    // Cleanup subscription on unmount
    return () => unsubscribe();
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
        teamMember,
        photoUrl,
        uniqueUserName,
        faqData,
        trendingCourse,
        popupImage,
        youtubeVideo,
        instructor,
        technologyStack,
        studentReview,
        slidesMainBannerData,
        globalLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
