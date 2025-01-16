import { Progress, Table } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../firebase';
import { useStateContext } from '../../src/context/ContextProvider';
import { loadData } from '../../src/hooks/loadData';
import CustomModal from '../utilities/CustomModal';
import RichTextEditorJodit from '../utilities/RichTextEditor/RichTextEditor';
import HeadingDashboard from '../utilities/dashboard/HeadingDashboard';
const db = firebase.firestore();

const MyBlogs = () => {
  const { userEmail } = useStateContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [blogDataState, setBlogDataState] = useState();
  const [modalData, setModalData] = useState(null);
  const [progressData, setProgressData] = useState('');
  const [blogDetails, setBlogDetails] = useState('');
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    loadData('blogData', setBlogData, {
      orderBy: 'orderNo',
      orderDirection: 'asc',
    });
  }, []);

  useEffect(() => {
    setBlogDataState(modalData);
  }, [modalData]);

  const closeModal = () => {
    setModalIsOpen(false);
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
  };

  const handleEditClick = (record) => {
    setModalData(record);
    setModalIsOpen(true);
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
            window.location.reload();
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
            x: 'max-content',
            y: 500,
          }}
        />
      </div>
      <CustomModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        setModalIsOpen={setModalIsOpen}
      >
        <div className="flex justify-center ">
          <h2 className="text-2xl font-bold text-center mb-8 ">
            Edit The Blog
          </h2>
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
            onWheel={(e) => e.target.blur()}
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
          <Image
            width={500}
            height={300}
            src={modalData?.img}
            className="w-80 my-4"
            alt=""
          />
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

          <div className="w-full mt-10">
            <label htmlFor="photoUrl" className="font-semibold mt-3 block">
              Main blog image
            </label>
            <RichTextEditorJodit
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
      </CustomModal>
    </div>
  );
};

export default MyBlogs;

const isContentEmpty = (content) => {
  // Use a regular expression to check if the content contains only whitespace or line breaks
  const isEmpty = /^(<div><br><\/div>\s*|<p><br><\/p>\s*)*$/.test(content);

  return isEmpty;
};
