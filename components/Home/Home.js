import React from "react";
import {
  Navbar,
  Banner,
  CrashCourse,
  Service,
  Technology,
  Faq,
  Footer
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
      <Footer />
    </div>
  );
};

export default Home;
