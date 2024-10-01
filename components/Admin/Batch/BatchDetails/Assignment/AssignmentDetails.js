import { ConfigProvider, Spin, Table } from 'antd'; // Import Spin from 'antd'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../../../firebase';
import { loadData } from '../../../../../src/hooks/loadData';
import { formatDate } from '../../../../../src/utils/convertDate';
import ButtonDashboard from '../../../../utilities/dashboard/ButtonDashboard';

const db = firebase.firestore();

const AssignmentDetails = () => {
  const [courseDataBatch, setCourseDataBatch] = useState([]);
  const [url, setUrl] = useState('');
  const router = useRouter();
  const { batchId, assignmentId } = router.query;
  const [marks, setMarks] = useState({}); // State to track marks input for each student
  const [loading, setLoading] = useState({}); // State to track loading status for each student

  useEffect(() => {
    loadData('course_data_batch', setCourseDataBatch); // Load course data
    const currentUrl = window.location.href.split('/').slice(-1)[0]; // Get current URL
    setUrl(currentUrl);
  }, []);

  const currentEnrolledCourse = courseDataBatch.find(
    (course) => course.id === batchId,
  );

  const currentAssignment =
    currentEnrolledCourse?.assignment_data?.find(
      (assignment) => assignment.id === assignmentId,
    ) || null;

  const handleMarksChange = (studentId, value) => {
    // Update marks in the state
    setMarks((prevMarks) => ({
      ...prevMarks,
      [studentId]: value,
    }));
  };

  const handleUpdateMarks = async (studentId) => {
    const studentMarks = marks[studentId];

    if (studentMarks > currentAssignment?.total_marks) {
      Swal.fire({
        title: 'Invalid Marks',
        text: 'Marks cannot be greater than total marks.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (studentMarks < 0) {
      Swal.fire({
        title: 'Invalid Marks',
        text: 'Marks cannot be negative.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    setLoading((prevLoading) => ({
      ...prevLoading,
      [studentId]: true,
    }));

    if (currentAssignment) {
      try {
        const updatedSubmittedStudents =
          currentAssignment.submitted_students.map((student) => {
            if (student.student_id === studentId) {
              return { ...student, obtain_marks: studentMarks }; // Update marks
            }
            return student; // Return unchanged student
          });

        const courseData = {
          ...currentEnrolledCourse,
          assignment_data: [
            ...currentEnrolledCourse?.assignment_data.filter(
              (item) => item.id !== assignmentId,
            ),
            {
              ...currentAssignment,
              submitted_students: updatedSubmittedStudents,
            },
          ],
        };

        // Update the Firestore database
        await db
          .collection('course_data_batch')
          .doc(batchId)
          .update(courseData);

        Swal.fire({
          title: 'Marks Updated',
          text: 'The marks have been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          window.location.reload();
        });

        // Clear the input field for the updated student
        setMarks((prevMarks) => ({ ...prevMarks, [studentId]: '' }));
      } catch (error) {
        console.error('Error updating marks:', error);
        Swal.fire({
          title: 'Update Failed',
          text: 'There was an error updating the marks. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setLoading((prevLoading) => ({
          ...prevLoading,
          [studentId]: false,
        }));
      }
    }
  };

  const columns = [
    {
      title: 'SL',
      dataIndex: 'serialNumber',
      width: 70,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'full_name',
      width: 200,
      align: 'center',
      render: (_, record) => (
        <p className="text-[13px] text-[#767576] font-medium font-dash_heading text-left">
          {record.full_name}
        </p>
      ),
    },
    {
      title: 'Obtain Marks',
      width: 130,
      align: 'center',
      render: (_, record) => (
        <p className="text-[16px] text-primary font-medium font-dash_heading">
          {record.obtain_marks}
        </p>
      ),
    },
    {
      title: 'Total Marks',
      width: 130,
      align: 'center',
      render: (_, record) => (
        <p className="text-[16px] text-[#3d9970] font-medium font-dash_heading">
          {currentAssignment?.total_marks || 0}
        </p>
      ),
    },
    {
      title: 'Submitting Date',
      width: 180,
      align: 'center',
      render: (_, record) => (
        <p className="text-[13px] text-[#767576] font-medium font-dash_heading">
          {formatDate(record.submittedAt)}
        </p>
      ),
    },
    {
      title: 'Assignment Link',
      width: 190,
      dataIndex: 'start_date',
      align: 'center',
      render: (_, record) => (
        <Link
          href={record.assignmentLink || ''}
          target="_blank"
          className="text-[13px] text-[#767576] visited:text-[#767576] font-medium font-dash_heading leading-1"
        >
          <ButtonDashboard className="bg-primary_btn hover:bg-[#002346bc] text-white">
            Check Assignment
          </ButtonDashboard>
        </Link>
      ),
    },
    {
      title: 'Give Marks',
      width: 180,
      align: 'center',
      render: (_, record) => (
        <input
          className="w-full border outline-none px-2 py-1 text-base font-semibold"
          type="number"
          value={marks[record.student_id] || ''}
          onChange={(e) => handleMarksChange(record.student_id, e.target.value)}
        />
      ),
    },
    {
      title: 'Action',
      width: 150,
      align: 'center',
      render: (_, record) => (
        <div className="flex items-center justify-center gap-3">
          <ButtonDashboard
            className="bg-secondary_btn hover:bg-[#4eae5c] text-white"
            onClick={() => handleUpdateMarks(record.student_id)}
            disabled={loading[record.student_id]} // Disable while loading
          >
            {loading[record.student_id] ? (
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#ffffff',
                  },
                }}
              >
                <Spin size="small" />
              </ConfigProvider>
            ) : (
              'Update'
            )}
          </ButtonDashboard>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto my-20">
      <div className="border-1 p-5 rounded-lg bg-white mt-10">
        <h2 className="text-xl pb-4 text-[#231f40] font-medium font-dash_heading">
          Submitted Students
        </h2>

        <div className="max-w-5xl mx-auto">
          <Table
            columns={columns}
            dataSource={
              currentEnrolledCourse && currentAssignment
                ? [...currentAssignment.submitted_students]
                : []
            }
            pagination={{
              pageSize: 15,
            }}
            scroll={{
              y: 500,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;
