import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Modal from 'react-modal';
import Login from './Login';
import PhoneAuth from './PhoneLogin';

const LoginModal = ({ children, modalIsOpen, closeModal }) => {
  const [loginStatePhone, setLoginStatePhone] = useState(true);
  const customStyles = {
    content: {
      background: '#fff',
      width: '80%', // Adjust width for smaller screens
      maxWidth: '400px', // Ensure it doesn't exceed the max width
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
      <div className="flex items-center justify-between px-3 md:px-5">
        <h2 className="font-bangla text-lg md:text-xl font-semibold">
          Learn with Data Solution 360
        </h2>
        <button onClick={closeModal}>
          <RxCross2 className="text-xl md:text-2xl" />
        </button>
      </div>
      <hr className="my-6" />
      {loginStatePhone ? (
        <PhoneAuth
          loginStatePhone={loginStatePhone}
          setLoginStatePhone={setLoginStatePhone}
        />
      ) : (
        <Login
          loginStatePhone={loginStatePhone}
          setLoginStatePhone={setLoginStatePhone}
        />
      )}
    </Modal>
  );
};

export default LoginModal;
