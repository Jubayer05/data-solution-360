import { ConfigProvider, Table } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaRegPlayCircle } from 'react-icons/fa';
import { IoMdPlay } from 'react-icons/io';
import { useStateContextDashboard } from '../../../../src/context/UtilitiesContext';
import { capitalizeWords } from '../../../../src/utils/capitalizeWords';
import { formatDate } from '../../../../src/utils/convertDate';

const RecordingContent = ({ item }) => {
  const { setShowedItem } = useStateContextDashboard();
  const [currentUrl, setCurrentUrl] = useState(null);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

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
      title: 'Class Date',
      dataIndex: 'class_date',
      align: 'center',
      render: (_, record) => <p>{formatDate(record.classDate)}</p>,
      width: 150,
    },

    {
      title: 'Availability',

      align: 'center',
      width: 150,
      render: (_, record) => (
        <p>
          {record?.recordingLink ? (
            <span className="bg-green-100 border border-green-500 px-2 text-xs rounded-full font-semibold text-green-700">
              Available
            </span>
          ) : (
            <span className="bg-red-100 border border-red-500 px-2 text-xs rounded-full font-semibold text-red-700">
              Unavailable
            </span>
          )}
        </p>
      ),
    },

    {
      title: 'Watch',
      dataIndex: '',
      key: 'x',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <div className="flex items-center justify-center">
          <Link href={`/students/my-course/${item?.batchId}/videos`}>
            <button
              className="bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center gap-1 
          px-3 py-2 font-medium"
              onClick={() => setShowedItem(record)}
            >
              <IoMdPlay className="text-lg" /> Play
            </button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      {item?.moduleData?.map((itemData, index) => (
        <div
          key={itemData.moduleName}
          className="bg-white p-4 mb-10 rounded-lg border border-dashboard_border"
        >
          <h2 className="-mt-2 text-xl font-semibold capitalize">
            Module - {itemData?.moduleNumber}:{' '}
            {capitalizeWords(itemData?.moduleName)}
          </h2>
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
                dataSource={[...itemData.lessons]}
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
