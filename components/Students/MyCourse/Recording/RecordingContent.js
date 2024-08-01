import { ConfigProvider, Table } from 'antd';
import React from 'react';
import { FaRegPlayCircle } from 'react-icons/fa';
import { IoMdPlay } from 'react-icons/io';

const RecordingContent = () => {
  const columns = [
    {
      title: 'Title',
      dataIndex: '',
      width: 250,
      align: 'left',
      render: (_, record) => (
        <div className="flex items-start gap-2">
          <FaRegPlayCircle className="text-lg" />{' '}
          <span className="-mt-0.5">{record.title}</span>
        </div>
      ),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      align: 'center',
      width: 150,
    },
    {
      title: 'Class Date',
      dataIndex: 'class_date',
      align: 'center',
      width: 150,
    },

    {
      title: 'Watch',
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
            <IoMdPlay className="text-lg" /> Play
          </button>
        </div>
      ),
    },
  ];

  const moduleData = [
    {
      moduleNumber: 'Module - 1',
      moduleName: 'Mastering Data Analytics',
      classRecording: [
        {
          title: 'Introduction',
          duration: '1 hour',
          class_date: 'Thursday, 30 May 2024',
          link_url: 'http://recording-page1.com',
        },
        {
          title: 'Data Wrangling',
          duration: '2 hours',
          class_date: 'Friday, 31 May 2024',
          link_url: 'http://recording-page2.com',
        },
        {
          title: 'Exploratory Data Analysis',
          duration: '1.5 hours',
          class_date: 'Saturday, 1 June 2024',
          link_url: 'http://recording-page3.com',
        },
      ],
    },
    {
      moduleNumber: 'Module - 2',
      moduleName: 'Advanced Machine Learning',
      classRecording: [
        {
          title: 'Supervised Learning',
          duration: '1.5 hours',
          class_date: 'Monday, 3 June 2024',
          link_url: 'http://recording-page4.com',
        },
        {
          title: 'Unsupervised Learning',
          duration: '2 hours',
          class_date: 'Tuesday, 4 June 2024',
          link_url: 'http://recording-page5.com',
        },
      ],
    },
    {
      moduleNumber: 'Module - 3',
      moduleName: 'Deep Learning Specialization',
      classRecording: [
        {
          title: 'Neural Networks Basics',
          duration: '2 hours',
          class_date: 'Thursday, 6 June 2024',
          link_url: 'http://recording-page7.com',
        },
        {
          title: 'Convolutional Neural Networks',
          duration: '1.5 hours',
          class_date: 'Friday, 7 June 2024',
          link_url: 'http://recording-page8.com',
        },
        {
          title: 'Recurrent Neural Networks',
          duration: '2 hours',
          class_date: 'Saturday, 8 June 2024',
          link_url: 'http://recording-page9.com',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {moduleData.map((item) => (
        <div
          key={item.moduleName}
          className="bg-white p-4 mb-10 rounded-lg border border-dashboard_border"
        >
          <h2 className="-mt-2 text-xl font-semibold">{item.moduleNumber}</h2>
          <hr className="mt-3 mb-5" />
          <div
            className="flex justify-center items-center gap-6 rounded-xl overflow-hidden
          border border-dashboard_border "
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
                dataSource={[...item.classRecording]}
                pagination={false}
                className="w-full"
              />
            </ConfigProvider>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecordingContent;
