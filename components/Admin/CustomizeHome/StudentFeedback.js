/* eslint-disable @next/next/no-img-element */
import { Progress, Table } from 'antd';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';
const db = firebase.firestore();

const StudentFeedback = () => {
  const { userEmail, studentReview } = useStateContext();
  const [img, setImg] = useState('');
  const [progressData, setProgressData] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      batch: '',
      review: '',
      rating: '',
      profession: '',
      review: '',
      img: img,
    },
    onSubmit: (values) => {
      db.collection('student_review')
        .add({
          ...values,
          img: img,
        })
        .then(() => {
          Swal.fire({
            title: 'Success!',
            text: 'Student review added successfully!',
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
          Swal.fire('Error!', 'Review cannot updated!', 'error');
        });
    },
  });

  const handleFileSubmit = (e) => {
    // const fileSize = document.getElementById('photoUrl').files[0].size;
    const fileSize = e.target.files[0].size;
    const studentFeedbackImg = e.target.files[0];

    if (fileSize < 1024000) {
      const uploadTask = firebase
        .storage()
        .ref(`studentFeedbackImg/${userEmail}/${studentFeedbackImg?.name}`)
        .put(studentFeedbackImg);
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
            .ref('studentFeedbackImg')
            .child(userEmail)
            .child(studentFeedbackImg?.name)
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

  const handleDelete = (record) => {
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
        db.collection('student_review')
          .doc(record.key)
          .delete()
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Student review has been deleted.',
              'success',
            );
          })
          .catch((error) => {
            Swal.fire('Error!', 'Something went wrong.', 'error');
          });
      }
    });
  };

  const customStyles = {
    content: {
      background: '#fff',
      // innerWidth: '768px',
      top: '55%',
      left: '50%',
      right: 'auto',
      bottom: '-30%',
      // marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 100,
    },
  };

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'img',
      width: 140,
      align: 'center',
      render: (item) => <img src={item} className="w-20 rounded-full" />,
    },
    {
      title: 'Student Name',
      dataIndex: 'student_name',
      width: 250,
      align: 'center',
    },
    {
      title: 'Batch No',
      dataIndex: 'batch_no',
      align: 'left',
      width: 100,
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <button
          className="bg-primary-bg text-white py-1 px-2 rounded"
          onClick={() => handleView(record)}
        >
          View
        </button>
      ),
    },
    {
      title: 'Delete',
      dataIndex: '',
      key: 'x',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <button
          className="bg-red-600 text-white py-1 px-2 rounded"
          onClick={() => handleDelete(record)}
        >
          Delete
        </button>
      ),
    },
  ];

  const handleView = (record) => {
    setModalData(record);
    setIsOpen(true);
  };

  return (
    <div id="student_feedback">
      <div className="pt-10 pb-4 px-5 ">
        <div className="max-w-3xl mx-auto bg-white shadow-md border-solid rounded-lg border-gray-300 p-5 my-4">
          <h2 className=" text-xl text-[#1aa5d3] mt-2 mb-6">Review Students</h2>
          <div className="mb-6 -mt-3 bg-[#bac6ca] h-0.5" />
          <h2>All Student Review</h2>
          <div className="flex justify-center items-center flex-wrap gap-6">
            <Table
              columns={columns}
              dataSource={[...studentReview]}
              pagination={{
                pageSize: 50,
              }}
              scroll={{
                y: 400,
              }}
            />
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="w-[350px] sm:w-[600px] text-base">
              <img src={modalData?.img} className="w-32 " alt="" />
              <h3>
                <strong>Name: </strong> {modalData?.student_name}
              </h3>
              <p>
                <strong>Batch No: </strong> {modalData?.batch_no}
              </p>
              <p>
                <strong>Current Profession: </strong> {modalData?.profession}
              </p>
              <p>
                <strong>Rating: </strong> {modalData?.rating}
              </p>
              <p>
                <strong>Review: </strong> <em>{modalData?.review}</em>
              </p>
            </div>

            <div className="flex justify-center ">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-[orangered] text-white py-1 px-2 rounded"
              >
                Close
              </button>
            </div>
          </Modal>
          <form onSubmit={formik.handleSubmit}>
            {/* NOTE: STUDENT NAME */}
            <div className="flex items-center mt-3">
              <label htmlFor="student_name" className="w-[240px] sm:w-[300px]">
                Student Name
              </label>
              <input
                id="student_name"
                name="student_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.student_name}
                className="w-full px-2 py-3 rounded-md bg-[#f1f1f1] outline-none"
              />
            </div>

            {/* NOTE: PHOTO_OF_STUDENT */}
            <div className="flex items-center mb-3 mt-3">
              <label htmlFor="img" className="w-[240px] sm:w-[300px]">
                Student Image
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

            {/* NOTE: BATCH NUMBER */}
            <div className="flex items-center mt-3">
              <label htmlFor="batch_no" className="w-[240px] sm:w-[300px]">
                Batch No
              </label>
              <input
                id="batch_no"
                name="batch_no"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.batch_no}
                className="w-full px-2 py-3 rounded-md bg-[#f1f1f1] outline-none"
              />
            </div>

            {/* NOTE: PROFESSION */}
            <div className="flex items-center mt-3">
              <label htmlFor="profession" className="w-[240px] sm:w-[300px]">
                Current Profession
              </label>
              <input
                id="profession"
                name="profession"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.profession}
                className="w-full px-2 py-3 rounded-md bg-[#f1f1f1] outline-none"
              />
            </div>

            {/* NOTE: Rating */}
            <div className="flex items-center mt-3">
              <label htmlFor="rating" className="w-[240px] sm:w-[300px]">
                Rating Out of 5
              </label>
              <input
                id="rating"
                name="rating"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.rating}
                className="w-full px-2 py-3 rounded-md bg-[#f1f1f1] outline-none"
              />
            </div>

            {/* NOTE:  */}
            <div className="flex items-center mt-3">
              <label htmlFor="review" className="w-[240px] sm:w-[300px]">
                Review
              </label>
              <input
                id="review"
                name="review"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.review}
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
export default StudentFeedback;
