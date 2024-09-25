import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useStudentContext } from '../../../../src/context/StudentContext';
import { useStateContextDashboard } from '../../../../src/context/UtilitiesContext';
import useEnrolledCourseData from '../../../../src/hooks/useEnrolledCourseData';
import ModuleBreadcrumb from './ModuleBreadcrumb';
import ModuleIntro from './ModuleIntro';
import StudyPlan from './StudyPlan';

const segmentBtn = [
  {
    id: '1',
    title: 'All',
  },
  {
    id: '2',
    title: 'Live Class',
  },
  {
    id: '3',
    title: 'Quiz',
  },
];
const ModuleDetailsMain = () => {
  const [activeBtn, setActiveBtn] = useState('All');
  const { activeMenu } = useStateContextDashboard();
  const { setModuleShowComp } = useStudentContext();
  const { moduleData, enrolledCourse } = useEnrolledCourseData();

  const handleSegmentClick = (item) => {
    setActiveBtn(item.title);
    setModuleShowComp(item.title);
  };

  return (
    <div
      className={`${
        activeMenu ? 'max-w-6xl' : 'w-full pr-6 pl-[56px]'
      } mx-auto flex items-center gap-5`}
    >
      <div className="w-full">
        <button
          className="flex justify-between items-center gap-2 bg-[#e2e2e2] hover:bg-[#d5d5d5] font-semibold py-2
        px-5 rounded border-dashboard_border border mt-4 transition-all duration-200"
        >
          <span className="flex items-center gap-2">
            {' '}
            <FaArrowLeft className="text-lg" /> Go Back
          </span>{' '}
        </button>
        <ModuleBreadcrumb />

        <ModuleIntro moduleData={moduleData} />

        <h3 className="text-2xl font-bold">Study Plan</h3>
        <div className="w-full flex items-center gap-2 bg-white border px-5 py-4 rounded-md mt-2 mb-5">
          {segmentBtn.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSegmentClick(item)}
              className={`${
                activeBtn === item.title
                  ? 'bg-primary_btn hover:bg-[#001f3fdb] text-white'
                  : ''
              } flex justify-center items-center gap-2  hover:bg-[#c2c2c2] font-semibold
          py-2 px-4 rounded border `}
            >
              {item.title}
            </button>
          ))}
        </div>
        <StudyPlan moduleData={moduleData} enrolledCourse={enrolledCourse} />
      </div>
    </div>
  );
};

export default ModuleDetailsMain;
