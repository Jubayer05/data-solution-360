import { convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Editor = dynamic(
  () => {
    return import('react-draft-wysiwyg').then((mod) => mod.Editor);
  },
  { ssr: false },
);

const RichTextEditor = ({ value, title, onDataChange, showPrevious }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  // Handler for changes in the editor content
  const handleEditorChange = (state) => {
    setEditorState(state);

    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    onDataChange(currentContentAsHTML);
  };

  return (
    <div className="mt-10">
      <div className="font-bold mb-3">
        <span> {title} </span>
        {value && (
          <div className="ml-2 italic font-thin">
            (previous:
            <div
              className=" text-[orangered] ml-2"
              dangerouslySetInnerHTML={{ __html: value }}
            ></div>
            )
          </div>
        )}
      </div>
      <Editor
        editorState={editorState}
        editorStyle={{
          minHeight: '140px',
          border: '1px solid',
          backgroundColor: '#ffffff',
        }}
        toolbarClassName="toolbarClassName"
        wrapperClassName="demoWrapper"
        editorClassName="editorClassName"
        onEditorStateChange={handleEditorChange}
      />
    </div>
  );
};

export default RichTextEditor;
