import React from 'react';
import { DashboardFormat, MyBlogs } from '../../components';

const myBlogs = () => {
  return (
    <div>
      <DashboardFormat component={<MyBlogs />} />
    </div>
  );
};

export default myBlogs;
