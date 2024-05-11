/* eslint-disable @next/next/no-img-element */
import { Progress, Table } from 'antd';
import { useEffect, useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../firebase';
import { useStateContext } from '../../src/context/ContextProvider';
import HeadingDashboard from '../utilities/HeadingDashboard';
import RichTextEditor from '../utilities/RichTextEditor';
const db = firebase.firestore();

const MyBlogs = () => {
  const { userEmail, blogData } = useStateContext();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [blogDataState, setBlogDataState] = useState();
  const [convertContent, setConvertedContent] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [progressData, setProgressData] = useState('');
  const [blogDetails, setBlogDetails] = useState('');

  console.log(modalData);

  useEffect(() => {
    setBlogDataState(modalData);
  }, [modalData]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    content: {
      background: '#fff',
      // innerWidth: '768px',
      top: '55%',
      left: '50%',
      right: 'auto',
      bottom: '-30%',
      // marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 100,
    },
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
      dataIndex: 'orderNo',
      width: 100,
      align: 'center',
      // render: (_, __, index) => index + 1,
    },
    {
      title: 'Blog Title',
      dataIndex: 'title',
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
          onClick={() => handleEditClick(record)}
        >
          Edit
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

  const handleFileSubmit = (e) => {
    const fileSize = document.getElementById('photoUrl').files[0].size;
    const blogImg = e.target.files[0];

    if (fileSize < 512000) {
      const uploadTask = firebase
        .storage()
        .ref(`blogImage/${userEmail}/${blogImg?.name}`)
        .put(blogImg);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );

          setProgressData(progress);
        },
        (error) => {
          alert(error.message + '' + 'Something went wrong');
        },
        () => {
          firebase
            .storage()
            .ref('blogImage')
            .child(userEmail)
            .child(blogImg?.name)
            .getDownloadURL()
            .then((url) => {
              // NOTE: use this url
              setBlogDataState({ ...blogDataState, img: url });
            });
        },
      );
    } else {
      alert('File Size must be under 500kb');
    }
    console.log(fileSize);
  };

  const handleEditClick = (record) => {
    setModalData(record);
    setIsOpen(true);
  };

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
        db.collection('blogData')
          .doc(record.key)
          .delete()
          .then(() => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error!', 'Something went wrong.', 'error');
          });
      }
    });
  };

  const handleSubmitClick = () => {
    const updatedBlog = {
      ...blogDataState,
      details: !isContentEmpty(blogDetails) ? blogDetails : modalData?.details,
    };

    db.collection('blogData')
      .doc(modalData.key)
      .update(updatedBlog)
      .then(() => {
        Swal.fire('Updated!', 'Your file has been updated.', 'success').then(
          () => {
            // window.location.reload();
          },
        );
      })
      .catch((error) => {
        Swal.fire('Error!', 'Something went wrong.', 'error');
      });
  };

  const conicColors = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
  };

  return (
    <div>
      <HeadingDashboard title="Manage Blogs" />
      <div className="max-w-3xl mx-auto my-20">
        <h2 className="text-lg italic text-[orangered]">
          Note: First 3 blogs will show into home page.
        </h2>
        <Table
          columns={columns}
          dataSource={[...blogData]}
          pagination={{
            pageSize: 50,
          }}
          scroll={{
            y: 400,
          }}
        />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-between">
          <div />
          <h2 className="text-2xl font-bold text-center mb-8 ">
            Edit The Blog
          </h2>
          <div>
            <ImCancelCircle
              onClick={() => closeModal()}
              className="text-2xl cursor-pointer"
            />
          </div>
        </div>
        <div className="w-3/4 mx-auto">
          <label htmlFor="orderNo" className="font-semibold mt-3 block">
            Order of Blog
            <span className="ml-2 italic font-thin">
              (previous:
              <span className=" text-[orangered] ml-2">
                {modalData?.orderNo}
              </span>
              )
            </span>
          </label>

          <input
            id="orderNo"
            onChange={(e) =>
              setBlogDataState({
                ...blogDataState,
                orderNo: parseInt(e.target.value),
              })
            }
            type="number"
            className="w-full px-4 py-2 outline-none border-1 text-lg mt-3 "
          />

          <label htmlFor="title" className="font-semibold mt-3 block">
            Blog heading / Blog title
            <span className="ml-2 italic font-thin">
              (previous:
              <span className=" text-[orangered] ml-2">{modalData?.title}</span>
              )
            </span>
          </label>

          <input
            id="title"
            onChange={(e) =>
              setBlogDataState({ ...blogDataState, title: e.target.value })
            }
            type="text"
            className="w-full px-4 py-2 outline-none border-1 text-lg mt-3 "
          />

          <label htmlFor="title" className="font-semibold mt-3 block">
            Author
            <span className="ml-2 italic font-thin">
              (previous:
              <span className=" text-[orangered] ml-2">
                {modalData?.author}
              </span>
              )
            </span>
          </label>
          <input
            id="title"
            onChange={(e) =>
              setBlogDataState({ ...blogDataState, author: e.target.value })
            }
            type="text"
            className="w-full px-4 py-2 outline-none border-1 text-lg mt-3 "
          />

          <label htmlFor="photoUrl" className="font-semibold mt-3 block">
            Main blog image
          </label>
          <span className="italic font-thin">previous:</span>
          <img src={modalData?.img} className="w-80 my-4" alt="" />
          <input
            id="photoUrl"
            onChange={handleFileSubmit}
            type="file"
            className="w-full px-4 py-2 outline-none border-1 mt-3 "
          />
          <div className="text-center mx-auto px-4">
            <Progress
              percent={progressData}
              size="small"
              strokeColor={conicColors}
            />
          </div>

          <div className="w-full p-3 border">
            <RichTextEditor
              onDataChange={setBlogDetails}
              title="Full blog description"
              value={modalData?.details}
            />
          </div>

          <div className="w-full text-center pt-5 pb-16">
            <button
              onClick={handleSubmitClick}
              className="px-4 py-3 bg-blue-500 text-white rounded-md"
            >
              Submit Content
            </button>
          </div>

          {/* <p>{blogData?.date}</p> */}
        </div>
      </Modal>
    </div>
  );
};

export default MyBlogs;

const isContentEmpty = (content) => {
  // Use a regular expression to check if the content contains only whitespace or line breaks
  const isEmpty = /^(<p><br><\/p>\s*)*$/.test(content);
  return isEmpty;
};
