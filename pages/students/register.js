import React from "react";
import { Footer, Navbar, RegisterComp } from "../../components";

const register = () => {
  return (
    <div>
      <Navbar />
      <RegisterComp title="Please Register Before Next Step" />
      <Footer />
    </div>
  );
};

export default register;
