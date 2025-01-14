import { Spin } from 'antd';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import firebase from '../../../firebase';
import successAnimationData from '../../../src/data/json/payment-success.json';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });
const db = firebase.firestore();

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: successAnimationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const enrollStudentInCourse = async (currentCourse, studentId) => {
  const updatedCourse = {
    ...currentCourse,
    enrolled_students: [...currentCourse.enrolled_students, studentId],
  };

  try {
    await db
      .collection('course_data_batch')
      .doc(currentCourse.id)
      .update(updatedCourse);
  } catch (error) {
    Swal.fire('Dear user!', 'Error updating course:', 'error');
  }
};

const addUserToEnrolledCourses = async (
  batchId,
  findCurrentUser,
  paymentResponse,
) => {
  const updatedCourses = [
    ...findCurrentUser?.enrolled_courses,
    { batchId, leaderBoard: null, paymentInfo: paymentResponse || {} },
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
  const [attemptCount, setAttemptCount] = useState(0);

  const id_token = JSON.parse(sessionStorage.getItem('token'));
  const batchId = JSON.parse(sessionStorage.getItem('batchId'));
  const currentCourse = JSON.parse(sessionStorage.getItem('currentCourse'));
  const findCurrentUser = JSON.parse(sessionStorage.getItem('findCurrentUser'));

  const updateDatabaseAfterPayment = useCallback(
    (batchId, studentId) => {
      if (!findCurrentUser?.student_id) {
        Swal.fire('Error', 'User not logged in.', 'error');
        return;
      }

      setLoading(true);

      // Check if student is already enrolled in the course
      if (
        currentCourse?.enrolled_students &&
        !currentCourse.enrolled_students.includes(studentId)
      ) {
        // console.log('START: UPDATING COURSE_DATA_BATCH', 'Hello world');
        enrollStudentInCourse(currentCourse, studentId)
          .then(() => {
            const isAlreadyEnrolled = findCurrentUser?.enrolled_courses.some(
              (course) => course.batchId === batchId,
            );

            if (!isAlreadyEnrolled) {
              return addUserToEnrolledCourses(
                batchId,
                findCurrentUser,
                paymentResponse,
              );
            } else {
              console.log('User is already enrolled in this course.');
            }
          })
          .then(() => {
            // Optionally handle success for the user enrollment
            Swal.fire({
              icon: 'success',
              title: 'Enrollment Successful!',
              text: 'You have been successfully enrolled in the course.',
            }).then(() => {
              sessionStorage.clear();
            });
          })
          .catch((error) => {
            // If there's an error during enrollment, show an error message
            Swal.fire(
              'Error',
              'Error enrolling student: ' + error.message,
              'error',
            );
          })
          .finally(() => {
            setLoading(false); // Stop loading
          });
      } else {
        setLoading(false);
      }
    },
    [currentCourse, findCurrentUser],
  );

  const verifyPayment = async () => {
    setLoading(true);
    setAttemptCount((prev) => prev + 1);

    try {
      const response = await fetch('/api/bkash/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${id_token}`,
          Accept: 'application/json',
          'X-APP-Key': process.env.BKASH_APP_KEY,
        },
        body: JSON.stringify({ paymentID }),
      });

      const data = await response.json();

      if (response.ok) {
        setPaymentResponse(data.paymentStatus);
        updateDatabaseAfterPayment(batchId, findCurrentUser?.student_id);
      } else {
        const errorMessage = data.message || 'Payment verification failed.';
        if (attemptCount < 2) {
          setTimeout(() => {
            verifyPayment(); // Retry after 2 seconds
          }, 2000); // Delay of 2 seconds before retrying
        } else {
          Swal.fire(
            'Error',
            'Payment verification failed after 2 attempts: ' + errorMessage,
            'error',
          );
        }
      }
    } catch (error) {
      Swal.fire('Error', 'Error verifying payment: ' + error.message, 'error');
    } finally {
      setLoading(false);
      sessionStorage.clear();
    }
  };

  useEffect(() => {
    if (!paymentID || !id_token) {
      console.log('Skipping verifyPayment, values are missing.');
      return;
    }

    verifyPayment();
  }, [paymentID, id_token]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="py-20 flex flex-col justify-center items-center bg-gray-50 px-4 min-h-screen">
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

        {paymentResponse && !loading ? (
          <>
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

            <button
              onClick={() => router.push('/students/my-course')}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Return to Dashboard
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center flex-col">
            <Spin size="large" />
            <div className="mt-4 text-lg text-gray-700">
              Verifying payment, please wait...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
