import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const StudentContextProvider = ({ children }) => {
  const [enrolledCourse, setEnrolledCourse] = useState(null);
  const [myCourseShowComp, setMyCourseShowComp] = useState('Modules');
  const [moduleShowComp, setModuleShowComp] = useState('Live Class');
  const [showResult, setShowResult] = useState(false);
  const [checkAnswer, setCheckAnswer] = useState(false);

  return (
    <StateContext.Provider
      value={{
        showResult,
        setShowResult,
        checkAnswer,
        setCheckAnswer,
        myCourseShowComp,
        setMyCourseShowComp,
        enrolledCourse,
        setEnrolledCourse,
        moduleShowComp,
        setModuleShowComp,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStudentContext = () => useContext(StateContext);
