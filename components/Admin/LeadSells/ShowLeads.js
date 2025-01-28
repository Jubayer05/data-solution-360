import { Button, message, Table } from 'antd';
import { format } from 'date-fns';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';
import DataFilterComponent from '../../utilities/FilteredButton';

const db = firebase.firestore();

const ShowLeads = ({ leads, setLeads }) => {
  const { findCurrentUser } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  // Filter leads for the current user
  const myLead = leads.filter(
    (lead) => lead.lead_processed.email === findCurrentUser?.email,
  );

  // Delete functionality
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await db
        .collection('lead_data')
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 80,
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
      title: 'Action',
      key: 'action',
      align: 'center',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <div className="flex justify-center space-x-2">
          <Button
            type="primary"
            icon={<Edit className="w-4 h-4" />}
            onClick={() => handleEdit(record)}
            className="flex items-center justify-center"
          />
          <Button
            type="primary"
            danger
            icon={<Trash2 className="text-red-500 cursor-pointer" />}
            loading={loading}
            onClick={() => handleDelete(record)}
            className="flex items-center justify-center"
          />
        </div>
      ),
    },
  ];

  console.log(filteredData);

  return (
    <div>
      <div className="max-w-6xl mx-auto my-20 font-dash_heading">
        <div className="mt-10 p-10 bg-white rounded-md border-1">
          <h2 className="text-xl font-bold mb-4">
            Your Leads Table ({filteredData?.length})
          </h2>
          <DataFilterComponent
            setFilteredData={setFilteredData}
            data={myLead}
          />
          <Table
            dataSource={filteredData}
            columns={columns}
            rowKey="id"
            bordered
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShowLeads;
