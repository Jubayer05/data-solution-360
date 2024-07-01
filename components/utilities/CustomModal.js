import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({ children, modalIsOpen, closeModal }) => {
  const customStyles = {
    content: {
      background: '#fff',
      width: '80%', // Adjust width for smaller screens
      maxWidth: '768px', // Ensure it doesn't exceed the max width
      margin: '0 auto',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: '15px',
      zIndex: 950,
      padding: '16px 4px', // Add padding for better spacing on smaller screens
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
      {children}
    </Modal>
  );
};

export default CustomModal;
