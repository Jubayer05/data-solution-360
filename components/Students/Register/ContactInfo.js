import { useFormik } from 'formik';
import React from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';

const ContactInfo = () => {
  const { userEmail, findCurrentUser } = useStateContext();

  console.log(findCurrentUser);

  const formik = useFormik({
    initialValues: {
      institution: '',
      phone: '',
      websiteLink: '',
    },
    onSubmit: (values) => {
      firebase
        .firestore()
        .collection('userLogin')
        .doc(findCurrentUser.key)
        .update({
          ...values,
          email: userEmail,
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
          <h2 className=" text-xl text-[#1aa5d3] mt-2 mb-6">Contact Info</h2>
          <div className="mb-6 -mt-3 bg-[#bac6ca] h-0.5" />
          <form onSubmit={formik.handleSubmit}>
            {/* NOTE: EMAIL */}
            <div className="flex items-center mb-3">
              <label htmlFor="email" className="w-[300px]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                disabled
                // onChange={formik.handleChange}
                value={formik.values.email || userEmail}
                className="w-full px-2 py-3 rounded-md bg-[#fafafa] outline-none"
              />
            </div>

            {/* NOTE: PHONE NUM */}
            <div className="flex items-center mb-3">
              <label htmlFor="phone" className="w-[300px]">
                Phone Number
                {formik.errors.phone ? (
                  <span className="text-xs text-red-600">
                    ({formik.errors.phone})
                  </span>
                ) : null}
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phone}
                className="w-full px-2 py-3 rounded-md bg-[#fafafa] outline-none"
                style={formik.errors.phone && { border: '2px solid orangered' }}
              />
            </div>

            {/* NOTE: institution */}
            <div className="flex items-center mb-3">
              <label className="w-[300px]" htmlFor="email">
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
                className="w-full px-2 py-3 rounded-md bg-[#fafafa] outline-none"
                style={
                  formik.errors.institution && { border: '2px solid orangered' }
                }
              />
            </div>

            {/* NOTE: Website */}
            <div className="flex items-center">
              <label className="w-[300px]" htmlFor="email">
                Website Link (if any)
                {formik.errors.websiteLink ? (
                  <span className="text-xs text-red-600">
                    ({formik.errors.websiteLink})
                  </span>
                ) : null}
              </label>
              <input
                id="websiteLink"
                name="websiteLink"
                type="websiteLink"
                onChange={formik.handleChange}
                value={formik.values.websiteLink}
                className="w-full px-2 py-3 rounded-md bg-[#fafafa] outline-none"
                style={
                  formik.errors.websiteLink && { border: '2px solid orangered' }
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

export default ContactInfo;
