import { Progress } from 'antd';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';
const db = firebase.firestore();

const SlideMainBanner = () => {
  const { userEmail, slidesMainBannerData } = useStateContext();
  const [img, setImg] = useState('');
  const [progressData, setProgressData] = useState('');

  const formik = useFormik({
    initialValues: {
      titleCourse: '',
      courseLink: '',
      img: img,
    },
    onSubmit: (values) => {
      db.collection('slides_main_banner')
        .add({
          ...values,
          img: img,
        })
        .then(() => {
          Swal.fire({
            title: 'Hello',
            text: 'Technology added successfully!',
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

  const handleFileSubmit = (e) => {
    // const fileSize = document.getElementById('photoUrl').files[0].size;
    const fileSize = e.target.files[0].size;
    const technologyImg = e.target.files[0];

    if (fileSize < 1024000) {
      const uploadTask = firebase
        .storage()
        .ref(`technologyIcon/${userEmail}/${technologyImg?.name}`)
        .put(technologyImg);
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
            .ref('technologyIcon')
            .child(userEmail)
            .child(technologyImg?.name)
            .getDownloadURL()
            .then((url) => {
              // NOTE: use this url
              setImg(url);
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
        db.collection('slides_main_banner')
          .doc(item.key)
          .delete()
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Your technology item has been deleted.',
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
    <div id="slide_main_banner">
      <div className="pt-10 pb-4 px-5 ">
        <div className="max-w-3xl mx-auto bg-white shadow-md border-solid rounded-lg border-gray-300 p-5 my-4">
          <h2 className=" text-xl text-[#1aa5d3] mt-2 mb-6">Slides Banner</h2>
          <div className="mb-6 -mt-3 bg-[#bac6ca] h-0.5" />
          <h2>Current Slides Banner Data</h2>
          <div className="flex justify-between items-center flex-wrap gap-6">
            {slidesMainBannerData?.map((item) => (
              <div
                key={item?.key}
                className="w-full bg-white shadow-md flex items-center justify-between
              rounded-lg relative group px-3 py-2"
              >
                {/* <div className="absolute -top-3 -right-3 hidden group-hover:block">
                  <RxCross1
                   
                    className="text-2xl cursor-pointer bg-black border-2 p-1 rounded-full text-white"
                  />
                </div> */}
                <div className="flex items-center gap-2">
                  <Image
                    width={500}
                    height={300}
                    src={item?.img}
                    alt=""
                    className="w-28"
                  />
                  <div>
                    <p className="m-0">{item?.titleCourse}</p>
                    <Link
                      href={item?.courseLink}
                      className="text-blue-500"
                      target="_blank"
                      style={{ color: 'blue' }}
                    >
                      View Links
                    </Link>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveTechnology(item)}
                  className="px-2 py-1 ml-2 text-[12px] bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <form onSubmit={formik.handleSubmit}>
            {/* NOTE: photoUrl */}
            <div className="flex items-center mb-3 mt-20">
              <label htmlFor="img" className="w-[240px] sm:w-[300px]">
                Add Image
              </label>
              <input
                id="img"
                name="img"
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
              <label htmlFor="titleCourse" className="w-[240px] sm:w-[300px]">
                Course Title
              </label>
              <input
                id="titleCourse"
                name="titleCourse"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.titleCourse}
                className="w-full px-2 py-3 rounded-md bg-[#f1f1f1] outline-none"
              />
            </div>

            <div className="flex items-center mt-3">
              <label htmlFor="titleCourse" className="w-[240px] sm:w-[300px]">
                Course Details Link
              </label>
              <input
                id="courseLink"
                name="courseLink"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.courseLink}
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
export default SlideMainBanner;
