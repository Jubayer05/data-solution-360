import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { useStateContext } from '../../src/context/ContextProvider';
import { loadData } from '../../src/hooks/loadData';
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
import BlogHome from './BlogHome';
import CouponCountdown from './Discount/CouponCountdown';
import JoinFree from './JoinFree';
import AddVideoReview from './Review/AddVideoReview';
import Review from './Review/Review';
import Subscribe from './Subscribe';
// import BannerCarousel from "./BannerCarousel";

const Home = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [couponData, setCouponData] = useState([]);
  const { globalLoading } = useStateContext();

  useEffect(() => {
    const hasVisitedBefore = sessionStorage.getItem('popup');
    if (!hasVisitedBefore) {
      setShowPopup(true);
      sessionStorage.setItem('popup', true);
    }
    loadData('coupon_code', setCouponData);
  }, []);

  const activeCoupon = couponData.find((data) => data.isActive === true);

  return (
    <div className="bg-[#f9f9fa]">
      {globalLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Image
            width={500}
            height={300}
            src="/logo/logo.png"
            className="w-[250px] animate-pulse"
            alt=""
          />
        </div>
      ) : (
        <>
          {showPopup && <Popup handler={setShowPopup} />}
          {activeCoupon?.isActive && (
            <CouponCountdown couponData={activeCoupon} />
          )}
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
