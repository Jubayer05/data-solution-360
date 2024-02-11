/* eslint-disable @next/next/no-img-element */
import { Progress } from 'antd';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';
const db = firebase.firestore();

const TrendingCourse = () => {
  const { userEmail, trendingCourse } = useStateContext();
  const [photoUrl, setPhotoUrl] = useState('');
  const [progressData, setProgressData] = useState('');

  const formik = useFormik({
    initialValues: {
      trendingCourseLink: '',
      photoUrl: photoUrl,
    },
    onSubmit: (values) => {
      firebase
        .firestore()
        .collection('trendingCourse')
        .doc('vMVpfcjol5dGUyiVZDDO')
        .update({
          ...values,
          photoUrl: photoUrl,
        })
        .then(() => {
          Swal.fire({
            title: 'Hello',
            text: 'Your photo is uploaded successfully!',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        })
        .catch((err) => {
          Swal.fire('Hello!', 'Profile cannot updated!', 'error');
        });
    },
  });

  // console.log(trendingCourse[0]);

  const handleFileSubmit = (e) => {
    const fileSize = document.getElementById('photoUrl').files[0].size;
    const courseImg = e.target.files[0];

    if (fileSize < 1024000) {
      const uploadTask = firebase
        .storage()
        .ref(`courseImage/${userEmail}/${courseImg?.name}`)
        .put(courseImg);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );

          setProgressData(progress);
        },
        (error) => {
          alert(error.message + '' + 'Something went wrong');
        },
        () => {
          firebase
            .storage()
            .ref('courseImage')
            .child(userEmail)
            .child(courseImg?.name)
            .getDownloadURL()
            .then((url) => {
              // NOTE: use this url
              setPhotoUrl(url);
            });
        },
      );
    } else {
      alert('File Size must be under 1mb.');
    }
  };

  const conicColors = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
  };

  return (
    <div>
      <div className="pt-10 pb-4 px-5 ">
        <div className="max-w-3xl mx-auto bg-white shadow-md border-solid rounded-lg border-gray-300 p-5 my-4">
          <h2 className=" text-xl text-[#1aa5d3] mt-2 mb-6">Trending Course</h2>
          <div className="mb-6 -mt-3 bg-[#bac6ca] h-0.5" />
          <h2>Current Trending Image</h2>
          <div className="w-[400px] mx-auto">
            <img
              src={trendingCourse[0]?.photoUrl}
              alt="Trending Images"
              className="rounded-lg"
            />
          </div>
          <form onSubmit={formik.handleSubmit}>
            {/* NOTE: photoUrl */}
            <div className="flex items-center mb-3 mt-20">
              <label htmlFor="photoUrl" className="w-[240px] sm:w-[300px]">
                Change trending image
              </label>
              <input
                id="photoUrl"
                name="photoUrl"
                type="file"
                onChange={handleFileSubmit}
                className="w-full px-2 py-3 rounded-md bg-[#f1f1f1] outline-none"
              />
            </div>

            <div className="text-center mx-auto px-4">
              <Progress
                percent={progressData}
                size="small"
                strokeColor={conicColors}
              />
            </div>

            <div className="flex items-center mt-3">
              <label
                htmlFor="trendingCourseLink"
                className="w-[240px] sm:w-[300px]"
              >
                Link of the trending course
              </label>
              <input
                id="trendingCourseLink"
                name="trendingCourseLink"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.trendingCourseLink}
                className="w-full px-2 py-3 rounded-md bg-[#f1f1f1] outline-none"
              />
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                disabled={progressData === 100 ? false : true}
                className="w-full bg-primary-bg text-white px-3 py-2 rounded-lg "
              >
                Save and Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
``;
export default TrendingCourse;
