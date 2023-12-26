import { useFormik } from 'formik';
import React from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';

const Academic = () => {
  const { findCurrentUser } = useStateContext();

  const formik = useFormik({
    initialValues: {
      universityName: '',
      educationLevel: '',
      skillSet: '',
      language: '',
    },
    // validate,
    onSubmit: (values) => {
      firebase
        .firestore()
        .collection('userLogin')
        .doc(findCurrentUser.key)
        .update({
          ...values,
        })
        .then(() => {
          Swal.fire({
            title: 'Hello',
            text: 'Your profile is updated successfully!',
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

  // const handleFileSubmit = (e) => {
  //   const fileSize = document.getElementById("photoUrl").files[0].size;
  //   const profileImg = e.target.files[0];

  //   if (fileSize < 512000) {
  //     const uploadTask = firebase
  //       .storage()
  //       .ref(`profileImage/${userEmail}/${profileImg?.name}`)
  //       .put(profileImg);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress = Math.round(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );

  //         setProgressData(progress);
  //       },
  //       (error) => {
  //         alert(error.message + "" + "Something went wrong");
  //       },
  //       () => {
  //         firebase
  //           .storage()
  //           .ref("profileImage")
  //           .child(userEmail)
  //           .child(profileImg?.name)
  //           .getDownloadURL()
  //           .then((url) => {
  //             // NOTE: use this url
  //             setPhotoUrl(url);
  //           });
  //       }
  //     );
  //   } else {
  //     alert("File Size must be under 500kb");
  //   }
  //   console.log(fileSize);
  // };

  return (
    <div>
      <div className="pt-4 pb-5 px-5 ">
        <div className="max-w-xl mx-auto bg-white shadow-md border-solid rounded-lg border-gray-300 p-5 my-4">
          <h2 className=" text-xl text-[#1aa5d3] mt-2 mb-6">
            Academic Details
          </h2>
          <div className="mb-6 -mt-3 bg-[#bac6ca] h-0.5" />
          <form onSubmit={formik.handleSubmit}>
            {/* NOTE: universityName */}
            <div className="flex items-center mb-3">
              <label htmlFor="universityName" className="w-[300px]">
                School / University Name
                {formik.errors.universityName ? (
                  <span className="text-xs text-red-600">
                    ({formik.errors.universityName})
                  </span>
                ) : null}
              </label>
              <input
                id="universityName"
                name="universityName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.universityName}
                placeholder="Dhaka University"
                className="w-full px-2 py-3 rounded-md bg-[#fafafa] outline-none"
                style={
                  formik.errors.universityName && {
                    border: '2px solid orangered',
                  }
                }
              />
            </div>

            {/* NOTE: educationLevel */}
            <div className="flex items-center mb-3">
              <label htmlFor="educationLevel" className="w-[300px]">
                Level of Education
                {formik.errors.educationLevel ? (
                  <span className="text-xs text-red-600">
                    ({formik.errors.educationLevel})
                  </span>
                ) : null}
              </label>
              <input
                id="educationLevel"
                name="educationLevel"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.educationLevel}
                placeholder="BSc in CSE"
                className="w-full px-2 py-3 rounded-md bg-[#fafafa] outline-none"
                style={
                  formik.errors.educationLevel && {
                    border: '2px solid orangered',
                  }
                }
              />
            </div>

            {/* NOTE: Skills */}
            <div className="flex items-center mb-3">
              <label className="w-[300px]" htmlFor="email">
                Skill Set
                {formik.errors.skillSet ? (
                  <span className="text-xs text-red-600">
                    ({formik.errors.skillSet})
                  </span>
                ) : null}
              </label>
              <input
                id="skillSet"
                name="skillSet"
                type="skillSet"
                onChange={formik.handleChange}
                value={formik.values.skillSet}
                placeholder="Web development, Graphic Designing"
                className="w-full px-2 py-3 rounded-md bg-[#fafafa] outline-none"
                style={
                  formik.errors.skillSet && { border: '2px solid orangered' }
                }
              />
            </div>

            {/* NOTE: Language */}
            <div className="flex items-center">
              <label className="w-[300px]" htmlFor="email">
                Language
                {formik.errors.language ? (
                  <span className="text-xs text-red-600">
                    ({formik.errors.language})
                  </span>
                ) : null}
              </label>
              <input
                id="language"
                name="language"
                type="language"
                onChange={formik.handleChange}
                value={formik.values.language}
                placeholder="Bangla, English, Hindi"
                className="w-full px-2 py-3 rounded-md bg-[#fafafa] outline-none"
                style={
                  formik.errors.language && { border: '2px solid orangered' }
                }
              />
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
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

export default Academic;
