import { useEffect, useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../../firebase';

import { Table } from 'antd';
import Link from 'next/link';
import { loadData } from '../../../../src/hooks/loadData';
import ButtonDashboard from '../../../utilities/dashboard/ButtonDashboard';

const db = firebase.firestore();

const ModuleDetails = () => {
  const [courseDataBatch, setCourseDataBatch] = useState([]);
  const [url, setUrl] = useState('');

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
    setUpdatedModule(currentEnrolledCourse?.course_modules);
  }, [currentEnrolledCourse]);

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
      title: 'Total Class',
      dataIndex: 'liveClassNumber',
      align: 'center',
    },
    {
      title: 'Class Complete',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: 'Module Status',
      // dataIndex: 'moduleStatus',
      align: 'center',
      render: (_, record) => (
        <div>
          {record?.moduleStatus == 'finished' ? (
            <span className="bg-green-50 border border-green-500 px-2 text-xs rounded-full font-semibold text-[#48bb78]">
              Finished
            </span>
          ) : record?.moduleStatus === 'running' ? (
            <span className="bg-blue-100 border border-blue-500 px-2 text-xs rounded-full font-semibold text-[#4299e1]">
              Running
            </span>
          ) : record?.moduleStatus === 'upcoming' ? (
            <span className="bg-purple-100 border border-purple-500 px-2 text-xs rounded-full font-semibold text-[#6b46c1]">
              Upcoming
            </span>
          ) : (
            <span className="bg-purple-100 border border-purple-500 px-2 text-xs rounded-full font-semibold text-[#6b46c1]">
              Upcoming
            </span>
          )}
        </div>
      ),
    },
    {
      title: 'Action',

      align: 'center',
      fixed: 'right',
      render: (_, record, index) => (
        <div className="flex items-center justify-center gap-5">
          <Link href={`${url}/modules/${record.id}`}>
            <ButtonDashboard className="bg-primary_btn hover:bg-[#002346bc] text-white">
              Edit
            </ButtonDashboard>
          </Link>
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
        </div>
      </div>
    </div>
  );
};

export default ModuleDetails;
