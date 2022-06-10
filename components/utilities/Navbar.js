import React from "react";
import { Button } from "../index";

const Navbar = () => {
  return (
    <div className="fixed bg-white w-full text-center">
      <div className="max-w-6xl mx-auto flex justify-between items-center h-20">
        <h2 className="text-3xl">Logo</h2>
        <ul className="flex justify-between">
          <li className="mx-2 cursor-pointer border-b-2 border-transparent hover:border-slate-500 font-bold">
            Home
          </li>
          <li className="mx-2 cursor-pointer border-b-2 border-transparent hover:border-slate-500 font-bold">
            About
          </li>
          <li className="mx-2 cursor-pointer border-b-2 border-transparent hover:border-slate-500 font-bold">
            Service
          </li>
          <li className="mx-2 cursor-pointer border-b-2 border-transparent hover:border-slate-500 font-bold">
            Blog
          </li>
        </ul>
        <Button
          color="#eee"
          bgColor="rgb(2, 7, 62)"
          text="Contact Us"
          size=""
          borderRadius="5px"
        />
      </div>
    </div>
  );
};

export default Navbar;
