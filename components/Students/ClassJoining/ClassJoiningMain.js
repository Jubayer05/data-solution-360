import React from 'react';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import useEnrolledCourseData from '../../../src/hooks/useEnrolledCourseData';
import NeedHelp from '../utilities/NeedHelp';
import ClassJoiningItem from './ClassJoiningItem';

const ClassJoiningMain = () => {
  const { activeMenu } = useStateContextDashboard();
  const { courseDataBatch } = useEnrolledCourseData();
  return (
    <div>
      <div
        className={`${
          activeMenu ? 'max-w-6xl mx-auto' : 'w-full px-4'
        } mx-auto `}
      >
        <div className="gap-10 pb-10">
          {courseDataBatch?.map((item) => (
            <div
              key={item.id}
              className="w-full bg-white pb-10 shadow-lg rounded-lg px-4 md:px-6 py-3 my-5"
            >
              <ClassJoiningItem item={item} batchId={item?.unique_batch_id} />
            </div>
          ))}

          <NeedHelp />
        </div>
      </div>
    </div>
  );
};

export default ClassJoiningMain;
