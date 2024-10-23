import { useRouter } from 'next/router';
import React from 'react';

const EditCourseItem = () => {
  const router = useRouter();
  const { courseId } = router?.query;

  return <div>{courseId}</div>;
};

export default EditCourseItem;
