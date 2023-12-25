import { useFormik } from 'formik';
import React, { useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';
import { districts } from '../../../src/data/district';

const BasicInfo = () => {
  const { userEmail, findCurrentUser } = useStateContext();
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedOccupation, setSelectedOccupation] = useState(null);

  const gender = [
    {
      id: '1',
      value: 'Male',
      label: 'Male',
    },
    {
      id: '2',
      value: 'Female',
      label: 'Female',
    },
    {
      id: '3',
      value: 'Custom',
      label: 'Custom',
    },
  ];

  const occupation = [
    {
      id: '1',
      value: 'University Student',
      label: 'University Student',
    },
    {
      id: '2',
      value: 'School / College Student',
      label: 'School / College Student',
    },
    {
      id: '3',
      value: 'Job Holder',
      label: 'Job Holder',
    },
    {
      id: '4',
      value: 'Job Seeker',
      label: 'Job Seeker',
    },
    {
      id: '5',
      value: 'Freelancer',
      label: 'Freelancer',
    },
    {
      id: '6',
      value: 'Others',
      label: 'Others',
    },
  ];

  const validate = (values) => {
    const errors = {};
    if (!values.fullName) {
      errors.fullName = 'Required';
    } else if (values.fullName.length > 30) {
      errors.fullName = 'Must be 30 characters or less';
    }

    if (!values.jobTitle) {
      errors.jobTitle = 'Required';
    } else if (values.jobTitle.length > 30) {
      errors.jobTitle = 'Must be 30 characters or less';
    }

    if (!values.biography) {
      errors.biography = 'Required';
    } else if (values.biography.length > 200) {
      errors.biography = 'Must be 200 characters or less';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      fullName: '',
      jobTitle: '',
      biography: '',
    },
    validate,
    onSubmit: (values) => {
      firebase
        .firestore()
        .collection('userLogin')
        .doc(findCurrentUser.key)
        .update({
          ...values,
          district: selectedDistrict?.value || findCurrentUser?.district,
          gender: selectedGender?.value || findCurrentUser?.gender,
          occupation: selectedOccupation?.value || findCurrentUser?.occupation,
          registered: true,
          // photoUrl: photoUrl,
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
              window.location.href = '/students/dashboard';
            }
          });
        })
        .catch((err) => {
          Swal.fire('Hello!', 'Profile cannot updated!', 'error');
        });
    },
  });

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      padding: 20,
    }),
    control: (_, {}) => ({
      display: 'flex',
      border: '1px solid #e5e5e5',
      padding: '5px 10px',
      borderRadius: '3px',
      backgroundColor: '#fafafa',
    }),
  };

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
      <div className="pt-10 pb-4 px-5 ">
        <div className="max-w-xl mx-auto bg-white shadow-md border-solid rounded-lg border-gray-300 p-5 my-4">
          <h2 className=" text-xl text-[#1aa5d3] mt-2 mb-6">Basic Info</h2>
          <div className="mb-6 -mt-3 bg-[#bac6ca] h-0.5" />
          <form onSubmit={formik.handleSubmit}>
            {/* NOTE: NAME */}
            <div className="flex items-center mb-3">
              <label htmlFor="fullName" className="w-[300px]">
                Name
                {formik.errors.fullName ? (
                  <span className="text-xs text-red-600">
                    ({formik.errors.fullName})
                  </span>
                ) : null}
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                className="w-full px-2 py-3 rounded-md bg-[#fafafa] outline-none"
                style={
                  formik.errors.fullName && { border: '2px solid orangered' }
                }
              />
            </div>
            {/* NOTE: jobTitle */}
            <div className="flex items-center mb-3">
              <label htmlFor="jobTitle" className="w-[300px]">
                Job Title
                {formik.errors.jobTitle ? (
                  <span className="text-xs text-red-600">
                    ({formik.errors.jobTitle})
                  </span>
                ) : null}
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="jobTitle"
                onChange={formik.handleChange}
                value={formik.values.jobTitle}
                className="w-full px-2 py-3 rounded-md bg-[#fafafa] outline-none"
                style={
                  formik.errors.jobTitle && { border: '2px solid orangered' }
                }
              />
            </div>

            {/* NOTE: Gender */}
            <div className="flex items-center mb-3">
              <p className="w-[300px]">Gender</p>
              <Select
                className="w-[100%]"
                styles={customStyles}
                options={gender}
                defaultValue={selectedGender}
                onChange={setSelectedGender}
              />
            </div>

            {/* NOTE: Occupation */}
            <div className="flex items-center mb-3">
              <p className="w-[300px]">Occupation</p>
              <Select
                className="w-[100%]"
                styles={customStyles}
                options={occupation}
                defaultValue={selectedOccupation}
                onChange={setSelectedOccupation}
              />
            </div>

            {/* NOTE: DISTRICTS */}
            <div className="flex items-center mb-3">
              <p className="w-[300px]">District</p>
              <Select
                className="w-full"
                styles={customStyles}
                options={districts}
                defaultValue={selectedDistrict}
                onChange={setSelectedDistrict}
              />
            </div>

            {/* NOTE: biography */}
            <div className="flex items-start">
              <label className="w-[300px] pt-3" htmlFor="biography">
                Biography
                {formik.errors.biography ? (
                  <span className="text-xs text-red-600">
                    ({formik.errors.biography})
                  </span>
                ) : null}
              </label>
              <textarea
                id="biography"
                name="biography"
                type="biography"
                onChange={formik.handleChange}
                value={formik.values.biography}
                rows={6}
                className="w-full border px-2 py-3 mb-3 mt-1 rounded-md outline-none"
                style={
                  formik.errors.biography && { border: '2px solid orangered' }
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

export default BasicInfo;
