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
      width: '500px',
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
          <span className="-mt-0.5">{record.title}</span>
        </div>
      ),
    },

    {
      title: 'Class Date',
      dataIndex: 'class_date',
      align: 'center',
      width: 130,
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
            href="/"
            className="bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center gap-1
            px-3 py-2 font-medium text-black visited:text-black"
          >
            <FiExternalLink className="text-lg" /> Browse
          </Link>
        </div>
      ),
    },
  ];

  const formatUrl = (url) => {
    const parts = url.split('_');
    if (parts.length > 1) {
      return parts[0] + '_' + '<wbr>' + parts.slice(1).join('_');
    }
    return url;
  };

  return (
    <div className="min-h-screen">
      {item?.moduleData.map((item) => (
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
              <p className="text-center mt-8 mb-16">{modalData?.class_date}</p>
              <div className="flex items-center w-full gap-2">
                <div className="bg-[#dbe6ff] p-1.5 rounded-md">
                  <FaLinkSlash className="text-2xl cursor-pointer text-[#407bff]" />
                </div>
                <div>
                  <p className="break-words">
                    <Link
                      className="text-sm font-medium text-black visited:text-black"
                      href="https://drive.google.com/file/d/1j1kpJ5x5ydkVvOP1BeJL_ex7yFm8cdRn/view?usp=sharing"
                      target="_blank"
                      dangerouslySetInnerHTML={{
                        __html: formatUrl(
                          'https://drive.google.com/file/d/1j1kpJ5x5ydkVvOP1BeJL_ex7yFm8cdRn/view?usp=sharing',
                        ),
                      }}
                    />
                  </p>
                </div>
                <button className="bg-primary_btn px-4 py-2 rounded">
                  <FiExternalLink className="text-lg text-white" />
                </button>
              </div>
            </div>
          </Modal>
        </div>
      ))}
    </div>
  );
};

export default ResourceContent;
