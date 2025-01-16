import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useStudentContext } from '../../../../src/context/StudentContext';
import { useStateContextDashboard } from '../../../../src/context/UtilitiesContext';
import useEnrolledCourseData from '../../../../src/hooks/useEnrolledCourseData';
import ButtonDashboard from '../../../utilities/dashboard/ButtonDashboard';
import ModuleBreadcrumb from './ModuleBreadcrumb';
import ModuleIntro from './ModuleIntro';
import StudyPlan from './StudyPlan';

const segmentBtn = [
  {
    id: '1',
    title: 'Live Class',
  },
  {
    id: '2',
    title: 'Quiz',
  },
];
const ModuleDetailsMain = () => {
  const [activeBtn, setActiveBtn] = useState('Live Class');
  const { activeMenu } = useStateContextDashboard();
  const { setModuleShowComp } = useStudentContext();
  const { moduleData, enrolledCourse } = useEnrolledCourseData();
  const router = useRouter();

  console.log(moduleData);

  const handleSegmentClick = (item) => {
    setActiveBtn(item.title);
    setModuleShowComp(item.title);
  };

  return (
    <div
      className={`flex flex-col md:flex-row md:items-start 
        gap-6 ${
          activeMenu
            ? 'w-full mx-auto px-4'
            : 'w-full pr-3 md:pr-6 pl-[84px] md:pl-[96px]'
        }`}
    >
      <div className="w-full">
        <div className="flex items-end gap-4 pt-6">
          <ButtonDashboard onClick={() => router.back()}>
            <ArrowLeft />
            Go Back
          </ButtonDashboard>
        </div>
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
