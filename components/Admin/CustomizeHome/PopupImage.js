import { Progress } from 'antd';
import { useFormik } from 'formik';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';
import { loadData } from '../../../src/hooks/loadData';
const db = firebase.firestore();

const PopupImage = () => {
  const { userEmail } = useStateContext();
  const [photoUrl, setPhotoUrl] = useState('');
  const [progressData, setProgressData] = useState('');
  const [popupImage, setPopupImage] = useState([]);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    loadData('popupImage', (data) => {
      setPopupImage(data);
      // Initialize isHidden state from Firestore
      const findImageData = data.find(
        (item) => item.id === 'fkmw579u5iajG01FzncO',
      );
      if (findImageData) {
        setIsHidden(findImageData.isHidden || false);
      }
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      trendingCourseLink: '',
      photoUrl: photoUrl,
      isHidden: isHidden,
    },
    onSubmit: (values) => {
      db.collection('popupImage')
        .doc('fkmw579u5iajG01FzncO')
        .update({
          ...values,
          photoUrl: photoUrl,
          isHidden: isHidden,
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
          Swal.fire('Hello!', 'Profile cannot be updated!', 'error');
        });
    },
  });

  const handleToggleHide = () => {
    const newHiddenState = !isHidden;
    setIsHidden(newHiddenState);

    // Update Firestore with new hidden state
    db.collection('popupImage')
      .doc('fkmw579u5iajG01FzncO')
      .update({
        isHidden: newHiddenState,
      })
      .then(() => {
        Swal.fire({
          title: 'Updated',
          text: `Popup image is now ${newHiddenState ? 'hidden' : 'visible'}`,
          icon: 'success',
          confirmButtonText: 'Okay',
        });
      })
      .catch((err) => {
        Swal.fire('Error', 'Could not update visibility', 'error');
      });
  };

  const handleFileSubmit = (e) => {
    const fileSize = e.target.files[0].size;
    const courseImg = e.target.files[0];

    if (fileSize < 1024000) {
      const uploadTask = firebase
        .storage()
        .ref(`trendingImage/${userEmail}/${courseImg?.name}`)
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
            .ref('trendingImage')
            .child(userEmail)
            .child(courseImg?.name)
            .getDownloadURL()
            .then((url) => {
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

  const findImageData = popupImage.find(
    (item) => item.id === 'fkmw579u5iajG01FzncO',
  );

  return (
    <div id="popup_image">
      <div className="pt-10 pb-4 px-5 ">
        <div className="max-w-3xl mx-auto bg-white shadow-md border-solid rounded-lg border-gray-300 p-5 my-4">
          <h2 className=" text-xl text-[#1aa5d3] mt-2 mb-6">Popup Image</h2>
          <div className="mb-6 -mt-3 bg-[#bac6ca] h-0.5" />

          <div className="flex justify-between items-center mb-4">
            <h2>Current Popup Image</h2>
            <button
              onClick={handleToggleHide}
              className={`px-4 py-2 rounded ${
                isHidden ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}
            >
              {isHidden ? 'Show Popup' : 'Hide Popup'}
            </button>
          </div>

          {!isHidden && (
            <div className="w-[400px] mx-auto">
              <Image
                width={500}
                height={300}
                src={findImageData?.photoUrl}
                alt="Trending Images"
                className="rounded-lg"
              />
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
            {/* NOTE: photoUrl */}
            <div className="flex items-center mb-3 mt-20">
              <label htmlFor="photoUrl" className="w-[240px] sm:w-[300px]">
                Change popup image
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

export default PopupImage;
