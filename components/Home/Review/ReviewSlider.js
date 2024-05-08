/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { AiFillCaretRight } from 'react-icons/ai';
import Modal from 'react-modal';
import Slider from 'react-slick';
import StarRatings from 'react-star-ratings';
import { useStateContext } from '../../../src/context/ContextProvider';

const ReviewSlider = () => {
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
    slidesToScroll: 3,
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
    <div>
      <Slider {...settings}>
        {studentReview?.map((item) => (
          <div key={item?.key} className="p-5 m-5 w-[150px] overflow-hidden">
            <div className="bg-[white] px-[15px] py-[30px] rounded-[5px] mb-[40px] relative shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <div className="flex items-center mb-[15px] h-[100px]">
                <img
                  className="h-[65px] w-[60px] object-cover rounded-[3px] mr-[15px]"
                  src={item?.img}
                  alt={item?.student_name}
                />
                <div>
                  <h2 className="text-xl font-bold leading-8 text-[#231f40]">
                    {item?.student_name}
                  </h2>
                  <p className="text-[#525fe1] font-medium -mt-2">
                    {item?.profession}
                  </p>
                </div>
              </div>
              <p className="text-base leading-7 text-[#6f6b80] mb-[24px] h-[140px]">
                &ldquo;{cutFirst50Words(item?.review)}
                {countWords(item?.review) >= 20 ? (
                  <>
                    <a type="button" onClick={() => openModal(item)}>
                      see more
                    </a>
                    <Modal
                      isOpen={modalIsOpen}
                      // onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <div className="max-w-xl mx-5">
                        <div className="flex items-center justify-center mb-[15px]">
                          <img
                            className="h-[55px] object-cover rounded-[3px] mr-[15px]"
                            src={modalData?.img}
                            alt={modalData?.student_name}
                          />
                          <div>
                            <h2 className="text-xl font-bold leading-8 text-[#231f40]">
                              {modalData?.student_name}
                            </h2>
                            <p className="text-[#525fe1] font-medium -mt-2">
                              {modalData?.profession}
                            </p>
                          </div>
                        </div>
                        <p className="text-base leading-7 text-[#6f6b80] mb-[24px]">
                          {modalData?.review}
                        </p>

                        <div className="text-center pt-6">
                          <button
                            className="bg-[#ff3f3f] text-white rounded-lg px-5 py-2"
                            onClick={closeModal}
                          >
                            close
                          </button>
                        </div>
                      </div>
                    </Modal>
                  </>
                ) : (
                  ''
                )}
                &rdquo;
              </p>
              <div>
                <StarRatings
                  rating={5}
                  numberOfStars={5}
                  name="rating"
                  starDimension="22px"
                  starSpacing="3px"
                  starRatedColor="#ffa534"
                />
              </div>
              <AiFillCaretRight className="text-7xl text-white absolute -bottom-8 left-4 -z-10" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewSlider;
