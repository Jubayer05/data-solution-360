import { useEffect, useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../../firebase';

import { Empty } from 'antd';
import PhoneInput from 'react-phone-number-input';
import Swal from 'sweetalert2';
import { loadData } from '../../../../src/hooks/loadData';
import ButtonDashboard from '../../../utilities/dashboard/ButtonDashboard';

const db = firebase.firestore();

const ManualPayment = () => {
  const [courseDataBatch, setCourseDataBatch] = useState([]);
  const [url, setUrl] = useState('');
  const [users, setUsers] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [inputAmount, setInputAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Remove any non-numeric characters and leading "+"
    const formatPhoneNumber = (phoneNumberInput) => {
      return phoneNumberInput?.replace(/^\+/, '');
    };

    // Format as email
    const email = `${formatPhoneNumber(phoneNumber)}@datasolution360.com`;
    const findUser = users.find((item) => item.email === email);
    setUserData(findUser);
  }, [phoneNumber, users]);

  useEffect(() => {
    loadData('course_data_batch', setCourseDataBatch);
    loadData('users', setUsers);
    const url = window.location.href.split('/').slice(-1)[0];
    setUrl(url);
  }, []);

  const currentEnrolledCourse = courseDataBatch.find(
    (course) => course.id === url,
  );

  const handleSubmit = () => {
    if (!userData || !currentEnrolledCourse || !inputAmount) {
      Swal.fire(
        'Error',
        'Please ensure all fields are filled correctly.',
        'error',
      );
      return;
    }

    const isAlreadyEnrolled = userData.enrolled_courses.some(
      (course) => course.batchId === currentEnrolledCourse.unique_batch_id,
    );

    if (isAlreadyEnrolled) {
      Swal.fire('Warning', 'User already has access.', 'warning');
      return;
    }

    Swal.fire({
      title: 'Are you sure to accept?',
      text: 'Please check the transaction ID before accepting.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Join the course',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);

        const updatedUsers = [
          ...userData.enrolled_courses,
          {
            batchId: currentEnrolledCourse.unique_batch_id,
            leaderBoard: null,
            paymentInfo: { amount: inputAmount, paymentWay: 'manual' },
          },
        ];

        const updatedCourses = [
          ...currentEnrolledCourse.enrolled_students,
          userData.student_id,
        ];
        db.collection('users')
          .doc(userData.id)
          .update({ enrolled_courses: updatedUsers })
          .then(() => {
            db.collection('course_data_batch')
              .doc(currentEnrolledCourse.id)
              .update({ enrolled_students: updatedCourses })
              .then(() => {
                Swal.fire(
                  'Success',
                  'User got access to the dashboard.',
                  'success',
                ).then(() => {
                  setLoading(false);
                  window.location.reload();
                });
              });
          })
          .catch((error) => {
            setLoading(false);
            Swal.fire('Error', 'Failed to update the user.', 'error');
          });
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto -mt-16">
      <div className="border-1 p-5 rounded-lg bg-white ">
        <h2 className="text-xl pb-4 text-[#231f40] font-medium font-dash_heading ">
          Handle Manual Payment
        </h2>

        <div>
          {phoneNumber && !userData ? (
            <div className="mb-10 border py-5">
              <Empty description="No user found with this phone number. Please let him know to create the account first." />
            </div>
          ) : userData ? (
            <h2 className="text-lg pb-4 text-[#291285] font-medium font-dash_heading my-5">
              User registered with phone number:{' '}
              <span className="text-primary">{userData?.phone}</span>
            </h2>
          ) : (
            ''
          )}
        </div>

        <div className="max-w-5xl mx-auto flex gap-2">
          <div className="w-full">
            <label className="font-semibold block text-[#17012e]">
              Registered Phone Number{' '}
              <span className="text-red-500">(required)</span>
            </label>
            {/* <div className="flex items-center gap-2">
              <input
                disabled
                type="text"
                placeholder="+880"
                className="w-[70px] px-4 py-2.5 text-base outline-none border-1 mt-1.5 rounded"
              />
              <input
                type="number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                onWheel={(e) => e.target.blur()}
                placeholder="01712345678"
                className="w-full px-4 py-2.5 text-base outline-none border-1 mt-1.5 rounded"
              />
            </div> */}
            <div className="mb-4 flex gap-2">
              <PhoneInput
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
            </div>
          </div>

          <div className="w-full">
            <label className="font-semibold block text-[#17012e]">
              Amount <span className="text-red-500">(required)</span>
            </label>
            <input
              type="number"
              placeholder="5990"
              onWheel={(e) => e.target.blur()}
              onChange={(e) => setInputAmount(e.target.value)}
              className="w-full px-4 py-2.5 text-base outline-none border-1 mt-1.5 rounded"
            />
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <ButtonDashboard
            onClick={handleSubmit}
            className="bg-primary_btn hover:bg-[#002346bc] text-white w-1/3"
          >
            {loading ? 'Processing...' : 'Submit'}
          </ButtonDashboard>
        </div>
      </div>
    </div>
  );
};

export default ManualPayment;
