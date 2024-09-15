import { useEffect, useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../../firebase';

import { Table } from 'antd';
import { loadData } from '../../../../src/hooks/loadData';
import ButtonDashboard from '../../../utilities/dashboard/ButtonDashboard';
import AddModule from '../../Course/AddModule';

const db = firebase.firestore();

const ModuleDetails = () => {
  const [courseDataBatch, setCourseDataBatch] = useState([]);
  const [url, setUrl] = useState('');

  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [updatedModule, setUpdatedModule] = useState([]);

  useEffect(() => {
    loadData('course_data_batch', setCourseDataBatch);
    const url = window.location.href.split('/').slice(-1)[0];
    setUrl(url);
  }, []);

  const currentEnrolledCourse = courseDataBatch.find(
    (course) => course.id === url,
  );

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

  // console.log(currentEnrolledCourse);

  const columns = [
    {
      title: 'Module No',
      dataIndex: 'serialNumber',
      width: 90,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Module Name',
      dataIndex: 'moduleName',
      align: 'center',
      // render: (_, record, index) => <p>{record}</p>,
    },
    {
      title: 'Live Class Link',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: 'Quiz',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: 'Action',

      align: 'center',
      fixed: 'right',
      render: (_, record, index) => (
        <div className="flex items-center justify-center gap-5">
          <ButtonDashboard
            onClick={() => handleRejectBtn(record)}
            className="bg-primary_btn hover:bg-[#002346bc] text-white"
          >
            Edit
          </ButtonDashboard>
          {/* Add more actions as needed */}
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto my-20">
      <div className="border-1 p-5 rounded-lg bg-white mt-10">
        <h2 className="text-xl pb-4 text-[#231f40] font-medium font-dash_heading ">
          Module Details
        </h2>

        <div className="max-w-5xl mx-auto">
          <Table
            columns={columns}
            dataSource={
              currentEnrolledCourse
                ? [...currentEnrolledCourse?.course_modules]
                : []
            }
            pagination={{
              pageSize: 15,
            }}
            scroll={{
              y: 500,
            }}
          />
          <AddModule
            courseModule={currentEnrolledCourse?.course_modules}
            setCourseModule={setUpdatedModule}
          />
        </div>
      </div>
    </div>
  );
};

export default ModuleDetails;
