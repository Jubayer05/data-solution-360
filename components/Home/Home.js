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

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <AboutHome />
      <Service />
      <CrashCourse />
      <TeamMember />
      <Technology />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;
