import { X } from 'lucide-react';
import React, { useState } from 'react';
import Modal from 'react-modal';
import Login from './Login';
import PhoneLogin from './PhoneLogin';
import PhoneSignup from './PhoneSignup';

const LoginModal = ({ modalIsOpen, closeModal }) => {
  const [state, setState] = useState('phone_login');
  const customStyles = {
    content: {
      background: '#fff',
      width: '80%', // Adjust width for smaller screens
      maxWidth: '500px', // Ensure it doesn't exceed the max width
      minHeight: '100vh',
      margin: '0 auto',
      top: '50%',
      left: 'auto',
      right: '0%',
      bottom: 'auto',
      transform: 'translate(0%, -50%)',
      borderRadius: '0px',
      zIndex: 950,
      padding: '20px 0', // Add padding for better spacing on smaller screens
      boxSizing: 'border-box',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 950,
    },
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="flex flex-col justify-between min-h-screen">
        <div className="flex items-center justify-between px-3 md:px-5 mt-6">
          <h2 className="font-bangla text-lg md:text-xl font-semibold">
            Learn with Data Solution 360
          </h2>
          <button onClick={closeModal}>
            <X className="text-xl md:text-2xl" />
          </button>
        </div>
        <hr className="my-6" />
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-md p-2 md:p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="text-center mb-6">
              {state === 'phone_login' && (
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 animate-fadeIn tracking-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
                    Login to Your Account
                  </span>
                </h2>
              )}
              {state === 'phone_signup' && (
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 animate-fadeIn tracking-tight">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-400 text-transparent bg-clip-text">
                    Create a New Account
                  </span>
                </h2>
              )}
              {state === 'email_login' && (
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 animate-fadeIn tracking-tight">
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-400 text-transparent bg-clip-text">
                    Login with Email
                  </span>
                </h2>
              )}
            </div>

            {state !== 'email_login' && (
              <div className="w-full max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-0 bg-gray-100 p-3 rounded-lg mx-4">
                  <button
                    onClick={() => setState('phone_login')}
                    className={`py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      state === 'phone_login'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setState('phone_signup')}
                    className={`py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      state === 'phone_signup'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    New Account
                  </button>
                </div>
              </div>
            )}
            {state === 'phone_login' && (
              <PhoneLogin state={state} setState={setState} />
            )}
            {state === 'phone_signup' && (
              <PhoneSignup state={state} setState={setState} />
            )}
            {state === 'email_login' && (
              <Login state={state} setState={setState} />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
