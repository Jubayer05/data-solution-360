import { ConfigProvider, Spin, Table } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';

import {
  ExternalLink,
  EyeOff,
  FileText,
  Link2Off,
  PlayCircle,
  Plus,
} from 'lucide-react';
import Modal from 'react-modal';
import useEnrolledCourseData from '../../../../src/hooks/useEnrolledCourseData';
import { capitalizeWords } from '../../../../src/utils/capitalizeWords';
import { formatDate } from '../../../../src/utils/convertDate';

const ResourceContent = ({ item }) => {
  const [modalData, setModalData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { enrolledCourse } = useEnrolledCourseData();

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      background: '#fff',
      height: '100vh',
      width: '450px',
      borderRadius: '0px',
      top: '50%',
      left: 'auto',
      right: '0%',
      bottom: '50%',
      transform: 'translate(-0%, -50%)',
      zIndex: 100,
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      // backdropFilter: 'blur(8px)',
      zIndex: 500,
    },
  };

  const handleClickCheckBtn = (item) => {
    setModalData(item);
    setModalIsOpen(true);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: '',
      width: 200,
      align: 'left',
      render: (_, record) => (
        <div className="flex items-start gap-2">
          <span>
            <PlayCircle className="text-lg inline-block" />
          </span>
          <span className="-mt-0.5">{capitalizeWords(record.title)}</span>
        </div>
      ),
    },
    {
      title: 'Class Date',
      align: 'center',
      width: 130,
      render: (_, record) => <p>{formatDate(record.classDate)}</p>,
    },
    {
      title: 'Resource Available',
      width: 150,
      align: 'center',
      render: (_, record) => (
        <p>
          {record?.resourceLink ? (
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
      title: 'Action',
      dataIndex: '',
      key: 'x',
      align: 'right',
      width: 200,
      render: (_, record) => (
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => handleClickCheckBtn(record)}
            className="bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center gap-1 
          px-3 py-2 font-medium"
          >
            <EyeOff className="text-xl" /> Check
          </button>

          <Link
            href={record?.resourceLink ? record?.resourceLink : ''}
            className="bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center gap-1
            px-3 py-2 font-medium text-black visited:text-black"
          >
            <ExternalLink className="text-lg" /> Browse
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      {item?.moduleData || enrolledCourse?.course_modules ? (
        (item?.moduleData || enrolledCourse?.course_modules)?.map(
          (itemData, index) => (
            <div
              key={itemData.moduleName}
              className="bg-white p-4 mb-10 rounded-lg border border-dashboard_border"
            >
              <h2 className="-mt-2 text-xl font-semibold capitalize">
                Module - {itemData.moduleNumber}:{' '}
                {capitalizeWords(itemData.moduleName)}
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
                  {(item?.moduleData || enrolledCourse?.course_modules) && (
                    <Table
                      columns={columns}
                      dataSource={[...itemData.lessons]}
                      pagination={false}
                      className="w-full"
                      scroll={{
                        x: 'max-content',
                        y: 500,
                      }}
                    />
                  )}
                </ConfigProvider>
              </div>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
              >
                <div>
                  <div className="flex justify-between">
                    <h3 className="text-2xl font-semibold font-heading">
                      Resource
                    </h3>
                    <Plus
                      onClick={() => closeModal()}
                      className="text-4xl cursor-pointer rotate-45"
                    />
                  </div>
                  <div className="flex justify-center mt-20">
                    <div className="bg-[#dbe6ff] p-8 rounded-full">
                      <FileText className="text-8xl text-[#407bff]" />
                    </div>
                  </div>
                  <p className="text-center mt-8 mb-16">
                    {modalData?.classDate}
                  </p>
                  {modalData?.resourceLink ? (
                    <div className="flex items-center w-full gap-2">
                      <div className="bg-[#dbe6ff] p-1.5 rounded-md">
                        <Link2Off className="text-2xl cursor-pointer text-[#407bff]" />
                      </div>
                      <div>
                        <p className="break-all">
                          <Link
                            className="text-sm font-medium text-black visited:text-black break-all"
                            href={modalData?.resourceLink}
                            target="_blank"
                          >
                            {modalData?.resourceLink}
                          </Link>
                        </p>
                      </div>
                      <button className="bg-primary_btn px-4 py-2 rounded">
                        <ExternalLink className="text-lg text-white" />
                      </button>
                    </div>
                  ) : (
                    <p className="font-semibold font-dash_heading text-center">
                      No Class Resource Provided
                    </p>
                  )}
                </div>
              </Modal>
            </div>
          ),
        )
      ) : (
        <div
          className="min-h-40 flex justify-center items-center rounded-xl overflow-hidden
        bg-white border border-dashboard_border"
        >
          <Spin size="medium" />
        </div>
      )}
    </div>
  );
};

export default ResourceContent;
