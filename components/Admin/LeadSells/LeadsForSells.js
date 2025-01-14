import { Button, Table } from 'antd';
import { format } from 'date-fns';
import { useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import DataFilterComponent from '../../utilities/FilteredButton';
import StatusBadge from './Utils/StatusBadge';

const LeadsForSells = ({ leads, handleTakeLead }) => {
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
      width: 120,
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
          <StatusBadge status={record?.status} />
        </div>
      ),
    },
    {
      title: 'Created At',
      key: 'createdAt',
      align: 'center',
      render: (date) => {
        const time = date?.createdAt
          ? format(new Date(date.createdAt), 'hh:mm a')
          : 'N/A';
        const formattedDate = date?.createdAt
          ? format(new Date(date.createdAt), 'dd MMM yyyy')
          : 'N/A';
        return (
          <div
            style={{ textAlign: 'center', fontWeight: '500', color: '#555' }}
          >
            <div style={{ fontSize: '14px', color: '#555' }}>{time}</div>
            <div style={{ fontSize: '14px', color: '#555' }}>
              {formattedDate}
            </div>
          </div>
        );
      },
      width: 150,
    },
    {
      title: 'Lead Created',
      dataIndex: 'lead_processed',
      key: 'lead_processed',
      align: 'center',
      width: 200,
      render: (processed) => `${processed?.name || 'N/A'}`,
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
          onClick={() => handleTakeLead(record)}
        >
          Take Lead
        </Button>
      ),
    },
  ];

  const finalFilter = filteredData.filter((item) => item.status === 'pending');

  return (
    <div>
      <div className="max-w-7xl mx-auto my-20 font-dash_heading">
        <div className="mt-10 p-10 bg-white rounded-md border-1">
          <h2 className="text-xl font-bold mb-4">
            Total Leads Table ({finalFilter?.length})
          </h2>
          <DataFilterComponent setFilteredData={setFilteredData} data={leads} />
          <Table
            dataSource={finalFilter}
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
