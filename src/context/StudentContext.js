import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const StudentContextProvider = ({ children }) => {
  const [enrolledCourse, setEnrolledCourse] = useState(null);
  const [myCourseShowComp, setMyCourseShowComp] = useState('Modules');

  return (
    <StateContext.Provider
      value={{
        myCourseShowComp,
        setMyCourseShowComp,
        enrolledCourse,
        setEnrolledCourse,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStudentContext = () => useContext(StateContext);
