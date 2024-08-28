import { ConfigProvider, Table } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaRegPlayCircle } from 'react-icons/fa';
import { IoMdPlay } from 'react-icons/io';
import { useStateContextDashboard } from '../../../../src/context/UtilitiesContext';
import { videosPlaylist } from '../../../../src/data/dummy';

const RecordingContent = () => {
  const { activeMenu, showedItem, setShowedItem } = useStateContextDashboard();
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
      title: 'Duration',
      dataIndex: 'duration',
      align: 'center',
      width: 150,
    },
    {
      title: 'Class Date',
      dataIndex: 'class_date',
      align: 'center',
      render: (_, record) => <p>Sat, 2 Dec, 2024</p>,
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
          <Link href={`${currentUrl}/videos`}>
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
      {videosPlaylist.map((item, index) => (
        <div
          key={item.moduleName}
          className="bg-white p-4 mb-10 rounded-lg border border-dashboard_border"
        >
          <h2 className="mt-1 text-lg font-semibold">Module-{index + 1}</h2>
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
                dataSource={[...item.videoUrl]}
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
