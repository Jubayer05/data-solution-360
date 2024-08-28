import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const StudentContextProvider = ({ children }) => {
  const [enrolledCourse, setEnrolledCourse] = useState(null);
  const [myCourseShowComp, setMyCourseShowComp] = useState('Modules');
  const [moduleShowComp, setModuleShowComp] = useState('All');

  return (
    <StateContext.Provider
      value={{
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
