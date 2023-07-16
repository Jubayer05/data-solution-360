import React from 'react';

const HeadingDashboard = ({ title }) => {
  return (
    <div className="h-[200px] bg-[url(/Background/admin-bg.jpg)] w-full flex items-center justify-center">
      <h2 className="text-4xl mt-6 pb-4 text-[#231f40] text-center font-heading ">
        {title}
      </h2>
    </div>
  );
};

export default HeadingDashboard;
