import { useEffect, useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../../firebase';

import { Table } from 'antd';
import Swal from 'sweetalert2';
import { loadData } from '../../../../src/hooks/loadData';
import ButtonDashboard from '../../../utilities/dashboard/ButtonDashboard';

const db = firebase.firestore();

const EnrolledStudent = () => {
  const [courseDataBatch, setCourseDataBatch] = useState([]);
  const [url, setUrl] = useState('');

  const [enrolledUsers, setEnrolledUsers] = useState([]);

  useEffect(() => {
    loadData('course_data_batch', setCourseDataBatch);
    const url = window.location.href.split('/').slice(-1)[0];
    setUrl(url);
  }, []);

  const currentEnrolledCourse = courseDataBatch.find(
    (course) => course.id === url,
  );

  const fetchUsersByIds = async (user_ids) => {
    const db = firebase.firestore(); // Firestore instance
    const usersCollection = db.collection('users'); // Collection name
    const users = [];

    // Use a batch query to find users by ID
    try {
      const batchSize = 10; // You can adjust the batch size depending on the limits
      for (let i = 0; i < user_ids.length; i += batchSize) {
        const batch = user_ids.slice(i, i + batchSize); // Split IDs into batches

        const querySnapshot = await usersCollection
          .where('student_id', 'in', batch)
          .get();

        // Collect the user data from the snapshot
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
      }

      return users;
    } catch (error) {
      console.error('Error fetching users by ID:', error);
    }
  };

  useEffect(() => {
    // Define the async function inside useEffect to avoid defining it on each render
    const handleGetUsers = async () => {
      try {
        if (currentEnrolledCourse?.enrolled_students?.length > 0) {
          const users = await fetchUsersByIds(
            currentEnrolledCourse.enrolled_students,
          );
          setEnrolledUsers(users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    handleGetUsers();

    // The effect will run only when the enrolled_students array changes
  }, [currentEnrolledCourse?.enrolled_students]);

  const handleAcceptBtn = (record) => {
    const userEnrolledCourse = { ...record }; // Avoid direct mutation

    const isAlreadyEnrolled = userEnrolledCourse.enrolled_courses.some(
      (course) => course.batchId === currentEnrolledCourse.unique_batch_id,
    );

    if (!isAlreadyEnrolled) {
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
          const updatedCourses = [
            ...userEnrolledCourse.enrolled_courses,
            {
              batchId: currentEnrolledCourse.unique_batch_id,
              leaderBoard: null,
            },
          ];

          // Update user enrolled courses
          db.collection('users')
            .doc(userEnrolledCourse.id)
            .update({ enrolled_courses: updatedCourses })
            .then(() => {
              Swal.fire(
                'Success',
                'User got access to the dashboard.',
                'success',
              ).then(() => {
                window.location.reload();
              });
            })
            .catch((error) => {
              Swal.fire('Error', 'Failed to update the user.', 'error');
            });
        }
      });
    } else {
      Swal.fire('Warning', 'User already has access.', 'warning');
    }
  };

  const handleRejectBtn = (record) => {
    Swal.fire({
      title: 'Are you sure you want to reject?',
      html: `
    <p>You need to agree before rejecting the user.</p>
    <input type="checkbox" id="agreeCheckbox" />
    <label for="agreeCheckbox">I agree to the terms and conditions and I am sure to reject the user.</label>
  `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      didOpen: () => {
        const checkbox = document.getElementById('agreeCheckbox');
        const confirmButton = Swal.getConfirmButton();
        confirmButton.disabled = true; // Disable the "Yes" button by default

        // Listen for checkbox changes to enable/disable the "Yes" button
        checkbox.addEventListener('change', function () {
          confirmButton.disabled = !checkbox.checked;
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.isConfirmed) {
          // Remove the course from the user's enrolled_courses
          const updatedCourses = record.enrolled_courses.filter(
            (course) =>
              course.batchId !== currentEnrolledCourse.unique_batch_id,
          );

          const updateUserPromise = db
            .collection('users')
            .doc(record.id)
            .update({ enrolled_courses: updatedCourses });

          const updateCourseDataBatchPromise = db
            .collection('course_data_batch')
            .where(
              'unique_batch_id',
              '==',
              currentEnrolledCourse.unique_batch_id,
            )
            .get()
            .then((querySnapshot) => {
              const batchUpdatePromises = [];
              querySnapshot.forEach((doc) => {
                const batchData = doc.data();
                const updatedEnrolledStudents =
                  batchData.enrolled_students.filter(
                    (studentId) => studentId !== record.student_id,
                  );

                // If no courses left in the user's enrolled_courses, remove the user from the batch
                if (updatedCourses.length === 0) {
                  batchUpdatePromises.push(
                    db.collection('course_data_batch').doc(doc.id).update({
                      enrolled_students: updatedEnrolledStudents,
                    }),
                  );
                }
              });

              return Promise.all(batchUpdatePromises);
            });

          // Execute both promises
          Promise.all([updateUserPromise, updateCourseDataBatchPromise])
            .then(() => {
              Swal.fire(
                'Rejected!',
                'User has been removed from the course and batch.',
                'success',
              ).then(() => {
                window.location.reload();
              });
            })
            .catch((error) => {
              console.error('Error:', error);
              Swal.fire(
                'Error',
                'Failed to update the user or batch.',
                'error',
              );
            });
        }
      }
    });
  };

  const handleRemoveBtn = (record) => {
    Swal.fire({
      title: 'Are you sure you want to remove the user completely?',
      html: `
    <p>You need to agree before rejecting the user.</p>
    <input type="checkbox" id="agreeCheckbox" />
    <label for="agreeCheckbox">I agree to the terms and conditions and I am sure to remove the user completely.</label>
  `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      didOpen: () => {
        const checkbox = document.getElementById('agreeCheckbox');
        const confirmButton = Swal.getConfirmButton();
        confirmButton.disabled = true; // Disable the "Yes" button by default

        // Listen for checkbox changes to enable/disable the "Yes" button
        checkbox.addEventListener('change', function () {
          confirmButton.disabled = !checkbox.checked;
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove the user from the enrolled_courses
        const updatedCourses = record.enrolled_courses.filter(
          (course) => course.batchId !== currentEnrolledCourse.unique_batch_id,
        );

        // Update the user's enrolled_courses in the database
        const updateUserPromise = db
          .collection('users')
          .doc(record.id)
          .update({ enrolled_courses: updatedCourses });

        // Remove the user from the course's enrolled_students
        const removeFromCourseBatchPromise = db
          .collection('course_data_batch')
          .where('unique_batch_id', '==', currentEnrolledCourse.unique_batch_id)
          .get()
          .then((querySnapshot) => {
            const batchUpdatePromises = [];
            querySnapshot.forEach((doc) => {
              const batchData = doc.data();
              const updatedEnrolledStudents =
                batchData.enrolled_students.filter(
                  (studentId) => studentId !== record.student_id,
                );

              // Update the course data batch with the new list of enrolled students
              batchUpdatePromises.push(
                db.collection('course_data_batch').doc(doc.id).update({
                  enrolled_students: updatedEnrolledStudents,
                }),
              );
            });
            return Promise.all(batchUpdatePromises);
          });

        // Execute both promises
        Promise.all([updateUserPromise, removeFromCourseBatchPromise])
          .then(() => {
            Swal.fire(
              'Removed!',
              'The user has been removed from the course.',
              'success',
            );

            // Update the enrolledUsers state to reflect the change
            setEnrolledUsers((prevUsers) =>
              prevUsers.filter((user) => user.id !== record.id),
            );
          })
          .catch((error) => {
            console.error('Error:', error);
            Swal.fire(
              'Error',
              'Failed to remove the user from the course.',
              'error',
            );
          });
      }
    });
  };

  const columns = [
    {
      title: 'SL',
      dataIndex: 'serialNumber',
      width: 80,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'full_name',
      width: 150,
      align: 'center',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      align: 'center',
      width: 180,
    },

    {
      title: 'Action',
      width: 250,
      align: 'center',
      render: (_, record, index) => (
        <div className="flex items-center justify-center gap-5">
          <ButtonDashboard
            onClick={() => handleAcceptBtn(record)}
            className="bg-secondary_btn hover:bg-secondary_btn hover:opacity-80 text-white"
          >
            {record.enrolled_courses.some(
              (course) =>
                course.batchId === currentEnrolledCourse.unique_batch_id,
            )
              ? 'Accepted'
              : 'Accept'}
          </ButtonDashboard>
          <ButtonDashboard
            onClick={() => handleRejectBtn(record)}
            className="bg-[#f64e45] hover:bg-[#cb433b] hover:opacity-80 text-white"
          >
            Reject
          </ButtonDashboard>
          <ButtonDashboard
            onClick={() => handleRemoveBtn(record)}
            className="bg-[#b71c1c] hover:bg-[#880e4f] hover:opacity-80 text-white"
          >
            Remove
          </ButtonDashboard>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto my-20">
      <div className="border-1 p-5 rounded-lg bg-white mt-10">
        <h2 className="text-xl pb-4 text-[#231f40] font-medium font-dash_heading ">
          Enrolled Student
        </h2>

        <div className="max-w-5xl mx-auto">
          <Table
            columns={columns}
            dataSource={[...enrolledUsers]}
            pagination={{
              pageSize: 15,
            }}
            scroll={{
              x: 'max-content',
              y: 500,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EnrolledStudent;
