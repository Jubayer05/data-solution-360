import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import Modal from 'react-modal';
import firebase from '../../firebase';

const PhoneLogin = () => {
  const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
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

  // useEffect(() => {
  //   const unRegistered = onAuthStateChanged(firebase.auth(), (currentUser) => {
  //     console.log(currentUser);
  //     setUser(currentUser);
  //   });

  //   const ui =
  //     firebaseui.auth.AuthUI.getInstance() ||
  //     new firebaseui.auth.AuthUI(firebase.auth());
  //   ui.start('.phone-auth-container', {
  //     signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
  //   });
  // });

  useEffect(() => {
    // Code to run only on the client-side
    if (typeof window !== 'undefined') {
      // Place your code that relies on window object here
      recaptchaVerifierRef.current = new firebase.auth.RecaptchaVerifier(
        'recaptcha-container',
      );
    }
  }, []);

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false, // Avoid redirects after sign-in
    },
  };

  const handleSendCode = async () => {
    try {
      const confirmation = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber);
      setConfirmationResult(confirmation);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      if (confirmationResult) {
        const credential = firebase.auth.PhoneAuthProvider.credential(
          confirmationResult.verificationId,
          verificationCode,
        );
        await firebase.auth().signInWithCredential(credential);
        // User is now signed in, you can redirect or perform additional actions
      } else {
        console.log('Confirmation result is null');
      }
    } catch (error) {
      console.log(error);
    }
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
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
            {/* <h2 className="text-xl text-center font-heading">
              Phone Authentication
            </h2>
            <p className="pt-4 text-xs font-bold text-gray-500 after:content-['*'] after:ml-0.5 after:text-red-500 ">
              Phone Number
            </p>
            <div
              className="flex items-end pb-2 border-b-2 mt-1"
              style={{ borderBottomColor: '#c6c6c6' }}
            >
              <Icon icon="ic:sharp-phone" className="text-xl text-gray-400" />
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border-0 outline-0 block w-full ml-2 text-sm text-input"
                size="large"
                placeholder="Enter phone number"
              />
              <button
                onClick={handleSendCode}
                className="bg-[#2e43ff] block w-[50%] text-white rounded-lg py-2"
              >
                Send Code
              </button>
            </div>

            <p className="pt-4 text-xs font-bold text-gray-500 after:content-['*'] after:ml-0.5 after:text-red-500 ">
              Verification Code
            </p>
            <div
              className="flex items-end pb-2 border-b-2 "
              style={{ borderBottomColor: '#c6c6c6' }}
            >
              <Icon icon="ic:sharp-phone" className="text-xl text-gray-400" />
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="border-0 outline-0 block w-full ml-2 text-sm text-input"
                size="large"
                placeholder="Enter verification code"
              />
              <button
                onClick={handleVerifyCode}
                className="bg-[#2e43ff] block w-[50%] text-white rounded-lg py-2"
              >
                Verify Code
              </button>
            </div> */}
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
