import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { FaCheckDouble } from 'react-icons/fa';
import { TbCurrencyTaka } from 'react-icons/tb';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../../firebase';
const db = firebase.firestore();

const DueSheet = ({ sells }) => {
  const [dueData, setDueData] = useState([]);

  useEffect(() => {
    const dueDataArr = sells.filter(
      (item) => item.due_amount && item.due_amount >= 0,
    );
    setDueData(dueDataArr);
  }, [sells]);

  const totalDue = dueData.reduce(
    (acc, cur) => acc + parseInt(cur.due_amount),
    0,
  );

  const handleMarkPaid = (record) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to mark this customer as paid with ${record?.due_amount} Taka`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        db.collection('sells_data')
          .doc(record.id)
          .update({
            paid_amount:
              parseInt(record.paid_amount) + parseInt(record.due_amount),
            due_amount: 0,
            due_status: 'completed',
          })
          .then(() => {
            Swal.fire(
              'Payment Marked!',
              'The customer has been marked as paid.',
              'success',
            );
            const updatedDueData = dueData.filter(
              (data) => data.id !== record.id,
            );

            console.log(updatedDueData);

            setDueData(updatedDueData);
          });
        // Mark the customer as paid
        // Update the 'paid_amount' and 'due_amount' in the sells array
        // You can use the provided 'handleMarkPaid' function as a reference
      }
    });
  };

  // Ant Design Table Columns
  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'customer_name',
      key: 'customer_name',
      align: 'center',
      width: 150,
    },
    {
      title: 'Phone Number',
      dataIndex: 'customer_phoneNumber',
      key: 'customer_phoneNumber',
      align: 'center',
      width: 120,
    },
    {
      title: 'Course Name',
      dataIndex: 'course_name',
      key: 'course_name',
      width: 230,
    },
    {
      title: 'Paid Amount',
      dataIndex: 'paid_amount',
      key: 'paid_amount',
      align: 'center',
      width: 100,
    },
    {
      title: 'Due Amount',
      dataIndex: 'due_amount',
      key: 'due_amount',
      align: 'center',
      width: 100,
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
      align: 'center',
      width: 150,
      render: (dueDate) => new Date(dueDate).toLocaleDateString(),
    },
    {
      title: 'Due Status',
      dataIndex: 'due_status',
      key: 'due_status',
      align: 'center',
      width: 100,
      render: (dueStatus) => (
        <span
          className={`px-2 text-xs rounded-full font-semibold ${
            dueStatus === 'Pending'
              ? 'bg-orange-50 border border-orange-500 text-[#df7c24]'
              : dueStatus === 'Completed'
              ? 'bg-green-50 border border-green-500 text-[#48bb78]'
              : ''
          }`}
        >
          {dueStatus}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Button type="primary" info onClick={() => handleMarkPaid(record)}>
          Mark Paid <FaCheckDouble />
        </Button>
      ),
    },
  ];

  console.log(dueData);

  return (
    <div>
      <div className="max-w-6xl mx-auto my-20 font-dash_heading">
        <div className="mt-10 p-10 bg-white rounded-md border-1">
          <h2 className="text-xl font-bold mb-4">Due Table</h2>

          <h2 className="text-lg font-bold mb-4 flex items-center">
            Total Due Amount:{' '}
            <span className="text-primary flex items-center">
              <TbCurrencyTaka />
              {totalDue}
            </span>
          </h2>

          <Table
            dataSource={dueData}
            columns={columns}
            rowKey="id"
            bordered
            pagination={{ pageSize: 5 }}
            scroll={{ x: 1500, y: 400 }} // Adjust x and y values as needed
          />
        </div>
      </div>
    </div>
  );
};

export default DueSheet;
