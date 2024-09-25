import { Progress } from 'antd';
import { convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../firebase';
import { useStateContext } from '../../src/context/ContextProvider';
import HeadingDashboard from '../utilities/dashboard/HeadingDashboard';

const Editor = dynamic(
  () => {
    return import('react-draft-wysiwyg').then((mod) => mod.Editor);
  },
  { ssr: false },
);

const initialBlogState = {
  id: '',
  title: '',
  slug: '',
  details: '',
  img: '',
  author: '',
  date: '',
};

const options = { year: 'numeric', month: 'long', day: 'numeric' };

const AddNewBlog = () => {
  const { userEmail } = useStateContext();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [convertContent, setConvertedContent] = useState(null);
  const [blogData, setBlogData] = useState(initialBlogState);
  const [progressData, setProgressData] = useState('');

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

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
  };

  const handleSubmit = () => {
    if (
      blogData.title !== '' &&
      convertContent !== null &&
      blogData.author !== ''
    ) {
      firebase
        .firestore()
        .collection('blogData')
        .add({
          ...blogData,
          id: uuidv4().split('-')[0],
          details: convertContent,
          slug: blogData.title.split(' ').join('-'),
          date: new Date().toLocaleDateString(undefined, options),
          createdAt: new Date().getTime(),
        })
        .then(() => {
          Swal.fire(
            'Success!',
            'Your Blog was successfully added.',
            'success',
          ).then(() => {
            window.location.reload();
          });
          window.location.reload();
        })
        .catch((error) => {
          Swal.fire('Error!', 'Something went wrong.', 'error');
        });
    } else {
      Swal.fire('Warning!', 'Something went wrong.', 'warning');
    }
  };

  const conicColors = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <HeadingDashboard title="Add a new blog" />
      <div className="w-3/4">
        <label htmlFor="orderNo" className="font-semibold mt-3 block">
          Order of Blog
        </label>

        <input
          id="orderNo"
          onChange={(e) =>
            setBlogData({ ...blogData, orderNo: parseInt(e.target.value) })
          }
          type="number"
          className="w-full px-4 py-2 outline-none border-1 text-lg mt-3 "
        />

        <label htmlFor="title" className="font-semibold mt-3 block">
          Blog heading / Blog title
        </label>
        <input
          id="title"
          onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
          type="text"
          className="w-full px-4 py-2 outline-none border-1 text-lg mt-3 "
        />

        <label htmlFor="title" className="font-semibold mt-3 block">
          Author
        </label>
        <input
          id="title"
          onChange={(e) => setBlogData({ ...blogData, author: e.target.value })}
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

        <div className="text-center mx-auto px-4">
          <Progress
            percent={progressData}
            size="small"
            strokeColor={conicColors}
          />
        </div>

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
            onClick={handleSubmit}
            className="px-4 py-3 bg-blue-500 text-white rounded-md"
          >
            Submit Content
          </button>
        </div>

        <p>{blogData?.date}</p>
      </div>
    </div>
  );
};

export default AddNewBlog;
