import React from 'react';
import { DashboardFormat, MyBlogs } from '../../components';
import ProtectedRoute from '../../components/utilities/ProtectedRoute/ProtectedRoute';

const myBlogs = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<MyBlogs />} />
    </div>
  );
};

// export default myBlogs;
export default ProtectedRoute(myBlogs, 'admin');
