import React from 'react';

const HeadingDashboard = ({ title, username }) => {
  return (
    <div className="h-[200px] bg-[url(/Background/admin-bg.jpg)] w-full flex items-center justify-center px-4 pt-5 mt-3">
      <h2 className="text-2xl pt-6 pb-4 text-[#231f40] text-center font-medium font-heading ">
        <span className="font-bold">{title}</span>
        {username && (
          <span>
            Welcome to{' '}
            <span className="text-[#ff5555] font-bold">{username}&apos;s</span>{' '}
            dashboard{' '}
          </span>
        )}
      </h2>
    </div>
  );
};

export default HeadingDashboard;
