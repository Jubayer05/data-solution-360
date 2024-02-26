import React, { useEffect, useState } from 'react';
import {
  AboutHome,
  Faq,
  Footer,
  HomeCourse,
  MainBanner,
  Navbar,
  Popup,
  Service,
  Technology,
} from '../index';
import WhatsApp from '../utilities/WhatsApp';
import JoinFree from './JoinFree';
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
    <div className="bg-[#f9f9fa]">
      <>
        {showPopup && <Popup handler={setShowPopup} />}
        {/* <Discount /> */}
        <Navbar />
        <MainBanner />
        {/* <BannerCompanies /> */}
        {/* <BannerCarousel /> */}
        <HomeCourse />
        <JoinFree />
        <Service />
        <AboutHome />
        <Technology />
        <Faq />
        <Review />
        <Subscribe />
        <Footer />
      </>
      <WhatsApp />
    </div>
  );
};

export default Home;
