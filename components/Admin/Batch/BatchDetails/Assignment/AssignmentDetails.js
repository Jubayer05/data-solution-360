import { ConfigProvider, Spin, Table } from 'antd'; // Import Spin from 'antd'
import { Download, FileDiff } from 'lucide-react';
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
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState({});
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [currentEnrolledCourse, setCurrentEnrolledCourse] = useState(null);

  useEffect(() => {
    loadData('course_data_batch', setCourseDataBatch);
    const currentUrl = window.location.href.split('/').slice(-1)[0];
    setUrl(currentUrl);
  }, []);

  useEffect(() => {
    if (courseDataBatch.length > 0 && batchId && assignmentId) {
      const course = courseDataBatch.find((course) => course.id === batchId);
      setCurrentEnrolledCourse(course);

      const assignment = course?.assignment_data?.find(
        (assignment) => assignment.id === assignmentId,
      );
      setCurrentAssignment(assignment || null);
    }
  }, [courseDataBatch, batchId, assignmentId]);

  const handleMarksChange = (studentId, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [studentId]: value,
    }));
  };

  const handleUpdateMarks = async (studentId) => {
    const studentMarks = marks[studentId];

    if (parseFloat(studentMarks) > parseFloat(currentAssignment?.total_marks)) {
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
              return { ...student, obtain_marks: studentMarks };
            }
            return student;
          });

        const updatedAssignment = {
          ...currentAssignment,
          submitted_students: updatedSubmittedStudents,
        };

        const updatedCourseData = {
          ...currentEnrolledCourse,
          assignment_data: [
            ...currentEnrolledCourse?.assignment_data.filter(
              (item) => item.id !== assignmentId,
            ),
            updatedAssignment,
          ],
        };

        // Update Firestore
        await db
          .collection('course_data_batch')
          .doc(batchId)
          .update(updatedCourseData);

        // Update local state
        setCurrentAssignment(updatedAssignment);
        setCurrentEnrolledCourse(updatedCourseData);

        // Update courseDataBatch state
        setCourseDataBatch((prevBatches) =>
          prevBatches.map((batch) =>
            batch.id === batchId ? updatedCourseData : batch,
          ),
        );

        // Clear the input field
        setMarks((prevMarks) => ({ ...prevMarks, [studentId]: '' }));

        Swal.fire({
          title: 'Marks Updated',
          text: 'The marks have been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
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

  const handleFileDownload = (downloadURL) => {
    window.open(downloadURL, '_blank');
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
        <div>
          {record?.assignmentLinks?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 mt-2"
            >
              <div className="flex items-center w-[98%] text-gray-500 text-xs">
                <FileDiff className="mr-2 w-5" />
                <span className="w-[90%] text-left">{item.fileName}</span>
              </div>
              <Download
                onClick={() => handleFileDownload(item?.downloadURL)}
                className="cursor-pointer text-lg text-red-500"
              />
            </div>
          ))}
        </div>
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
          onWheel={(e) => e.target.blur()}
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
              x: 'max-content',
              y: 500,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;
