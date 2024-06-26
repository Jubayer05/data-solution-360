import { EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { customConvertToHTML } from './RichTextEditor/CustomConvertHtml'; // Adjust the path as needed

const Editor = dynamic(
  () => {
    return import('react-draft-wysiwyg').then((mod) => mod.Editor);
  },
  { ssr: false },
);

const RichTextEditor = ({ value, title, onDataChange }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  // Handler for changes in the editor content
  const handleEditorChange = (state) => {
    setEditorState(state);

    const currentContentAsHTML = customConvertToHTML(state.getCurrentContent());
    onDataChange(currentContentAsHTML);
  };

  return (
    <div className="mt-10">
      <div className="font-bold mb-3">
        <span>{title}</span>
        {value && (
          <div className="ml-2 italic font-thin">
            (previous:
            <div
              className="editor-content"
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
          border: '1px solid #ccc',
          backgroundColor: '#ffffff',
          padding: '10px',
        }}
        toolbarClassName="toolbarClassName"
        wrapperClassName="demoWrapper"
        editorClassName="editorClassName"
        textAlignment="left"
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'list',
            'textAlign',
            'history',
          ],
          textAlign: {
            options: ['left', 'center', 'right', 'justify'],
          },
        }}
      />
    </div>
  );
};

export default RichTextEditor;
