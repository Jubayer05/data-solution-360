import React from 'react';
import { freeCourseData } from '../../src/data/dummy';

const FreeCourseHome = () => {
  return (
    <div className="max-w-6xl mx-auto py-3">
      {/* Available course */}
      <h2 className="font-heading text-3xl">Available Free Courses for you</h2>
      {freeCourseData?.map((item) => (
        <FreeCourseItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default FreeCourseHome;

const FreeCourseItem = ({ item }) => {
  return (
    <div className="h-[50vh] flex justify-center items-center">
      <h1 className="text-3xl font-bold font-heading text-center">
        Coming soon!
      </h1>
    </div>
  );
};
