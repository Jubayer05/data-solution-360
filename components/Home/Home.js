import React from 'react';
import {
  AboutHome,
  Banner,
  CrashCourse,
  Faq,
  Footer,
  Navbar,
  Service,
  Technology,
} from '../index';
import WhatsApp from '../utilities/WhatsApp';
import Review from './Review';
import Subscribe from './Subscribe';
// import BannerCarousel from "./BannerCarousel";

const Home = () => {
  return (
    <div>
      <>
        <Navbar />
        <Banner />
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
