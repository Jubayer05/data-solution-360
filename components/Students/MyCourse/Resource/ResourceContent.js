import { ConfigProvider, Table } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaRegPlayCircle } from 'react-icons/fa';
import { FaLinkSlash } from 'react-icons/fa6';
import { FiExternalLink } from 'react-icons/fi';

import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiFilePaper2Line } from 'react-icons/ri';
import Modal from 'react-modal';
import { capitalizeWords } from '../../../../src/utils/capitalizeWords';
import { formatDate } from '../../../../src/utils/convertDate';

/*
 * Title: Resource
 * Description:
 * Author: Jubayer Ahmed
 * Date: 14 July, 2024
 *
 * TODO:
 * There are many lins. All should be workable
 */

const ResourceContent = ({ item }) => {
  const [modalData, setModalData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
          <FaRegPlayCircle className="text-lg" />{' '}
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
            <MdOutlineRemoveRedEye className="text-xl" /> Check Now
          </button>

          <Link
            href={record?.resourceLink ? record?.resourceLink : ''}
            className="bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center gap-1
            px-3 py-2 font-medium text-black visited:text-black"
          >
            <FiExternalLink className="text-lg" /> Browse
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      {item?.moduleData?.map((itemData) => (
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
              {item?.moduleData && (
                <Table
                  columns={columns}
                  dataSource={[...itemData.lessons]}
                  pagination={false}
                  className="w-full"
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
                <AiOutlinePlus
                  onClick={() => closeModal()}
                  className="text-4xl cursor-pointer rotate-45"
                />
              </div>
              <div className="flex justify-center mt-20">
                <div className="bg-[#dbe6ff] p-8 rounded-full">
                  <RiFilePaper2Line className="text-8xl text-[#407bff]" />
                </div>
              </div>
              <p className="text-center mt-8 mb-16">{modalData?.classDate}</p>
              {modalData?.resourceLink ? (
                <div className="flex items-center w-full gap-2">
                  <div className="bg-[#dbe6ff] p-1.5 rounded-md">
                    <FaLinkSlash className="text-2xl cursor-pointer text-[#407bff]" />
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
                    <FiExternalLink className="text-lg text-white" />
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
      ))}
    </div>
  );
};

export default ResourceContent;
