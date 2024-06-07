/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { useStateContext } from '../../../src/context/ContextProvider';
import ReviewSlider from './ReviewSlider';

const Review = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const { studentReview } = useStateContext();

  const openModal = (item) => {
    setModalData(item);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    content: {
      background: '#fff',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 350,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  function cutFirst50Words(str) {
    if (str?.length > 30) {
      return str.substring(0, 132) + '...';
    } else {
      return str;
    }
  }

  function countWords(str) {
    return str?.trim().split(/\s+/).length;
  }

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

            <ReviewSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
