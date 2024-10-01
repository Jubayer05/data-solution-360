import { Table } from 'antd';
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

const AssignmentComp = () => {
  const [courseDataBatch, setCourseDataBatch] = useState([]);
  const [url, setUrl] = useState('');
  const router = useRouter();
  const { batchId } = router.query;

  useEffect(() => {
    loadData('course_data_batch', setCourseDataBatch); // Load course data
    const currentUrl = window.location.href.split('/').slice(-1)[0]; // Get current URL
    setUrl(currentUrl);
  }, []);

  const currentEnrolledCourse = courseDataBatch.find(
    (course) => course.id === batchId,
  );

  const handleRemoveBtn = (record) => {
    Swal.fire({
      title: 'Are you sure you want to remove the assignment?',
      text: 'This action will remove the assignment from the course.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove',
    }).then((result) => {
      if (result.isConfirmed) {
        // Filter out the assignment to be removed
        const updatedAssignment = currentEnrolledCourse?.assignment_data.filter(
          (item) => item.id !== record.id,
        );

        if (!currentEnrolledCourse || !batchId) {
          Swal.fire('Error', 'Unable to find the course or batch.', 'error');
          return;
        }

        // Update Firestore with the updated assignment list
        db.collection('course_data_batch')
          .doc(currentEnrolledCourse.id) // Use the correct document ID for enrolled course
          .update({ assignment_data: updatedAssignment })
          .then(() => {
            Swal.fire(
              'Removed!',
              'The assignment has been removed.',
              'success',
            );

            // Update local state to reflect the change
            setCourseDataBatch((prevCourses) =>
              prevCourses.map((course) =>
                course.id === batchId
                  ? { ...course, assignment_data: updatedAssignment }
                  : course,
              ),
            );
          })
          .catch((error) => {
            console.error('Error:', error);
            Swal.fire('Error', 'Failed to remove the assignment.', 'error');
          });
      }
    });
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
      title: 'Assignment Name',
      dataIndex: 'title',
      align: 'center',
      render: (_, record) => (
        <p className="text-[13px] text-[#767576] font-medium font-dash_heading text-left">
          {record.title}
        </p>
      ),
    },
    {
      title: 'Submitting Students',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <p className="text-[13px] text-[#767576] font-medium font-dash_heading">
          {record?.submitted_students?.length || 0}
        </p>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      align: 'center',
      render: (_, record) => (
        <p className="text-[13px] text-[#767576] font-medium font-dash_heading">
          {formatDate(record?.start_date)}
        </p>
      ),
    },
    {
      title: 'Submission Deadline',
      align: 'center',
      render: (_, record) => (
        <p className="text-[13px] text-[#767576] font-medium font-dash_heading">
          {formatDate(record?.submission_date)}
        </p>
      ),
    },
    {
      title: 'Action',
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <div className="flex items-center justify-center gap-3">
          <Link href={`${url}/assignment/${record.id}`}>
            <ButtonDashboard className="bg-primary_btn hover:bg-[#002346bc] text-white">
              View
            </ButtonDashboard>
          </Link>
          <ButtonDashboard
            onClick={() => handleRemoveBtn(record)}
            className="bg-[#f64e45] hover:bg-[#cb433b] hover:opacity-80 text-white"
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
        <h2 className="text-xl pb-4 text-[#231f40] font-medium font-dash_heading">
          Assignment Details
        </h2>

        <div className="max-w-5xl mx-auto">
          <Table
            columns={columns}
            dataSource={
              currentEnrolledCourse
                ? [...(currentEnrolledCourse?.assignment_data || [])]
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

export default AssignmentComp;
