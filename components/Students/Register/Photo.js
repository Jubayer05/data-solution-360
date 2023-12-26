import { Progress } from 'antd';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';

const ContactInfo = () => {
  const { userEmail, findCurrentUser } = useStateContext();
  const [photoUrl, setPhotoUrl] = useState('');
  const [progressData, setProgressData] = useState('');

  const formik = useFormik({
    initialValues: {
      photoUrl: photoUrl,
    },
    // validate,
    onSubmit: (values) => {
      firebase
        .firestore()
        .collection('userLogin')
        .doc(findCurrentUser.key)
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

  const handleFileSubmit = (e) => {
    const fileSize = document.getElementById('photoUrl').files[0].size;
    const profileImg = e.target.files[0];

    if (fileSize < 512000) {
      const uploadTask = firebase
        .storage()
        .ref(`profileImage/${userEmail}/${profileImg?.name}`)
        .put(profileImg);
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
            .ref('profileImage')
            .child(userEmail)
            .child(profileImg?.name)
            .getDownloadURL()
            .then((url) => {
              // NOTE: use this url
              setPhotoUrl(url);
            });
        },
      );
    } else {
      alert('File Size must be under 500kb');
    }
    console.log(fileSize);
  };

  console.log(photoUrl);
  const conicColors = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
  };

  return (
    <div>
      <div className="pt-4 pb-5 px-5 ">
        <div className="max-w-xl mx-auto bg-white shadow-md border-solid rounded-lg border-gray-300 p-5 my-4">
          <h2 className=" text-xl text-[#1aa5d3] mt-2 mb-6">Contact Info</h2>
          <div className="mb-6 -mt-3 bg-[#bac6ca] h-0.5" />
          <form onSubmit={formik.handleSubmit}>
            {/* NOTE: EMAIL */}
            <div className="flex items-center mb-3">
              <label htmlFor="email" className="w-[300px]">
                Email
              </label>
              <input
                id="photoUrl"
                name="photoUrl"
                type="file"
                onChange={handleFileSubmit}
                className="w-full px-2 py-3 rounded-md bg-[#fafafa] outline-none"
              />
            </div>

            <div className="text-center mx-auto px-4">
              <Progress
                percent={progressData}
                size="small"
                strokeColor={conicColors}
              />
              {/* <Progress percent={100} /> */}
              {/* <Space size={30}>
                <Progress type="circle" percent={50} size="small" />
                <Progress type="circle" percent={50} size={20} />
              </Space> */}
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

export default ContactInfo;
