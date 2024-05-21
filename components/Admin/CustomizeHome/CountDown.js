import { useFormik } from 'formik';
import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';

const CountdownAdmin = () => {
  const validate = (values) => {
    const errors = {};

    if (!values.courseLink) {
      errors.courseLink = 'Required';
    }

    if (!values.countdownEnd) {
      errors.countdownEnd = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      countdownEnd: '',
      courseLink: '',
    },
    validate,
    onSubmit: (values) => {
      firebase
        .firestore()
        .collection('countdown_time')
        .doc('s0N0oL5xGJenV4XBD892')
        .update({
          ...values,
        })
        .then(() => {
          Swal.fire({
            title: 'Success',
            text: 'Countdown data is updated successfully!',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Okay',
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((err) => {
          Swal.fire('Hello!', 'Countdown data cannot updated!', 'error');
        });
    },
  });

  return (
    <div id="countdown_admin">
      <div className="pt-10 pb-4 px-5 ">
        <div className="max-w-3xl mx-auto bg-white shadow-md border-solid rounded-lg border-gray-300 p-5 my-4">
          <h2 className=" text-xl text-[#1aa5d3] mt-2 mb-6">Countdown</h2>
          <div className="mb-6 -mt-3 bg-[#bac6ca] h-0.5" />
          <form onSubmit={formik.handleSubmit}>
            {/* NOTE: countdown date */}
            <div className="flex items-center mb-3">
              <label htmlFor="countdownEnd" className="w-[240px] sm:w-[300px]">
                End Countdown Date
                {formik.errors.countdownEnd ? (
                  <span className="text-xs text-red-600">
                    ({formik.errors.countdownEnd})
                  </span>
                ) : null}
              </label>
              <input
                id="countdownEnd"
                name="countdownEnd"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.countdownEnd}
                className="w-full px-2 py-3 rounded-md bg-[#f1f1f1] outline-none"
                style={
                  formik.errors.countdownEnd && {
                    border: '2px solid orangered',
                  }
                }
              />
            </div>

            <div className="flex items-center mb-3">
              <label htmlFor="courseLink" className="w-[240px] sm:w-[300px]">
                Course Link
                {formik.errors.courseLink ? (
                  <span className="text-xs text-red-600">
                    ({formik.errors.courseLink})
                  </span>
                ) : null}
              </label>
              <input
                id="courseLink"
                name="courseLink"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.courseLink}
                className="w-full px-2 py-3 rounded-md bg-[#f1f1f1] outline-none"
                style={
                  formik.errors.courseLink && { border: '2px solid orangered' }
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

export default CountdownAdmin;
