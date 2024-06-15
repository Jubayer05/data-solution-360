/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { useStateContext } from '../../../src/context/ContextProvider';

const Review = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const { studentReview } = useStateContext();

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="bg-[#f9f9fa]	py-4 md:pt-8  px-3" id="courses">
      <div className="relative overflow-hidden max-w-6xl mx-auto rounded-lg shadow">
        <div
          className="absolute h-[200px] w-[200px] top-[-100px] left-[-100px]
        rounded-full bg-[#4478ff] filter blur-[100px]"
        />
        <div
          className="absolute h-[200px] w-[200px] bottom-[-100px] left-[-100px]
        rounded-full bg-[#4478ff] filter blur-[100px]"
        />
        <div
          className="absolute h-[200px] w-[200px] top-[-200px] left-[45%]
        rounded-full bg-[#12b76a] filter blur-[100px]"
        />
        <div
          className="absolute h-[200px] w-[200px] bottom-[-200px] left-[45%]
        rounded-full bg-[#4478ff] filter blur-[100px]"
        />
        <div
          className="absolute h-[200px] w-[200px] top-[-100px] right-[-100px]
        rounded-full bg-[#4478ff] filter blur-[100px]"
        />
        <div
          className="absolute h-[200px] w-[200px] bottom-[-100px] right-[-100px]
        rounded-full bg-[#12b76a] filter blur-[100px]"
        />
        <div className="absolute w-full h-full bg-white opacity-60 left-0" />
        <div
          id="testimonials"
          className="flex items-center justify-center py-4 md:py-8"
        >
          <div className="my-4 max-w-[350px] sm:max-w-2xl md:max-w-4xl lg:max-w-[1100px] z-50">
            <h1 className="text-center text-3xl font-bold font-heading text-headerMain">
              Our Lovely Students{' '}
              <span className="text-[#ffab00]"> Feedback</span>
            </h1>
            <div>
              <div className="flex items-center justify-center py-4 md:py-8">
                <div className="my-4 max-w-[350px] sm:max-w-2xl md:max-w-4xl lg:max-w-[1100px] z-50">
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {studentReview.slice(0, 11).map((item, index) => (
                      <StudentReviewItem
                        key={item.id}
                        item={item}
                        index={index + 1}
                      />
                    ))}
                  </Masonry>
                </div>
              </div>
            </div>
            {/* <ReviewSlider /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;

const StudentReviewItem = ({ item, index }) => {
  console.log(item);
  return (
    <div
      className={`${
        index == 1 || index == 6 || index == 8 ? ' col-span-2' : ''
      } border border-[#bfc1c5] p-2 items-stretch`}
    >
      <div>{item?.review}</div>
      <div className="h-[0.5px] bg-slate-300 w-full my-3" />
      <div className="flex items-center gap-3">
        <img
          src={item?.img}
          className="w-[50px] h-[50px] rounded-full"
          alt=""
        />
        <div>
          <h3 className="text-base font-bold">{item?.student_name}</h3>
          <p className="text-[12px] font-medium text-[#525559]">
            {item?.profession}
          </p>
        </div>
      </div>
    </div>
  );
};
