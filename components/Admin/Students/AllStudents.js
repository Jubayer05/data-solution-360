import { compareDesc } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';

import { Button, Table } from 'antd';
import { loadData } from '../../../src/hooks/loadData';

const db = firebase.firestore();

const AllStudents = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the user data
        loadData('users', setUserData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Log the user data to ensure it's being loaded correctly
  useEffect(() => {
    console.log('Fetched userData:', userData);
  }, [userData]);

  // Sorting logic using useMemo to prevent unnecessary re-sorting on each render
  const sortedData = useMemo(() => {
    console.log('Sorting userData:', userData); // Debugging line to check data before sorting

    return [...userData].sort((a, b) => {
      const defaultDate = new Date(0); // Fallback to a very early date for missing createdAt

      const dateA = a.createdAt
        ? a.createdAt.toDate() instanceof Date
          ? a.createdAt.toDate()
          : defaultDate
        : defaultDate;

      const dateB = b.createdAt
        ? b.createdAt.toDate() instanceof Date
          ? b.createdAt.toDate()
          : defaultDate
        : defaultDate;

      return compareDesc(dateA, dateB); // Newest first
    });
  }, [userData]);

  // Log the sorted data to verify sorting
  useEffect(() => {
    console.log('Sorted Data:', sortedData);
  }, [sortedData]);

  const handleDelete = async (userId) => {
    try {
      const confirm = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this user? This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (confirm.isConfirmed) {
        await db.collection('users').doc(userId).delete();
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');

        // Remove the deleted user from the state
        setUserData((prevData) =>
          prevData.filter((user) => user.id !== userId),
        );
      }
    } catch (error) {
      Swal.fire(
        'Error!',
        'An error occurred while deleting the user.',
        'error',
      );
      console.error('Error deleting user:', error);
    }
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
      title: 'Account Created',
      dataIndex: 'createdAt',
      align: 'center',
      render: (_, record) => (
        <p>{record.createdAt ? formatDate(record.createdAt) : 'N/A'}</p>
      ),
      width: 180,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      width: 120,
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record.key)}>
          Delete
        </Button>
      ),
    },
  ];

  function formatDate(timestamp) {
    const date = timestamp.toDate();
    return date.toLocaleString(); // Display as "MM/DD/YYYY, HH:MM:SS AM/PM"
  }

  return (
    <div className="max-w-5xl mx-auto my-20">
      <div className="border-1 p-5 rounded-lg bg-white mt-10">
        <h2 className="text-xl pb-4 text-[#231f40] font-medium font-dash_heading">
          Enrolled Student
        </h2>

        <div className="max-w-5xl mx-auto">
          <Table
            columns={columns}
            dataSource={sortedData.map((user) => ({
              ...user,
              id: user.key, // Ensure each row has a unique `key` field for delete
              key: user.key, // Required by Ant Design Table
            }))}
            pagination={{
              pageSize: 100,
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

export default AllStudents;
