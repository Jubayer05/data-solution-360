import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({ children, modalIsOpen, closeModal }) => {
  const customStyles = {
    content: {
      background: '#fff',
      innerWidth: '768px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: '-30%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '15px',
      zIndex: 50,
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 500,
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
