import {
  Badge,
  Card,
  Input,
  Progress,
  Space,
  Spin,
  Table,
  Typography,
} from 'antd';
import { Check, X } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import firebase from '../../../../../firebase';
import { loadData } from '../../../../../src/hooks/loadData';

const { Title, Text } = Typography;
const { Search: AntSearch } = Input;

const AssignmentTrackingMatrix = () => {
  const [courseDataBatch, setCourseDataBatch] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { batchId } = router.query;

  useEffect(() => {
    loadData('course_data_batch', setCourseDataBatch);
  }, []);

  const currentEnrolledCourse = courseDataBatch.find(
    (course) => course.id === batchId,
  );

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      if (!currentEnrolledCourse?.enrolled_students?.length) {
        setIsLoading(false);
        return;
      }

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
        setFilteredStudents(studentsData);
      } catch (error) {
        console.error('Error fetching enrolled students:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentEnrolledCourse) {
      fetchEnrolledStudents();
    }
  }, [courseDataBatch, batchId]);

  const handleSearch = (value) => {
    const filtered = enrolledStudents.filter((student) =>
      student.full_name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredStudents(filtered);
    setSearchText(value);
  };

  const getTotalSubmissions = (studentId) => {
    return (currentEnrolledCourse?.assignment_data || []).reduce(
      (count, assignment) => {
        const hasSubmitted = assignment.submitted_students?.some(
          (submission) => submission.student_id === studentId,
        );
        return count + (hasSubmitted ? 1 : 0);
      },
      0,
    );
  };

  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'full_name',
      fixed: 'left',
      width: 200,
      render: (text) => <Text strong>{text}</Text>,
    },
    ...(currentEnrolledCourse?.assignment_data || []).map((assignment) => ({
      title: () => (
        <div className="text-center">
          <div>{assignment.title}</div>
          <Badge
            count={`${assignment.submitted_students?.length || 0}/${
              filteredStudents.length
            }`}
            style={{ backgroundColor: '#52c41a' }}
          />
        </div>
      ),
      dataIndex: assignment.id,
      width: 120,
      align: 'center',
      render: (_, record) => {
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
      title: 'Completion',
      fixed: 'right',
      width: 200,
      align: 'center',
      render: (_, record) => {
        const totalSubmissions = getTotalSubmissions(record.student_id);
        const totalAssignments =
          currentEnrolledCourse?.assignment_data?.length || 0;
        const percentage = (totalSubmissions / totalAssignments) * 100;

        return (
          <Space direction="vertical" size="small" className="w-full">
            <Progress
              percent={Math.round(percentage)}
              size="small"
              status={percentage === 100 ? 'success' : 'active'}
            />
            <Text type="secondary">
              {totalSubmissions} / {totalAssignments}
            </Text>
          </Space>
        );
      },
    },
  ];

  return (
    <Card className="mx-auto my-8" style={{ maxWidth: 1200 }}>
      <Space direction="vertical" size="large" className="w-full">
        <Space direction="vertical" size="small">
          <Title level={4} style={{ margin: 0 }}>
            Assignment Submission Matrix
          </Title>
          <Text type="secondary">
            Track student assignment submissions and completion rates
          </Text>
        </Space>

        <Space className="w-full" direction="vertical">
          <div className="flex justify-end">
            <AntSearch
              placeholder="Search student name..."
              allowClear
              enterButton="Search"
              size="large"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={handleSearch}
              style={{ width: 300 }}
            />
          </div>

          <Spin spinning={isLoading} size="large">
            <Table
              columns={columns}
              dataSource={filteredStudents}
              rowKey="id"
              pagination={{
                pageSize: 15,
                showSizeChanger: false,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} students`,
              }}
              scroll={{
                x: 'max-content',
                y: 600,
              }}
              summary={(pageData) => {
                const totalSubmissions = (
                  currentEnrolledCourse?.assignment_data || []
                ).map((assignment) => ({
                  title: assignment.title,
                  count: assignment.submitted_students?.length || 0,
                  total: filteredStudents.length,
                }));

                return (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} fixed="left">
                        <Text strong>Total Submissions</Text>
                      </Table.Summary.Cell>
                      {totalSubmissions.map((total, index) => (
                        <Table.Summary.Cell
                          index={index + 1}
                          key={index}
                          align="center"
                        >
                          <Text strong>
                            {total.count} / {total.total}
                          </Text>
                        </Table.Summary.Cell>
                      ))}
                      <Table.Summary.Cell
                        index={totalSubmissions.length + 1}
                        fixed="right"
                      />
                    </Table.Summary.Row>
                  </Table.Summary>
                );
              }}
            />
          </Spin>
        </Space>
      </Space>
    </Card>
  );
};

export default AssignmentTrackingMatrix;
