import React from 'react';
import HeadingDashboard from '../../utilities/HeadingDashboard';
import AddFaq from './AddFaq';
import EditFaq from './EditFaq';
import ManageYoutube from './ManageYoutube';
import PopupImage from './PopupImage';
import ShortCut from './ShortCut';
import StudentFeedback from './StudentFeedback';
import TechnologyStack from './TechnologyStack';
import TrendingCourse from './TrendingCourse';

const CustomizeHome = () => {
  return (
    <div className="relative">
      <HeadingDashboard title={`Customize the content of Home Page`} />
      <ShortCut />
      <AddFaq />
      <EditFaq />
      <TrendingCourse />
      <PopupImage />
      <ManageYoutube />
      <TechnologyStack />
      <StudentFeedback />
    </div>
  );
};

export default CustomizeHome;
