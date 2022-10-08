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
} from "../index";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <AboutHome />
      <Service />
      <CrashCourse />
      <Technology />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;
