import React, { useState } from 'react';
import Select from 'react-select';
import CodeEditor from './CodeEditor';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { executeCode } from '../../src/api/code_output';
import CustomInput from './CustomInput';
import OutputDetails from './OutputDetails';
import OutputWindow from './OutputWindow';

const javascriptDefault = `// some comment`;

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

const PracticeCodeMainComp = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState('');
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [language, setLanguage] = useState('python');

  const onChange = (action, data) => {
    switch (action) {
      case 'code': {
        setCode(data);
        break;
      }
      default: {
        console.warn('case not handled!', action, data);
      }
    }
  };

  const handleChange = (item) => {
    setLanguage(item.value);
  };

  const handleCompile = async () => {
    const sourceCode = code;
    try {
      const { run: result } = await executeCode(language, sourceCode);
      setOutputDetails(result.output);
    } catch (error) {}
  };

  const checkStatus = async (token) => {
    // We will come to the implementation later in the code
  };

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="py-10 my-10">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <div className="w-[200px]">
            <Select
              className="w-full"
              styles={customStyles}
              options={selectLanguage}
              defaultValue={selectLanguage[0]}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="px-4 py-2">
          {/* <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} /> */}
        </div>
      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditor
            code={code}
            onChange={onChange}
            language={language}
            theme="vs-dark"
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={`mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] 
              px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0'
                ${!code ? 'opacity-50' : ''}
              `}
            >
              {processing ? 'Processing...' : 'Compile and Execute'}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
    </div>
  );
};
export default PracticeCodeMainComp;
