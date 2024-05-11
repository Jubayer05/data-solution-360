// pages/index.js
import React, { useState } from 'react';
import Select from 'react-select';
import CodeEditor from './CodeEditor';

const PracticeCodeMainComp = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const runCode = async () => {
    // Send code to backend for execution based on selected language
    console.log(`Running ${language} code:`, code);
    // You'll implement this part later
  };

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      padding: 20,
    }),
    control: (_, {}) => ({
      display: 'flex',
      border: '1px solid #e5e5e5',
      padding: '5px 10px',
      borderRadius: '6px',
      backgroundColor: '#f1f1f1',
    }),
  };

  const selectLanguage = [
    {
      label: <div>Python</div>,
      value: 'python',
    },
    {
      label: <div>MySQL</div>,
      value: 'mysql',
    },
    {
      label: <div>R</div>,
      value: 'r',
    },
  ];

  const handleChange = (item) => {
    setLanguage(item.value);
  };

  return (
    <div className="max-w-6xl mx-auto my-20 ">
      <div>
        <Select
          className="w-full"
          styles={customStyles}
          options={selectLanguage}
          defaultValue={selectLanguage[0]}
          onChange={handleChange}
        />
      </div>
      <CodeEditor
        value={code}
        language={language}
        onChange={handleCodeChange}
      />
      <button onClick={runCode}>Run Code</button>
    </div>
  );
};

export default PracticeCodeMainComp;
