import React from 'react';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import NeedHelp from '../utilities/NeedHelp';
import ClassJoiningItem from './ClassJoiningItem';

const ClassJoiningMain = () => {
  const { activeMenu } = useStateContextDashboard();

  return (
    <div>
      <div
        className={`${
          activeMenu ? 'max-w-6xl mx-auto' : 'w-full pr-6 pl-[96px]'
        } mx-auto `}
      >
        <div className="gap-10 pb-10">
          <div className="w-full bg-white pb-10 shadow-lg rounded-lg px-6 py-3 my-5">
            <ClassJoiningItem />
          </div>
          <div className="w-full bg-white pb-10 shadow-lg rounded-lg px-6 py-3 my-5">
            <ClassJoiningItem />
          </div>
          <NeedHelp />
        </div>
      </div>
    </div>
  );
};

export default ClassJoiningMain;
