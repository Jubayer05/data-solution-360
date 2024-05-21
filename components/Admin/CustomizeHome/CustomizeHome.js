import React from 'react';
import HeadingDashboard from '../../utilities/HeadingDashboard';
import AddFaq from './AddFaq';
import CountdownAdmin from './CountDown';
import EditFaq from './EditFaq';
import HomeYoutube from './HomeYoutube';
import PopupImage from './PopupImage';
import ShortCut from './ShortCut';
import SlideMainBanner from './SlideMainBanner';
import StudentFeedback from './StudentFeedback';
import StudentFeedbackVideo from './StudentsFeedbackVideo';
import TechnologyStack from './TechnologyStack';
import TrendingCourse from './TrendingCourse';

const CustomizeHome = () => {
  return (
    <div className="relative">
      <HeadingDashboard title={`Customize the content of Home Page`} />
      <ShortCut />
      <SlideMainBanner />
      <CountdownAdmin />
      <AddFaq />
      <EditFaq />
      <TrendingCourse />
      <PopupImage />
      <HomeYoutube />
      <TechnologyStack />
      <StudentFeedbackVideo />
      <StudentFeedback />
    </div>
  );
};

export default CustomizeHome;
