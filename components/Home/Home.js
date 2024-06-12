/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../src/context/ContextProvider';
import {
  AboutHome,
  Discount,
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
import BlogHome from './BlogHome';
import JoinFree from './JoinFree';
import AddVideoReview from './Review/AddVideoReview';
import Review from './Review/Review';
import Subscribe from './Subscribe';
// import BannerCarousel from "./BannerCarousel";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { globalLoading } = useStateContext();

  useEffect(() => {
    const hasVisitedBefore = sessionStorage.getItem('popup');
    if (!hasVisitedBefore) {
      setShowPopup(true);

      sessionStorage.setItem('popup', true);
    }
  }, []);

  return (
    <div className="bg-[#f9f9fa]">
      {globalLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <img
            src="/logo/logo.png"
            className="w-[250px] animate-pulse"
            alt=""
          />
        </div>
      ) : (
        <>
          {showPopup && <Popup handler={setShowPopup} />}
          <Discount />
          <Navbar />
          <MainBanner />
          {/* <BannerCompanies /> */}
          {/* <BannerCarousel /> */}
          <HomeCourse />
          <JoinFree />
          {/* <GameChanger /> */}
          <Service />
          <AboutHome />
          <AddVideoReview />
          <Technology />
          <Faq />
          <Review />
          <BlogHome />
          <Subscribe />
          <Footer />
          <WhatsApp />
        </>
      )}
    </div>
  );
};

export default Home;
