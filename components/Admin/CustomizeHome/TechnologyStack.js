/* eslint-disable @next/next/no-img-element */
import { Progress } from 'antd';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';
const db = firebase.firestore();

const TechnologyStack = () => {
  const { userEmail, technologyStack } = useStateContext();
  const [img, setImg] = useState('');
  const [progressData, setProgressData] = useState('');

  const formik = useFormik({
    initialValues: {
      titleIcon: '',
      img: img,
    },
    onSubmit: (values) => {
      db.collection('technology_stack')
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
        db.collection('technology_stack')
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
    <div id="technology_stack">
      <div className="pt-10 pb-4 px-5 ">
        <div className="max-w-3xl mx-auto bg-white shadow-md border-solid rounded-lg border-gray-300 p-5 my-4">
          <h2 className=" text-xl text-[#1aa5d3] mt-2 mb-6">
            Technology Stack
          </h2>
          <div className="mb-6 -mt-3 bg-[#bac6ca] h-0.5" />
          <h2>Current Technology Stack</h2>
          <div className="w-[600px] mx-auto flex justify-center items-center flex-wrap gap-6">
            {technologyStack?.map((item) => (
              <div
                key={item?.key}
                className="bg-white shadow-md w-28 h-28 flex items-center justify-center flex-col
              rounded-lg  relative group"
              >
                <div className="absolute -top-3 -right-3 hidden group-hover:block">
                  <RxCross1
                    onClick={() => handleRemoveTechnology(item)}
                    className="text-2xl cursor-pointer bg-black border-2 p-1 rounded-full text-white"
                  />
                </div>
                <img src={item?.img} alt="" className="w-20" />
                <p className="m-0">{item?.titleIcon}</p>
              </div>
            ))}
          </div>
          <form onSubmit={formik.handleSubmit}>
            {/* NOTE: photoUrl */}
            <div className="flex items-center mb-3 mt-20">
              <label htmlFor="img" className="w-[240px] sm:w-[300px]">
                Add Icon
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
              <label htmlFor="titleIcon" className="w-[240px] sm:w-[300px]">
                Title of icon
              </label>
              <input
                id="titleIcon"
                name="titleIcon"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.titleIcon}
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
export default TechnologyStack;
