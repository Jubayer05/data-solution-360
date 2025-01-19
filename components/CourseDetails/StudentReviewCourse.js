import React from 'react';
import ReviewSlider from '../Home/Review/ReviewSlider';

const StudentReviewCourse = ({ courseDetails }) => {
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-center flex-col items-center ">
        <div className="text-[rgb(32,180,134)] bg-[#d1fadf] w-fit px-3 py-1 rounded-full text-lg font-semibold">
          Feedback
        </div>
        <h2 className="capitalize text-3xl font-bold mt-2 font-heading">
          Listen from our <span className="text-[#ffab00]">learners</span>
        </h2>
      </div>

      <div className="">
        {/* {studentReview?.map((item) => (
          <div key={item.id} className="p-4 border rounded-md relative h-fit">
            <p className="text-sm text-[#1d2939]">{item.review}</p>
            <div className="h-[1.5px] bg-slate-300 mb-1 " />
            <h2 className="text-sm font-semibold uppercase text-[#101828]">
              {item.studentName}
            </h2>
            <span className="absolute right-5 bottom-4 bg-[#fff9e6] p-1 rounded-full">
              <BiSolidQuoteAltRight className="text-xl text-[#fec001]" />
            </span>
          </div>
        ))} */}
        <ReviewSlider />
      </div>
    </div>
  );
};

export default StudentReviewCourse;
