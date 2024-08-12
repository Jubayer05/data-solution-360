import { ConfigProvider, Table } from 'antd';
import React from 'react';
import { MdRemoveRedEye } from 'react-icons/md';
import { useStateContext } from '../../../../src/context/ContextProvider';

/*
 * Title: Assignments
 * Description: From database of Assignment you have to find the user for submitted assignment users.
 * If now found then show pending state and otherwise show submitted status
 * Author: Jubayer Ahmed
 * Date: 14 July, 2024
 *
 * TODO:
 * Data Structures for assignment
 * [{courseName: 'Mastering Social Media' ,info:[{title: 'Exam week - 1', submission_date: 'Thursday, 30 may 2024', link_url: 'http://assignment-page.com', submitted_user: [{email: '8801753139834@datasolution360.com}]}]}]
 */

const AssignmentHome = () => {
  const { findCurrentUser } = useStateContext();

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      width: 250,
      align: 'left',
    },
    {
      title: 'Submission Date',
      dataIndex: 'submission_date',
      align: 'center',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: '',
      key: 'x',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <div className="text-white  ">
          {record?.submitted_user.find(
            (item) => item.email === findCurrentUser?.email,
          ) ? (
            <span className="bg-secondary_btn pb-1 px-2 rounded-full text-base font-semibold">
              success
            </span>
          ) : (
            <span className="bg-primary-bg pb-1 px-2 rounded-full text-sm font-semibold">
              pending
            </span>
          )}
          {}
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <div className="flex items-center justify-center">
          <button
            className="bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center gap-1 
          px-3 py-2 font-medium"
          >
            <MdRemoveRedEye className="text-xl" /> Check Now
          </button>
        </div>
      ),
    },
  ];

  const assignmentData = [
    {
      title: 'Exam week - 1',
      submission_date: 'Thursday, 30 may 2024',
      link_url: 'http://assignment-page.com',
      submitted_user: [{ email: '8801753139834@datasolution360.com' }],
    },
    {
      title: 'Exam week - 1',
      submission_date: 'Thursday, 30 may 2024',
      link_url: 'http://assignment-page.com',
      submitted_user: [],
    },
  ];

  return (
    <div className="min-h-screen">
      <div
        className="flex justify-center items-center gap-6 bg-white rounded-xl overflow-hidden
      border border-dashboard_border mb-20"
      >
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: '#02274b',
                headerColor: '#ffffff',
              },
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={[...assignmentData]}
            pagination={false}
            className="w-full"
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default AssignmentHome;
