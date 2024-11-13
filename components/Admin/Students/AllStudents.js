import { useEffect, useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';

import { Table } from 'antd';
import { loadData } from '../../../src/hooks/loadData';

const db = firebase.firestore();

const AllStudents = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    loadData('users', setUserData);
  }, []);

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
      title: 'Account Created',
      dataIndex: 'createdAt',
      align: 'center',
      render: (_, record, index) => (
        <p>{record.createdAt ? formatDate(record.createdAt) : 'N/A'}</p>
      ),
      width: 180,
    },
  ];

  function formatDate(timestamp) {
    const date = timestamp.toDate();
    return date.toLocaleString(); // Display as "MM/DD/YYYY, HH:MM:SS AM/PM"
  }

  return (
    <div className="max-w-5xl mx-auto my-20">
      <div className="border-1 p-5 rounded-lg bg-white mt-10">
        <h2 className="text-xl pb-4 text-[#231f40] font-medium font-dash_heading ">
          Enrolled Student
        </h2>

        <div className="max-w-5xl mx-auto">
          <Table
            columns={columns}
            dataSource={[...userData]}
            // pagination={{
            //   pageSize: 15,
            // }}
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

export default AllStudents;
