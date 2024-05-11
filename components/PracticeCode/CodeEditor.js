// components/CodeEditor.js
import React, { useEffect, useRef } from 'react';

const CodeEditor = ({ value, language, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = monaco.editor.create(editorRef.current, {
      value,
      language,
      theme: 'vs-dark',
    });

    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });

    return () => {
      editor.dispose();
    };
  }, [value, language, onChange]);

  return (
    <div></div>
    // <Editor
    //   height="90vh"
    //   defaultLanguage="javascript"
    //   defaultValue="// some comment"
    // />
  );
};

export default CodeEditor;
