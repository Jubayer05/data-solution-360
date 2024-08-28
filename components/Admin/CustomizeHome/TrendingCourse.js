import { Progress } from 'antd';
import { useFormik } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
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
        .add({
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

  const handleRemoveTechnology = (item) => {
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
        db.collection('trendingCourse')
          .doc(item.key)
          .delete()
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Your trending course has been deleted.',
              'success',
            );
          })
          .catch((error) => {
            Swal.fire('Error!', 'Something went wrong.', 'error');
          });
      }
    });
  };

  return (
    <div id="trending_course">
      <div className="pt-10 pb-4 px-5 ">
        <div className="max-w-3xl mx-auto bg-white shadow-md border-solid rounded-lg border-gray-300 p-5 my-4">
          <h2 className=" text-xl text-[#1aa5d3] mt-2 mb-6">Trending Course</h2>
          <div className="mb-6 -mt-3 bg-[#bac6ca] h-0.5" />
          <h2>Current Trending Images</h2>
          <div className="w-full grid grid-cols-2 gap-2">
            {trendingCourse?.map((item) => (
              <div key={item.key} className="relative group">
                <Image
                  width={500}
                  height={300}
                  src={item?.photoUrl}
                  alt="Trending Images"
                  className="rounded-lg"
                />
                <div className="absolute -top-3 -right-3 hidden group-hover:block">
                  <RxCross1
                    onClick={() => handleRemoveTechnology(item)}
                    className="text-2xl cursor-pointer bg-black border-2 p-1 rounded-full text-white"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-20">
            <p className="text-center text-[orangered]">
              {trendingCourse.length > 0 && 'NOTE: Add another trending course'}
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            {/* NOTE: photoUrl */}
            <div className="flex items-center mb-3">
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
