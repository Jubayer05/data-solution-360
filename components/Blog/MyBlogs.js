import { Table } from 'antd';
import { convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../firebase';
import { useStateContext } from '../../src/context/ContextProvider';
import HeadingDashboard from '../utilities/HeadingDashboard';
const db = firebase.firestore();

const Editor = dynamic(
  () => {
    return import('react-draft-wysiwyg').then((mod) => mod.Editor);
  },
  { ssr: false },
);

const MyBlogs = () => {
  const { blogData } = useStateContext();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [blogDataState, setBlogDataState] = useState();
  const [convertContent, setConvertedContent] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  useEffect(() => {
    setBlogDataState(modalData);
  }, [modalData]);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  const openModal = (item) => {
    setModalData(item);
    setIsOpen(true);
  };
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
              setBlogData({ ...blogData, img: url });
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
      details: convertContent,
    };

    db.collection('blogData')
      .doc(modalData.key)
      .update(updatedBlog)
      .then(() => {
        Swal.fire('Updated!', 'Your file has been updated.', 'success');
      })
      .catch((error) => {
        Swal.fire('Error!', 'Something went wrong.', 'error');
      });
  };

  return (
    <div>
      <HeadingDashboard title="Subscribed user for newsletter" />
      <div className="max-w-3xl mx-auto">
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
        <div className="w-3/4">
          <label htmlFor="title" className="font-semibold mt-3 block">
            Blog heading / Blog title
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
          <input
            id="photoUrl"
            onChange={handleFileSubmit}
            type="file"
            className="w-full px-4 py-2 outline-none border-1 mt-3 "
          />

          <p className="font-semibold mt-2">Full blog description</p>
          <div className="w-full border-1 p-3">
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={handleEditorChange}
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
