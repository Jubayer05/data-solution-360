import { compareDesc, format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';

import { Button, Input, Table } from 'antd';
import { loadData } from '../../../src/hooks/loadData';

const db = firebase.firestore();

const AllStudents = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  useEffect(() => {
    const bangladeshRegex = /^(?:\+880|880)/;
    let filteredByRole = userData.filter((user) => user.role === 'student');

    if (filter === 'bangladesh') {
      filteredByRole = filteredByRole.filter((user) =>
        bangladeshRegex.test(user.phone),
      );
    } else if (filter === 'foreign') {
      filteredByRole = filteredByRole.filter(
        (user) => !bangladeshRegex.test(user.phone),
      );
    }

    // Apply search query
    if (searchQuery.trim()) {
      filteredByRole = filteredByRole.filter(
        (user) =>
          user?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.phone.includes(searchQuery),
      );
    }

    setFilteredData(filteredByRole);
  }, [userData, filter, searchQuery]);

  // Sorting logic using useMemo to prevent unnecessary re-sorting on each render
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const defaultDate = new Date(0); // Default to a very early date if missing

      const parseDate = (date) => {
        if (!date) return defaultDate; // If null or undefined, use default
        if (typeof date.toDate === 'function') return date.toDate(); // Firestore Timestamp
        if (typeof date === 'string') return new Date(date); // ISO String
        return defaultDate;
      };

      const dateA = parseDate(a.createdAt);
      const dateB = parseDate(b.createdAt);

      return compareDesc(dateA, dateB); // Newest first
    });
  }, [filteredData]);

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

  const handleReset = async (userId) => {
    try {
      const confirm = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to reset this user information?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reset it!',
      });

      if (confirm.isConfirmed) {
        await db.collection('users').doc(userId).update({
          enrolled_courses: [],
        });

        Swal.fire(
          'Reset!',
          'The user information has been updated.',
          'success',
        );

        // Update the user data in the state
        setUserData((prevData) =>
          prevData.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  full_name: 'Default Name',
                  phone: '0000000000',
                  role: 'student',
                }
              : user,
          ),
        );
      }
    } catch (error) {
      Swal.fire(
        'Error!',
        'An error occurred while resetting the user.',
        'error',
      );
      console.error('Error resetting user:', error);
    }
  };

  const handleFilter = (type) => {
    setFilter(type);
    const bangladeshRegex = /^(?:\+880|880)/;

    // Filter the data based on the phone number prefix and role being 'student'
    const filteredByRole = userData.filter((user) => user.role === 'student');

    if (type === 'bangladesh') {
      setFilteredData(
        filteredByRole.filter((user) => bangladeshRegex.test(user.phone)),
      );
    } else if (type === 'foreign') {
      setFilteredData(
        filteredByRole.filter((user) => !bangladeshRegex.test(user.phone)),
      );
    } else {
      setFilteredData(filteredByRole); // For 'all', only show students
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
        <p>{record.createdAt ? formatDate(record?.createdAt) : 'N/A'}</p>
      ),
      width: 180,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      width: 120,
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="primary" info onClick={() => handleReset(record.id)}>
            Reset
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  function formatDate(timestamp) {
    let date;
    if (!timestamp) return 'N/A';

    if (typeof timestamp.toDate === 'function') {
      date = timestamp.toDate(); // Firestore Timestamp
    } else if (typeof timestamp === 'string') {
      date = new Date(timestamp); // ISO String
    } else {
      return 'Invalid Date';
    }

    return format(date, 'yyyy-MM-dd HH:mm:ss'); // Format the date
  }

  return (
    <div className="max-w-5xl mx-auto my-20">
      <div className="border-1 p-5 rounded-lg bg-white mt-10">
        <h2 className="text-xl pb-4 text-[#231f40] font-medium font-dash_heading">
          Total Students ({sortedData?.length})
        </h2>
        <Input
          placeholder="🔍 Search by Name or Phone"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            marginBottom: '20px',
            width: '100%',
            maxWidth: '400px',
            padding: '10px 15px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #d9d9d9',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease-in-out',
          }}
          allowClear
        />
        <div className="mb-4">
          <Button
            onClick={() => handleFilter('bangladesh')}
            type="primary"
            className="mr-2"
          >
            Bangladeshi Students
          </Button>
          <Button
            onClick={() => handleFilter('foreign')}
            type="primary"
            className="mr-2"
          >
            Foreign Students
          </Button>
          <Button onClick={() => handleFilter('all')} type="default">
            All Students
          </Button>
        </div>

        <div className="max-w-5xl mx-auto">
          <Table
            columns={columns}
            dataSource={sortedData.map((user) => ({
              ...user,
              key: user.id,
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
