/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';
const db = firebase.firestore();

const initialReviewState = {
  review: '',
  studentName: '',
};

const CourseReview = ({ studentReview, setStudentReview }) => {
  const { review } = useStateContext();
  // console.log(review);

  const [reviewInfo, setReviewInfo] = useState({
    ...initialReviewState,
  });

  const handleAddReview = (e) => {
    e.preventDefault();

    if (reviewInfo.review !== '' && reviewInfo.studentName !== '') {
      setStudentReview([
        ...studentReview,
        { id: uuidv4().split('-')[0], ...reviewInfo },
      ]);
      // db.collection('reviews')
      //   .add({ ...reviewInfo })
      //   .then(() => {
      //     alert('Review information was successfully uploaded.');
      //     window.location.reload();
      //   })
      //   .catch((error) => {
      //     alert(error.message + '' + 'Something went wrong');
      //   });

      setReviewInfo({ ...initialReviewState });
    } else {
      alert('Please provide a valid information!');
    }
  };

  const handleChange = (e) => {
    setReviewInfo({ ...reviewInfo, [e.target.name]: e.target.value });
  };

  const handleDeleteReview = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const filteredReview = studentReview.filter(
          (element) => element.id !== item.id,
        );

        setStudentReview(filteredReview);
      }
    });
  };

  return (
    <div>
      <div className="bg-[#f0f0f0] shadow-lg rounded-lg border-dashed px-6 py-3 mt-5">
        <h2 className="text-xl text text-center my-4 font-bold">Review List</h2>
        {studentReview?.length === 0 ? (
          <p className="text-base">No review information were added!</p>
        ) : (
          studentReview?.map((item) => (
            <div key={item.id} className="my-4 shadow-md flex items-center">
              <div className="flex-1">
                <div className="px-4 py-2 rounded-lg text-base font-normal flex items-center justify-between gap-10 bg-white">
                  <div className="gap-4">
                    <div>
                      <p className="text-base capitalize m-0">
                        <strong>{item.studentName}</strong>
                      </p>
                      <p className="text-sm m-0">{item?.review}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteReview(item)}
                    className="px-4 py-1.5 mx-4 bg-red-500 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="bg-[#f0f0f0] shadow-lg rounded-lg border-dashed px-6 py-3 mt-10">
        <h2 className="text-xl text text-center my-4 font-bold">Add Review</h2>
        <div className="grid gap-4 grid-cols-1 ">
          <div className="col-span-1">
            <InputBox
              value={reviewInfo.studentName}
              title="Review Name"
              name="studentName"
              id="studentName"
              type="text"
              func={handleChange}
            />
          </div>
          <div className="col-span-1">
            <InputBox
              value={reviewInfo.review}
              title="Review Details"
              name="review"
              id="review"
              type="text"
              func={handleChange}
            />
          </div>
        </div>

        <div className="w-full text-center pt-5 pb-4">
          <button
            onClick={handleAddReview}
            className="px-4 py-3 bg-blue-500 text-white rounded-md"
          >
            Add Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseReview;

const InputBox = ({ title, type, id, func, placeholder, name, value }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="font-semibold block text-[#17012e]">
        {title}
      </label>
      <input
        value={value}
        id={id}
        onChange={func}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
      />
    </div>
  );
};
