import { Table } from 'antd';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';
import CustomModal from '../../utilities/CustomModal';
const db = firebase.firestore();

const EditFaq = () => {
  const { faqData } = useStateContext();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleDelete = (record) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        db.collection('faqData')
          .doc(record.key)
          .delete()
          .then(() => {
            Swal.fire('Deleted!', 'Your faq has been deleted.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error!', 'Something went wrong.', 'error');
          });
      }
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleView = (record) => {
    setModalData(record);
    setIsOpen(true);
  };

  const columns = [
    {
      title: 'SL Number',
      dataIndex: 'serialNumber',
      width: 80,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Order Number',
      dataIndex: 'orderFaq',
      width: 80,
      align: 'center',
    },
    {
      title: 'Faq Title',
      dataIndex: 'faqTitle',
      align: 'left',
      width: 350,
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <button
          className="bg-primary-bg text-white py-1 px-2 rounded"
          onClick={() => handleView(record)}
        >
          View
        </button>
      ),
    },
    {
      title: 'Delete',
      dataIndex: '',
      key: 'x',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <button
          className="bg-red-600 text-white py-1 px-2 rounded"
          onClick={() => handleDelete(record)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div id="customize_faq">
      <div className="pt-10 pb-4 px-5 ">
        <div className="max-w-3xl mx-auto bg-white shadow-md border-solid rounded-lg border-gray-300 p-5 my-4">
          <h2 className=" text-xl text-[#1aa5d3] mt-2 mb-6">Customize FAQ</h2>
          <div className="mb-6 -mt-3 bg-[#bac6ca] h-0.5" />
          <Table
            columns={columns}
            dataSource={[...faqData]}
            pagination={{
              pageSize: 50,
            }}
            scroll={{
              y: 400,
            }}
          />
          <CustomModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            setIsOpen={setIsOpen}
          >
            <div className="w-[350px] sm:w-[550px] text-base">
              <h2>
                <strong>Question: </strong> {modalData?.faqTitle}
              </h2>

              <div className=" mt-4">
                <strong>Answer:</strong>{' '}
                <div
                  dangerouslySetInnerHTML={{ __html: modalData?.faqAnswer }}
                />
              </div>
            </div>

            <div className="flex justify-center ">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-[orangered] text-white py-1 px-2 rounded"
              >
                Close
              </button>
            </div>
          </CustomModal>
        </div>
      </div>
    </div>
  );
};
``;
export default EditFaq;
