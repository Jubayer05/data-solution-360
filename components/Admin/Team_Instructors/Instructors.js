import React, { useEffect, useState } from 'react';

import { loadData } from '../../../src/hooks/loadData';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';
import AddProfile from './AddProfile';

const Instructors = () => {
  const [instructor, setInstructor] = useState([]);

  useEffect(() => {
    loadData('instructors', setInstructor);
  }, []);

  return (
    <div>
      <HeadingDashboard title="Instructor Information" />
      <div className="max-w-3xl mx-auto my-20">
        <AddProfile
          db_name="instructors"
          profile={instructor}
          showRole={false}
        />
      </div>
    </div>
  );
};

export default Instructors;
