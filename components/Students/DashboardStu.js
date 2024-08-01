import React from 'react';

import Profile from './Profile/Profile';

const AdminHome = () => {
  return (
    <div>
      <Profile title="Dashboard" />
      <div className="flex justify-center items-center flex-col p-2 md:mx-6">
        <h2 className="text-xl mt-12">Suggested Course</h2>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-5 pt-0">
          {courseData?.map((item) => (
            <HomeCourseItem key={item.id} item={item} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default AdminHome;
