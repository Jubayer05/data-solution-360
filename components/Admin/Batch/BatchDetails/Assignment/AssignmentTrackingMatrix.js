import { Table } from 'antd';
import { Check, X } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import firebase from '../../../../../firebase';
import { loadData } from '../../../../../src/hooks/loadData';

const AssignmentTrackingMatrix = () => {
  const [courseDataBatch, setCourseDataBatch] = useState([]);
  const router = useRouter();
  const { batchId } = router.query;
  const [enrolledStudents, setEnrolledStudents] = useState([]);

  useEffect(() => {
    loadData('course_data_batch', setCourseDataBatch);
  }, []);

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      if (!currentEnrolledCourse?.enrolled_students?.length) return;

      try {
        const studentsRef = firebase.firestore().collection('users');
        const snapshot = await studentsRef
          .where('role', '==', 'student')
          .where('student_id', 'in', currentEnrolledCourse.enrolled_students)
          .get();

        const studentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEnrolledStudents(studentsData);
      } catch (error) {
        console.error('Error fetching enrolled students:', error);
      }
    };

    if (currentEnrolledCourse) {
      fetchEnrolledStudents();
    }
  }, [courseDataBatch, batchId]);

  const currentEnrolledCourse = courseDataBatch.find(
    (course) => course.id === batchId,
  );

  // Create dynamic columns based on assignments
  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'full_name',
      fixed: 'left',
      width: 200,
      render: (text) => (
        <p className="text-[13px] text-[#767576] font-medium font-dash_heading">
          {text}
        </p>
      ),
    },
    ...(currentEnrolledCourse?.assignment_data || []).map((assignment) => ({
      title: assignment.title,
      dataIndex: assignment.id,
      width: 120,
      align: 'center',
      render: (_, record) => {
        console.log(record?.student_id);
        const hasSubmitted = assignment.submitted_students?.some(
          (submission) => submission.student_id === record.student_id,
        );
        return hasSubmitted ? (
          <Check className="mx-auto text-green-500" size={20} />
        ) : (
          <X className="mx-auto text-red-500" size={20} />
        );
      },
    })),
    {
      title: 'Total Submitted',
      fixed: 'right',
      width: 120,
      align: 'center',
      render: (_, record) => {
        const totalSubmissions = (
          currentEnrolledCourse?.assignment_data || []
        ).reduce((count, assignment) => {
          const hasSubmitted = assignment.submitted_students?.some(
            (submission) => submission.student_id === record.student_id,
          );
          return count + (hasSubmitted ? 1 : 0);
        }, 0);
        return (
          <p className="text-[13px] font-medium font-dash_heading">
            {totalSubmissions} /{' '}
            {currentEnrolledCourse?.assignment_data?.length || 0}
          </p>
        );
      },
    },
  ];

  return (
    <div className="max-w-7xl mx-auto my-20">
      <div className="border-1 p-5 rounded-lg bg-white mt-10">
        <h2 className="text-xl pb-4 text-[#231f40] font-medium font-dash_heading">
          Assignment Submission Matrix
        </h2>
        <div className="max-w-full mx-auto">
          <Table
            columns={columns}
            dataSource={enrolledStudents}
            pagination={{
              pageSize: 15,
            }}
            scroll={{
              x: 'max-content',
              y: 500,
            }}
            rowKey="id"
            summary={(pageData) => {
              // Calculate total submissions per assignment
              const totalSubmissions = (
                currentEnrolledCourse?.assignment_data || []
              ).map((assignment) => ({
                title: assignment.title,
                count: assignment.submitted_students?.length || 0,
                total: enrolledStudents.length,
              }));

              return (
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} fixed="left">
                      <strong>Total Submissions</strong>
                    </Table.Summary.Cell>
                    {totalSubmissions.map((total, index) => (
                      <Table.Summary.Cell
                        index={index + 1}
                        key={index}
                        align="center"
                      >
                        <strong>
                          {total.count} / {total.total}
                        </strong>
                      </Table.Summary.Cell>
                    ))}
                    <Table.Summary.Cell
                      index={totalSubmissions.length + 1}
                      fixed="right"
                    >
                      {/* Empty cell for the "Total Submitted" column */}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AssignmentTrackingMatrix;
