import Image from 'next/image';
import React, { useState } from 'react';
import { MdStarBorderPurple500 } from 'react-icons/md';
import StarRatings from 'react-star-ratings';
import { useStateContext } from '../../../../src/context/ContextProvider';
import CustomModal from '../../../utilities/CustomModal';

const ModuleFeedback = ({ item }) => {
  const [feedbackData, setFeedbackData] = useState({
    rating: 1,
    message: '',
    user: {},
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const { findCurrentUser } = useStateContext();

  const changeRating = (newRating, name) => {
    setRating(newRating);
    setFeedbackData({ ...feedbackData, rating: newRating });
  };

  const openModal = (item) => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = () => {
    const feedbackDataNew = { ...feedbackData, user: findCurrentUser };
    console.log(feedbackDataNew);
    // TODO: submit to database letter.
  };

  return (
    <div className="w-full">
      {item.moduleNumber < 5 && (
        <button
          onClick={() => openModal(item)}
          className="flex justify-center items-center gap-2 bg-hover_btn hover:bg-[#fecb63] font-semibold
          py-2 px-4 rounded border-orange-400 border w-full"
        >
          Feedback <MdStarBorderPurple500 />
        </button>
      )}

      <CustomModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        setModalIsOpen={setModalIsOpen}
      >
        <div className="px-10">
          <Image
            width={500}
            height={300}
            src="/icon/review.png"
            className="w-20 mx-auto"
            alt=""
          />
          <h3 className="text-center font-semibold font-heading mt-3">
            Give feedback about Module {item.moduleNumber}
          </h3>
          <p className="text-center font-heading mt-1">
            Give us rating about the services of Module {item.moduleNumber} from
            below stars.{' '}
          </p>
          <div className="flex justify-center my-2 py-2 bg-[#fecb6c3a] rounded-md">
            <StarRatings
              rating={rating}
              changeRating={changeRating}
              numberOfStars={5}
              name="rating"
              starRatedColor="#fd6406"
              starHoverColor="#fd6406"
              starDimension="35px"
              starEmptyColor="#ffffff"
            />
          </div>
          <p className="mt-5">
            Write your feedback about Module {item.moduleNumber} in the below
            text box.
          </p>
          <textarea
            name="message"
            id="message"
            rows={5}
            onChange={(e) =>
              setFeedbackData({ ...feedbackData, message: e.target.value })
            }
            className="w-full border outline-[orangered] my-2 text-base font-semibold px-4 py-2"
          ></textarea>
          <button
            onClick={handleSubmit}
            className="flex justify-center items-center gap-2 bg-[#fecb63] 
            font-semibold py-2 px-4 rounded border-orange-400 border w-full mt-2"
          >
            Submit
          </button>
        </div>
      </CustomModal>
    </div>
  );
};

export default ModuleFeedback;
