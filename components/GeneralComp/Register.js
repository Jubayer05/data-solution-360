import { useFormik } from 'formik';
import React, { useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../firebase';
import { useStateContext } from '../../src/context/ContextProvider';
import { districts } from '../../src/data/district';

const Register = ({ title }) => {
  const { userEmail, findCurrentUser } = useStateContext();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [progressData, setProgressData] = useState(0);

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

    if (!values.institution) {
      errors.institution = 'Required';
    } else if (values.institution.length > 40) {
      errors.institution = 'Must be 40 characters or less';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      institution: '',
      address: '',
      // photoUrl: "",
    },
    validate,
    onSubmit: (values) => {
      firebase
        .firestore()
        .collection('userLogin')
        .doc(findCurrentUser.key)
        .update({
          ...values,
          email: userEmail,
          district: selectedOption?.value,
          gender: selectedGender?.value,
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
    <div className="pt-20 px-5">
      <h2 className="text-center text-xl text-gray-500 mt-10 mb-6">{title}</h2>

      <div className="max-w-xl mx-auto border-solid border-2 border-gray-300 p-5 my-4">
        <form onSubmit={formik.handleSubmit}>
          {/* NOTE: FIRST NAME */}
          <label htmlFor="fullName">
            Full Name
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
            className="w-full border px-2 py-3 mb-3 mt-1 rounded-md"
            style={formik.errors.fullName && { border: '2px solid orangered' }}
          />
          {/* NOTE: EMAIL */}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email || userEmail}
            className="w-full border px-2 py-3 mb-3 mt-1 rounded-md outline-none"
          />

          {/* NOTE: Gender */}
          <p>Gender</p>
          <Select
            className="-mt-2 mb-2"
            styles={customStyles}
            options={gender}
            defaultValue={selectedGender}
            onChange={setSelectedGender}
          />

          {/* NOTE: Occupation */}
          <p>Occupation</p>
          <Select
            className="-mt-2 mb-2"
            styles={customStyles}
            options={occupation}
            defaultValue={selectedOccupation}
            onChange={setSelectedOccupation}
          />

          {/* NOTE: institution */}
          <label htmlFor="email">
            Institution / Organization / Company{' '}
            {formik.errors.institution ? (
              <span className="text-xs text-red-600">
                ({formik.errors.institution})
              </span>
            ) : null}
          </label>
          <input
            id="institution"
            name="institution"
            type="institution"
            onChange={formik.handleChange}
            value={formik.values.institution}
            className="w-full border px-2 py-3 mb-3 mt-1 rounded-md outline-none"
            style={
              formik.errors.institution && { border: '2px solid orangered' }
            }
          />

          {/* NOTE: DISTRICTS */}
          <p>District</p>
          <Select
            className="-mt-2 mb-2"
            styles={customStyles}
            options={districts}
            defaultValue={selectedOption}
            onChange={setSelectedOption}
          />

          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-full bg-primary-bg text-white px-3 py-2 rounded-lg "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
