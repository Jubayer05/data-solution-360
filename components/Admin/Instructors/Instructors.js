import React, { useState } from 'react';

import HeadingDashboard from '../../utilities/HeadingDashboard';
import AddInstructor from './AddInstructor';

const Instructors = () => {
  const [instructor, setInstructor] = useState([]);

  const handleSubmitClick = () => {};

  return (
    <div>
      <HeadingDashboard title="Manage Courses" />
      <div className="max-w-3xl mx-auto my-20">
        <AddInstructor instructor={instructor} setInstructor={setInstructor} />
      </div>
    </div>
  );
};

export default Instructors;
