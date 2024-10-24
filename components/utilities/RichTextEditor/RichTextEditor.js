// import 'jodit-react/src/jodit.css'; // Corrected import path
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const RichTextEditorJodit = ({ value, title, onDataChange }) => {
  const [content, setContent] = useState(value || '');

  useEffect(() => {
    onDataChange(content);
  }, [content, onDataChange]);

  const options = [
    'bold',
    'italic',
    '|',
    'ul',
    'ol',
    '|',
    'font',
    'fontsize',
    '|',
    'outdent',
    'indent',
    'align',
    '|',
    'hr',
    '|',
    'fullsize',
    'brush',
    '|',
    'table',
    'link',
    '|',
    'undo',
    'redo',
  ];

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: '',
      defaultActionOnPaste: 'insert_as_html',
      defaultLineHeight: 1.5,
      enter: 'div',
      // options that we defined in above step.
      buttons: options,
      buttonsMD: options,
      buttonsSM: options,
      buttonsXS: options,
      statusbar: false,
      sizeLG: 900,
      sizeMD: 700,
      sizeSM: 400,
      toolbarAdaptive: false,
    }),
    [],
  );

  return (
    <div className="mt-5">
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
      <JoditEditor
        // value={content}
        config={config}
        onChange={(newContent) => setContent(newContent)}
      />
    </div>
  );
};

export default RichTextEditorJodit;
