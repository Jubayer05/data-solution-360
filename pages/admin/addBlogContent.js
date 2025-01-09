import React from 'react';
import { AddNewBlog, DashboardFormat } from '../../components';
import ProtectedRoute from '../../components/utilities/ProtectedRoute/ProtectedRoute';

const addBlogContent = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<AddNewBlog />} />
    </div>
  );
};

// export default addBlogContent;
export default ProtectedRoute(addBlogContent, ['admin', 'content_manager']);
