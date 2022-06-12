import React from "react";
import {
  Navbar,
  Banner,
  CrashCourse,
  Service,
  Technology,
  Faq,
} from "../index";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Service />
      <CrashCourse />
      <Technology />
      <Faq />
    </div>
  );
};

export default Home;
