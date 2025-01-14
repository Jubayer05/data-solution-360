import { Button, message, Table } from 'antd';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { LuTrash2 } from 'react-icons/lu';
import { TfiPencilAlt } from 'react-icons/tfi';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';
import CustomModal from '../../utilities/CustomModal';
import DataFilterComponent from '../../utilities/FilteredButton';
import SellsModal from './SellsTrack/SellsModal';
import StatusBadge from './Utils/StatusBadge';

const db = firebase.firestore();

const ShowSells = ({ sells }) => {
  const { findCurrentUser } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [finalFilter, setFinalFilter] = useState([]);
  const db = firebase.firestore();

  // Filter leads for the current user and set initial data
  useEffect(() => {
    const mySells =
      sells?.filter(
        (sell) => sell.sells_processed?.email === findCurrentUser?.email,
      ) || [];

    // Set both filtered data and final filter
    if (mySells.length > 0) {
      setFilteredData(mySells);
      setFinalFilter(mySells);
    }
  }, [sells, findCurrentUser?.email]);

  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedRecord(null);
  };

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await db.collection('sells_data').doc(record?.id).delete();

      Swal.fire('Deleted!', 'The lead has been deleted.', 'success');
      const updatedData = filteredData.filter((lead) => lead.id !== record?.id);
      setFilteredData(updatedData);
      setFinalFilter(updatedData);
    } catch (error) {
      message.error('Failed to delete lead');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (editedData) => {
    try {
      setLoading(true);
      await db
        .collection('sells_data')
        .doc(selectedRecord.id)
        .update(editedData);

      // Update both filteredData and finalFilter
      const updatedData = filteredData.map((item) =>
        item.id === selectedRecord.id ? { ...item, ...editedData } : item,
      );

      setFilteredData(updatedData);
      setFinalFilter(updatedData);

      message.success('Record updated successfully'); 
      closeModal();
    } catch (error) {
      message.error('Failed to update record');
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilteredData) => {
    setFinalFilter(newFilteredData);
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
      width: 150,
      render: (record) => (
        <div>
          <StatusBadge status={record} />
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
      align: 'center',
      width: 200,
      render: (processed) => `${processed?.name || 'N/A'}`,
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
            icon={<TfiPencilAlt className="w-4 h-4" />}
            onClick={() => handleEdit(record)}
            className="flex items-center justify-center"
          />
          <Button
            type="primary"
            danger
            icon={<LuTrash2 className="w-4 h-4" />}
            loading={loading}
            onClick={() => handleDelete(record)}
            className="flex items-center justify-center"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="max-w-6xl mx-auto my-20 font-dash_heading">
        <div className="mt-10 p-10 bg-white rounded-md border-1">
          <h2 className="text-xl font-bold mb-4">
            Your Sells Table ({finalFilter?.length})
          </h2>
          <DataFilterComponent
            setFilteredData={setFinalFilter}
            data={filteredData}
          />
          <Table
            dataSource={finalFilter}
            columns={columns}
            rowKey="id"
            bordered
            pagination={{ pageSize: 5 }}
            scroll={{ x: 1500, y: 400 }} // Adjust x and y values as needed
          />
          <CustomModal
            modalIsOpen={isEditModalOpen}
            closeModal={closeModal}
            setModalIsOpen={setIsEditModalOpen}
          >
            <SellsModal
              onSubmit={handleEditSubmit}
              initialData={selectedRecord}
            />
          </CustomModal>
        </div>
      </div>
    </div>
  );
};

export default ShowSells;
