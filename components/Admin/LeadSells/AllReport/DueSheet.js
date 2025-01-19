import { Button, Table } from 'antd';
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../../firebase';

const db = firebase.firestore();

const DueSheet = ({ sells }) => {
  const [dueData, setDueData] = useState([]);
  const [overdueData, setOverdueData] = useState([]);
  const [summaryStats, setSummaryStats] = useState({
    totalCustomers: 0,
    totalDueAmount: 0,
    averageDueAmount: 0,
    overdueCount: 0,
    pendingCount: 0,
    totalOverdueAmount: 0,
  });

  useEffect(() => {
    const dueDataArr = sells.filter(
      (item) => item.due_amount && item.due_amount >= 0,
    );
    const overdueDataArr = dueDataArr.filter(
      (item) => new Date(item.due_date) < new Date(),
    );

    setDueData(dueDataArr);
    setOverdueData(overdueDataArr);

    // Calculate summary statistics
    const stats = {
      totalCustomers: dueDataArr.length,
      totalDueAmount: dueDataArr.reduce(
        (acc, cur) => acc + parseInt(cur.due_amount),
        0,
      ),
      averageDueAmount: Math.round(
        dueDataArr.reduce((acc, cur) => acc + parseInt(cur.due_amount), 0) /
          (dueDataArr.length || 1),
      ),
      overdueCount: overdueDataArr.length,
      pendingCount: dueDataArr.filter((item) => item.due_status === 'Pending')
        .length,
      totalOverdueAmount: overdueDataArr.reduce(
        (acc, cur) => acc + parseInt(cur.due_amount),
        0,
      ),
    };
    setSummaryStats(stats);
  }, [sells]);

  const handleMarkPaid = (record) => {
    Swal.fire({
      title: 'Confirm Payment',
      text: `Mark payment of ৳${record?.due_amount} as completed?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#10B981',
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
            Swal.fire({
              title: 'Payment Recorded',
              text: 'Payment has been marked as completed',
              icon: 'success',
              confirmButtonColor: '#10B981',
            });
            const updatedDueData = dueData.filter(
              (data) => data.id !== record.id,
            );
            const updatedOverdueData = overdueData.filter(
              (data) => data.id !== record.id,
            );
            setDueData(updatedDueData);
            setOverdueData(updatedOverdueData);
          });
      }
    });
  };

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'customer_name',
      key: 'customer_name',
      align: 'left',
      width: 150,
      render: (text) => <span className="font-medium">{text}</span>,
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
      align: 'right',
      width: 100,
      render: (amount) => <span>৳ {amount}</span>,
    },
    {
      title: 'Due Amount',
      dataIndex: 'due_amount',
      key: 'due_amount',
      align: 'right',
      width: 100,
      render: (amount) => (
        <span className="text-red-600 font-medium">৳ {amount}</span>
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
      align: 'center',
      width: 150,
      render: (dueDate) => {
        const date = new Date(dueDate);
        const isOverdue = date < new Date();
        return (
          <span className={isOverdue ? 'text-red-600' : ''}>
            {date.toLocaleDateString()}
          </span>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'due_status',
      key: 'due_status',
      align: 'center',
      width: 100,
      render: (dueStatus) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            dueStatus === 'Pending'
              ? 'bg-amber-50 text-amber-700 border border-amber-300'
              : 'bg-emerald-50 text-emerald-700 border border-emerald-300'
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
      width: 120,
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleMarkPaid(record)}
          className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700"
        >
          <CheckCircle className="w-4 h-4" /> Mark Paid
        </Button>
      ),
    },
  ];

  const overdueColumns = [
    ...columns.slice(0, -1),
    {
      title: 'Days Overdue',
      key: 'days_overdue',
      align: 'center',
      width: 120,
      render: (_, record) => {
        const dueDate = new Date(record.due_date);
        const today = new Date();
        const diffTime = Math.abs(today - dueDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return (
          <span className="text-red-600 font-medium">{diffDays} days</span>
        );
      },
    },
    columns[columns.length - 1], // Action column
  ];

  return (
    <div className="max-w-7xl mx-auto my-8 px-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            Payment Due Sheet
          </h1>
        </div>

        {/* Summary Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 p-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Users className="w-5 h-5" /> Total Customers
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {summaryStats.totalCustomers}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <DollarSign className="w-5 h-5" /> Total Due
            </div>
            <div className="text-2xl font-bold text-red-600">
              ৳ {summaryStats.totalDueAmount}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <AlertTriangle className="w-5 h-5" /> Total Overdue
            </div>
            <div className="text-2xl font-bold text-red-600">
              ৳ {summaryStats.totalOverdueAmount}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <AlertCircle className="w-5 h-5" /> Overdue Count
            </div>
            <div className="text-2xl font-bold text-amber-600">
              {summaryStats.overdueCount}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Clock className="w-5 h-5" /> Pending
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {summaryStats.pendingCount}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Calendar className="w-5 h-5" /> Avg. Due Amount
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ৳ {summaryStats.averageDueAmount}
            </div>
          </div>
        </div>

        {/* Main Due Table Section */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            All Due Payments
          </h2>
          <Table
            dataSource={dueData}
            columns={columns}
            rowKey="id"
            bordered
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} records`,
            }}
            scroll={{ x: 1500, y: 400 }}
            className="border border-gray-200 rounded-lg"
          />
        </div>

        {/* Overdue Table Section */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Overdue Payments
            </h2>
          </div>
          <Table
            dataSource={overdueData}
            columns={overdueColumns}
            rowKey="id"
            bordered
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} overdue records`,
            }}
            scroll={{ x: 1500, y: 400 }}
            className="border border-gray-200 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default DueSheet;
