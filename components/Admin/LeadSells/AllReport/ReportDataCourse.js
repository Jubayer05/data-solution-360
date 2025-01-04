import { Table } from 'antd';
import { useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../../firebase';
import PieChartCustom from '../../../utilities/Chart/PieChart';
import DataFilterComponent from '../../../utilities/FilteredButton';

const db = firebase.firestore();

const ReportDataCourse = ({ sells, setLeads }) => {
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

  const groupByCourse = (data) => {
    const grouped = {};

    data.forEach((item) => {
      const { course_name } = item;

      if (!grouped[course_name]) {
        grouped[course_name] = { course_name, data: [] };
      }

      grouped[course_name].data.push(item);
    });

    return Object.entries(grouped).map(([course_name, { data }]) => ({
      course_name,
      data,
    }));
  };

  const allSellsData = groupByCourse(filteredData);

  const pieChartData = allSellsData.map((item) => ({
    name: `${item.course_name}`,
    value: item.data.length,
  }));

  return (
    <div>
      <div className="max-w-6xl mx-auto my-20 font-dash_heading">
        <div className="mt-10 p-10 bg-white rounded-md border-1">
          <h2 className="text-xl font-bold mb-4">
            Sells Table by Course ({filteredData?.length})
          </h2>
          <DataFilterComponent setFilteredData={setFilteredData} data={sells} />
          <PieChartCustom
            data={pieChartData}
            colors={['#4caf50', '#2196f3', '#ff5722', '#ffc107']}
          />

          {allSellsData?.map((item, index) => (
            <div key={index} className="mt-10">
              <h2 className="text-xl font-bold mb-4">
                Sells data by:{' '}
                <span className="text-primary">
                  {item?.course_name} ({item?.data.length})
                </span>
              </h2>
              <Table
                dataSource={item?.data}
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

export default ReportDataCourse;
