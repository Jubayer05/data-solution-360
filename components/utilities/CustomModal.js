import React from 'react';
import { FaXmark } from 'react-icons/fa6';
import Modal from 'react-modal';

const CustomModal = ({ children, modalIsOpen, closeModal, setIsOpen }) => {
  const customStyles = {
    content: {
      background: '#fff',
      width: '80%', // Adjust width for smaller screens
      maxWidth: '668px', // Ensure it doesn't exceed the max width
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
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
      backdropFilter: 'blur(5px)',
      zIndex: 950,
    },
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="flex justify-end mr-3">
        <FaXmark
          className="text-2xl cursor-pointer"
          onClick={() => handleCloseModal()}
        />
      </div>
      {children}
    </Modal>
  );
};

export default CustomModal;
