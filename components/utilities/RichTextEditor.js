import 'quill/dist/quill.snow.css';
import React, { useEffect, useRef } from 'react';
let Quill = null;

const RichTextEditor = ({ value, onDataChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    // Load Quill dynamically only on the client-side
    import('quill').then((module) => {
      Quill = module.default;
      const editor = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'video'],
            ['clean'],
          ],
        },
      });

      editor.on('text-change', () => {
        onDataChange(editor.root.innerHTML);
      });

      editor.root.innerHTML = value;
    });
  }, [value, onDataChange]);

  return <div ref={editorRef} />;
};

export default RichTextEditor;
