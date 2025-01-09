import { Button, Table } from 'antd';
import { useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import DataFilterComponent from '../../utilities/FilteredButton';

const LeadsForSells = ({ leads, setTakeLead }) => {
  const [loading, setLoading] = useState(false);
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
      width: 100,
    },
    {
      title: 'Course Name',
      dataIndex: 'course_name',
      key: 'course_name',
      width: 200,
    },
    {
      title: 'Feedback',
      dataIndex: 'feedback',
      key: 'feedback',
      width: 150,
    },
    {
      title: 'Other Details',
      dataIndex: 'other_details',
      key: 'other_details',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 100,
      render: (text, record) => (
        <div>
          {record?.status == 'pending' ? (
            <span className="bg-orange-50 border border-orange-500 px-2 text-xs rounded-full font-semibold text-[#df7c24]">
              Pending
            </span>
          ) : record?.status === 'enrolled' ? (
            <span className="bg-green-50 border border-green-500 px-2 text-xs rounded-full font-semibold text-[#48bb78]">
              Completed
            </span>
          ) : record?.status === 'cancelled' ? (
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
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 150,
    },
    {
      title: 'Lead Created',
      dataIndex: 'lead_processed',
      key: 'lead_processed',
      align: 'center',
      width: 200,
      render: (processed) =>
        `${processed?.name || 'N/A'} (${processed?.email || 'N/A'})`,
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Button
          type="primary"
          info
          loading={loading}
          onClick={() => setTakeLead(record)}
        >
          Take Lead
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="max-w-7xl mx-auto my-20 font-dash_heading">
        <div className="mt-10 p-10 bg-white rounded-md border-1">
          <h2 className="text-xl font-bold mb-4">
            Total Leads Table ({filteredData?.length})
          </h2>
          <DataFilterComponent setFilteredData={setFilteredData} data={leads} />
          <Table
            dataSource={filteredData}
            columns={columns}
            rowKey="id"
            bordered
            pagination={{ pageSize: 5 }}
            scroll={{ x: 1500, y: 400 }}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadsForSells;
