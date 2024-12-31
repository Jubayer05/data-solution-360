import { Table } from 'antd';
import { useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../../firebase';
import DataFilterComponent from '../../../utilities/FilteredButton';

const db = firebase.firestore();

const ReportData = ({ sells, setLeads }) => {
  const [filteredData, setFilteredData] = useState([]);

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
  ];

  const groupByEmail = (data) => {
    const grouped = {};

    data.forEach((item) => {
      const email = item.sells_processed.email;
      const name = item.sells_processed.full_name;

      if (!grouped[email]) {
        grouped[email] = [];
      }

      grouped[email].push(item);
    });

    return Object.values(grouped); // Convert the grouped object to an array of subarrays
  };

  const allSellsData = groupByEmail(sells);
  console.log(allSellsData);

  return (
    <div>
      <div className="max-w-6xl mx-auto my-20 font-dash_heading">
        <div className="mt-10 p-10 bg-white rounded-md border-1">
          <h2 className="text-xl font-bold mb-4">
            Your Sells Table ({filteredData?.length})
          </h2>
          <DataFilterComponent setFilteredData={setFilteredData} data={sells} />
          {allSellsData?.map((item, index) => (
            <div key={index} className="mt-10">
              <h2 className="text-xl font-bold mb-4">
                Sells data by:{' '}
                <span className="text-primary">
                  {item[0]?.sells_processed?.name} ({item.length})
                </span>
              </h2>
              <Table
                dataSource={item}
                columns={columns}
                rowKey="id"
                bordered
                pagination={{ pageSize: 5 }}
                scroll={{ x: 1500, y: 400 }} // Adjust x and y values as needed
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportData;
