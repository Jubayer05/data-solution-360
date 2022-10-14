import React from "react";

const TeamMemberComp = () => {
  return (
    <div className="bg-[#fff]">
      <div className="max-w-6xl py-10 mx-auto">
        <div className="flex items-center">
          <div className="flex-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/team/home-emp.jpg"
              className="h-[370px] ml-5 rounded-xl"
              alt="img"
            />
          </div>
          <div className="flex-1">
            <h2 className="pl-12 text-3xl font-bold font-heading mt-16 text-headerMain	">
              Join as a team member
            </h2>
            <p className="pl-12 font-bold font-heading text-headerMain	">
              If you want to work with Data Solution - 360 please click on the
              apply now button and follow next steps.
            </p>
            <button className="ml-12 text-base px-8 py-4 border-2 rounded-lg  hover:bg-primary-bg transition-all duration-300 ease-linear bg-white text-primary hover:text-white border-primary">
              Apply Now
            </button>
          </div>
        </div>
        <div className="flex items-center mt-20">
          <div className="flex-1">
            <h2 className="pr-12 text-3xl font-bold font-heading mt-16 text-headerMain	">
              Join as a student
            </h2>
            <p className="pr-12 font-bold font-heading text-headerMain	">
              Joining as a student in Data Solution - 360 click on the apply now
              button and follow next steps.
            </p>
            <button className=" text-base px-8 py-4 border-2 rounded-lg  hover:bg-primary-bg transition-all duration-300 ease-linear bg-white text-primary hover:text-white border-primary">
              Apply Now
            </button>
          </div>
          <div className="flex-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/team/home-stu.jpg"
              className="h-[370px] ml-5 rounded-xl"
              alt="img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberComp;
