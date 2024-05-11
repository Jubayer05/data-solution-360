// MyEditor.jsx

import dynamic from 'next/dynamic'; // Import dynamic from 'next/dynamic'
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

// Use dynamic to load ReactQuill only on the client side
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const RichTextEditor = ({ onDataChange, title, value }) => {
  const [content, setContent] = useState('');

  const handleContentChange = (value) => {
    setContent(value);
    onDataChange(value);
  };

  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      // [{ size: ['small', false, 'large', 'huge'] }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      // [{ font: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  return (
    <div className="py-8">
      <p className="font-semibold mt-3 block text-[#17012e]">
        {title}
        <span className="ml-2 italic font-thin">
          (previous:
          <span
            className=" text-[orangered] ml-2"
            dangerouslySetInnerHTML={{
              __html: value,
            }}
          />
          )
        </span>
      </p>
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        theme="snow"
        modules={quillModules}
        style={{ height: '200px' }}
        formats={[
          'header',
          'font',
          'size',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'list',
          'bullet',
          'indent',
          'link',
          'image',
          'video',
          'color',
          'background',
          'align',
        ]}
      />
    </div>
  );
};

// export default MyEditor;

export default RichTextEditor;
