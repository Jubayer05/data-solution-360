import React from "react";
import {
  Navbar,
  Banner,
  CrashCourse,
  Service,
  Technology,
  Faq,
  Footer,
  AboutHome,
  TeamMember,
} from "../index";
import Review from "./Review";
// import BannerCarousel from "./BannerCarousel";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      {/* <BannerCarousel /> */}
      <AboutHome />
      <Service />
      {/* <CrashCourse /> */}
      {/* <TeamMember /> */}
      <Technology />
      <Review />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;
