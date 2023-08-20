import React, { useEffect, useState } from 'react';
import {
  AboutHome,
  CrashCourse,
  Faq,
  Footer,
  MainBanner,
  Navbar,
  Popup,
  Service,
  Technology,
} from '../index';
import WhatsApp from '../utilities/WhatsApp';
import Review from './Review';
import Subscribe from './Subscribe';
// import BannerCarousel from "./BannerCarousel";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = sessionStorage.getItem('popup');
    if (!hasVisitedBefore) {
      setShowPopup(true);

      sessionStorage.setItem('popup', true);
    }
  }, []);

  return (
    <div>
      <>
        {showPopup && <Popup handler={setShowPopup} />}
        {/* <Discount /> */}
        {/* <Navbar home="home" /> */}
        <Navbar />
        <MainBanner />
        {/* <BannerCompanies /> */}
        {/* <BannerCarousel /> */}
        <AboutHome />
        <Service />
        <CrashCourse />
        {/* <TeamMember /> */}
        <Technology />
        <Review />
        <Faq />
        <Subscribe />
        <Footer />
      </>
      <WhatsApp />
    </div>
  );
};

export default Home;
