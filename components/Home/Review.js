/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Button } from "antd";
import Slider from "react-slick";
import StarRatings from "react-star-ratings";
import { AiFillCaretRight } from "react-icons/ai";
import { reviewData } from "../../src/data/data";
import Modal from "react-modal";

const Review = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  console.log(modalData);

  const openModal = (item) => {
    setModalData(item);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    content: {
      background: "#fff",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 350,
    autoplaySpeed: 3000,
    cssEase: "linear",
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
    if (str.length > 50) {
      return str.substr(0, 250) + "...";
    } else {
      return str;
    }
  }

  function countWords(str) {
    return str.trim().split(/\s+/).length;
  }

  return (
    <div className="bg-[url('/review/review-bg.jpg')] flex items-center justify-center bg-center bg-cover bg-no-repeat">
      <div className="my-4 mb-14 max-w-[350px] sm:max-w-2xl md:max-w-4xl lg:max-w-6xl pr-[30px]">
        <h1 className="text-center text-3xl font-bold font-heading mt-16 text-headerMain">
          Our Lovely Students Feedback
        </h1>

        <div>
          <Slider {...settings}>
            {reviewData.map((item) => (
              <div key={item.id} className="p-5 m-5 w-[150px] overflow-hidden ">
                <div className="bg-[white] px-[15px] py-[30px] rounded-[5px] mb-[40px] relative">
                  <div className="flex items-center mb-[15px]">
                    <img
                      className="h-[55px] object-cover rounded-[3px] mr-[15px]"
                      src={item.photoUrl}
                      alt={item.name}
                    />
                    <div>
                      <h2 className="text-xl font-bold leading-8 text-[#231f40]">
                        {item.name}
                      </h2>
                      <p className="text-[#525fe1] font-medium -mt-2">
                        {item.job}
                      </p>
                    </div>
                  </div>
                  <p className="text-base leading-7 text-[#6f6b80] mb-[24px]">
                    &ldquo;{cutFirst50Words(item.reviewDetails)}{" "}
                    {countWords(item.reviewDetails) >= 30 ? (
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
                                src={modalData?.photoUrl}
                                alt={modalData?.name}
                              />
                              <div>
                                <h2 className="text-xl font-bold leading-8 text-[#231f40]">
                                  {modalData?.name}
                                </h2>
                                <p className="text-[#525fe1] font-medium -mt-2">
                                  {modalData?.job}
                                </p>
                              </div>
                            </div>
                            <p className="text-base leading-7 text-[#6f6b80] mb-[24px]">
                              {modalData?.reviewDetails}
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
                      ""
                    )}
                    &rdquo;
                  </p>
                  <div>
                    <StarRatings
                      rating={4.5}
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
      </div>
    </div>
  );
};

export default Review;
