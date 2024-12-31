import { Button, message, Table } from 'antd';
import { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';
import DataFilterComponent from '../../utilities/FilteredButton';

const db = firebase.firestore();

const ShowSells = ({ sells, setLeads }) => {
  const { findCurrentUser } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  // Filter leads for the current user
  const mySells = sells.filter(
    (sells) => sells.sells_processed.email === findCurrentUser?.email,
  );

  // Delete functionality
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await db
        .collection('sells_data')
        .doc(record?.id)
        .delete()
        .then(() => {
          Swal.fire('Deleted!', 'The lead has been deleted.', 'success').then(
            () => {
              setFilteredData((prev) =>
                prev.filter((lead) => lead.uniqueId !== record?.uniqueId),
              );
            },
          );
        });
    } catch (error) {
      message.error('Failed to delete lead');
    } finally {
      setLoading(false);
    }
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 100,
      render: (status) => (
        <div>
          {status === 'pending' ? (
            <span className="bg-orange-50 border border-orange-500 px-2 text-xs rounded-full font-semibold text-[#df7c24]">
              Pending
            </span>
          ) : status === 'enrolled' ? (
            <span className="bg-green-50 border border-green-500 px-2 text-xs rounded-full font-semibold text-[#48bb78]">
              Enrolled
            </span>
          ) : status === 'cancelled' ? (
            <span className="bg-red-100 border border-red-500 px-2 text-xs rounded-full font-semibold text-[#be0909]">
              Cancelled
            </span>
          ) : (
            ''
          )}
        </div>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'payment',
      key: 'payment',
      align: 'center',
      width: 100,
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
      title: 'Batch Name',
      dataIndex: 'batch_name',
      key: 'batch_name',
      align: 'center',
      width: 150,
    },
    {
      title: 'Lead Processed',
      dataIndex: 'lead_processed',
      key: 'lead_processed',
      width: 200,
      render: (processed) =>
        `${processed?.name || 'N/A'} (${processed?.email || 'N/A'})`,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 150,
      render: (timestamp) => new Date(timestamp).toLocaleDateString(),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: 100,
      fixed: 'right', // Fixed right column
      render: (_, record) => (
        <Button
          type="primary"
          danger
          loading={loading}
          onClick={() => handleDelete(record)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="max-w-6xl mx-auto my-20 font-dash_heading">
        <div className="mt-10 p-10 bg-white rounded-md border-1">
          <h2 className="text-xl font-bold mb-4">
            Your Sells Table ({filteredData?.length})
          </h2>
          <DataFilterComponent
            setFilteredData={setFilteredData}
            data={mySells}
          />
          <Table
            dataSource={filteredData}
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

export default ShowSells;
