/* eslint-disable @next/next/no-img-element */
import React from "react";
import Slider from "react-slick";
import StarRatings from "react-star-ratings";
import { AiFillCaretRight } from "react-icons/ai";

const Review = () => {
  const reviewData = [
    {
      id: "1",
      name: "Stive Marlone",
      job: "Data analytics",
      photoUrl: "https://randomuser.me/api/portraits/men/34.jpg",
      reviewDetails:
        "I had an amazing experience with Data solution 360. The instructor were knowledgeable and passionate and the curse work was challenging and relevant to my future career.",
      star: 5,
    },
    {
      id: "2",
      name: "James Carlson",
      job: "Software Engineer",
      photoUrl: "https://randomuser.me/api/portraits/women/34.jpg",
      reviewDetails:
        "I had an amazing experience with Data solution 360. The instructor were knowledgeable and passionate and the curse work was challenging and relevant to my future career.",
      star: 5,
    },
    {
      id: "3",
      name: "Nancy Phipps",
      job: "Data analytics",
      photoUrl: "https://randomuser.me/api/portraits/women/42.jpg",
      reviewDetails:
        "I had an amazing experience with Data solution 360. The instructor were knowledgeable and passionate and the curse work was challenging and relevant to my future career.",
      star: 5,
    },
    {
      id: "4",
      name: "Adam Smith",
      job: "Web Developer",
      photoUrl: "https://randomuser.me/api/portraits/men/54.jpg",
      reviewDetails:
        "I had an amazing experience with Data solution 360. The instructor were knowledgeable and passionate and the curse work was challenging and relevant to my future career.",
      star: 5,
    },
    {
      id: "5",
      name: "Walter Wilford",
      job: "Data analytics",
      photoUrl: "https://randomuser.me/api/portraits/women/14.jpg",
      reviewDetails:
        "I had an amazing experience with Data solution 360. The instructor were knowledgeable and passionate and the curse work was challenging and relevant to my future career.",
      star: 5,
    },
  ];
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
                    &ldquo;{item.reviewDetails}&rdquo;
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
