import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import Modal from 'react-modal';
import firebase from '../../firebase';

const PhoneLogin = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    content: {
      width: '100%',
      height: '100%',
      opacity: 0.8,
      background: '#000',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false, // Avoid redirects after sign-in
    },
  };

  return (
    <div>
      <Icon
        onClick={() => setIsOpen(true)}
        icon="ic:sharp-phone"
        className="m-2 cursor-pointer text-5xl"
        style={{ color: '#0e8444' }}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="w-full h-full flex justify-center items-center">
          <div className="bg-white w-[500px] p-8 rounded">
            <div className="phone-auth-container"></div>
            {/* <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            /> */}
            <h3 className="font-heading text-center text-2xl py-10">
              Coming Soon...
            </h3>

            <div className="w-full flex justify-center mt-8">
              <button
                className="bg-[#ff3f3f] text-white rounded-lg px-5 py-2"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PhoneLogin;
