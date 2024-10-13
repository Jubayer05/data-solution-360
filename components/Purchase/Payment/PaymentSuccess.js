import { Spin } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Lottie from 'react-lottie';
import Swal from 'sweetalert2';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';
import successAnimationData from '../../../src/data/json/payment-success.json';
import { loadData } from '../../../src/hooks/loadData';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: successAnimationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const enrollStudentInCourse = async (
  currentCourse,
  studentId,
  db,
  setCourseDataBatch,
) => {
  const updatedCourse = {
    ...currentCourse,
    enrolled_students: [...currentCourse.enrolled_students, studentId],
  };

  try {
    await db
      .collection('course_data_batch')
      .doc(currentCourse.id)
      .update(updatedCourse);
    setCourseDataBatch((prevBatch) =>
      prevBatch.map((batch) =>
        batch.id === currentCourse.id ? updatedCourse : batch,
      ),
    );
  } catch (error) {
    Swal.fire('Dear user!', 'Error updating course:', 'error');
  }
};

const addUserToEnrolledCourses = async (batchId, findCurrentUser, db) => {
  const updatedCourses = [
    ...findCurrentUser?.enrolled_courses,
    { batchId, leaderBoard: null },
  ];

  try {
    await db.collection('users').doc(findCurrentUser?.key).update({
      enrolled_courses: updatedCourses,
    });
  } catch (error) {
    Swal.fire(
      'Error',
      'Failed to update user courses: ' + error.message,
      'error',
    );
  }
};

const PaymentSuccess = () => {
  const router = useRouter();
  const { paymentID } = router.query;
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseDataBatch, setCourseDataBatch] = useState([]);
  const db = firebase.firestore();
  const { findCurrentUser } = useStateContext();

  useEffect(() => {
    // Load the batch data from Firestore
    loadData('course_data_batch', setCourseDataBatch);
  }, []);

  // Memoized function to find the current course based on the unique_batch_id
  const currentCourse = useMemo(() => {
    if (courseDataBatch && paymentResponse?.additionalInfo?.unique_batch_id) {
      return courseDataBatch.find(
        (course) =>
          course.unique_batch_id ===
          paymentResponse.additionalInfo.unique_batch_id,
      );
    }
    return null;
  }, [courseDataBatch, paymentResponse]);

  const updateDatabaseAfterPayment = useCallback(
    async (batchId, studentId) => {
      if (!findCurrentUser) {
        Swal.fire('Error', 'User not logged in.', 'error');
        return;
      }

      if (
        currentCourse?.enrolled_students &&
        !currentCourse.enrolled_students.includes(studentId)
      ) {
        await enrollStudentInCourse(
          currentCourse,
          studentId,
          db,
          setCourseDataBatch,
        );
      }

      const isAlreadyEnrolled = findCurrentUser?.enrolled_courses.some(
        (course) => course.batchId === batchId,
      );
      if (!isAlreadyEnrolled) {
        await addUserToEnrolledCourses(batchId, findCurrentUser, db);
      }
    },
    [currentCourse, findCurrentUser, db, setCourseDataBatch],
  );

  useEffect(() => {
    const verifyPayment = async () => {
      if (paymentID) {
        const timeout = setTimeout(() => {
          setLoading(false);
          Swal.fire(
            'Warning',
            'Payment verification is taking too long, please try again.',
            'warning',
          );
        }, 10000); // 10 seconds timeout

        try {
          const response = await fetch(
            `/api/bkash/callback?paymentID=${paymentID}&status=success`,
          );
          clearTimeout(timeout);
          const data = await response.json();

          if (response.ok) {
            const batchId = data?.additionalInfo?.unique_batch_id;
            const studentId = data?.additionalInfo?.student_id;
            setPaymentResponse(data);
            updateDatabaseAfterPayment(batchId, studentId);
          } else {
            Swal.fire('Error', 'Payment verification failed.', 'error');
          }
        } catch (error) {
          Swal.fire(
            'Error',
            'Error verifying payment: ' + error.message,
            'error',
          );
        } finally {
          setLoading(false);
        }
      }
    };

    verifyPayment();
  }, [paymentID, updateDatabaseAfterPayment]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg text-center">
        {/* Company Logo */}
        <div className="mb-6">
          <Image
            src="/logo/logo.png" // Replace with your logo path
            alt="Company Logo"
            width={150}
            height={50}
            className="mx-auto w-20"
          />
        </div>

        {/* Lottie Animation */}
        <div className="mb-6">
          <Lottie options={defaultOptions} />
        </div>

        {/* Payment Success Heading */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-green-600">
            Payment Successful!
          </h1>
        </div>
        {paymentResponse ? (
          <div className="text-gray-600 mb-4">
            <p className="font-semibold">
              Payment ID: {paymentResponse.paymentId}
            </p>
            <p className="font-semibold">Amount: {paymentResponse.amount}</p>
            <p className="font-semibold">
              Transaction Status: {paymentResponse.transactionStatus}
            </p>
            <p className="font-semibold">
              Merchant Invoice: {paymentResponse.merchantInvoiceNumber}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Payment information not available.</p>
        )}

        <button
          aria-label="Return to Home"
          onClick={() => router.push('/')}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
