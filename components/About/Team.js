/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { IoLogoYoutube } from 'react-icons/io';
import Modal from 'react-modal';
import { useStateContext } from '../../src/context/ContextProvider';

const Team = () => {
  const { instructor } = useStateContext();

  const findCoreMember = instructor.filter(
    (member) => member.role === 'Core Team Member',
  );
  const findEmployee = instructor.filter(
    (member) => member.role === 'Employee',
  );

  return (
    <div className="bg-[#f9f9fa] pt-10 pb-6 mt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center font-heading my-5 capitalize">
          Meet our core team member
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-8 pb-20 px-3 ">
          {findCoreMember?.map((item) => (
            <MemberInfo item={item} key={item.key} />
          ))}
        </div>

        <h2 className="text-3xl font-semibold text-center font-heading my-5 capitalize">
          Meet our Employee
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-8 pb-20 px-3 ">
          {findEmployee?.map((item) => (
            <MemberInfo item={item} key={item.key} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;

const MemberInfo = ({ item }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = (item) => {
    setModalData(item);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    content: {
      background: '#fff',
      innerWidth: '768px',
      top: '55%',
      left: '50%',
      right: 'auto',
      bottom: '-30%',
      // marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 50,
    },
  };
  return (
    <div
      key={item?.key}
      className="bg-white bg-cover overflow-hidden group py-6 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] 
    rounded-md"
    >
      <div className="relative flex justify-center">
        <img
          className="w-[135px] h-[135px] mt-8 rounded-full"
          src={item.photoUrl}
          alt=""
        />
        <img
          src="/team/team-shape.png"
          className="absolute animate-spin-slow"
          alt=""
        />
      </div>

      <div className="text-center mt-16 px-5">
        <h2
          className="text-xl font-semibold font-heading hover:text-red-500 cursor-pointer"
          onClick={() => openModal(item)}
        >
          {item?.instructorName}
        </h2>
        <p className="font-body">{item.jobTitle}</p>
      </div>

      <div className="flex justify-center gap-2 mt-5">
        <div
          className={`text-blue-400 p-2 rounded-sm bg-gray-100 cursor-pointer 
  hover:text-gray-700 transition-all duration-300`}
          // style={{ backgroundColor: `${icon.brandColor}` }}
        >
          <IoLogoYoutube />
        </div>
        <div
          className={`text-blue-400 p-2 rounded-sm bg-gray-100 cursor-pointer 
  hover:text-gray-700 transition-all duration-300`}
          // style={{ backgroundColor: `${icon.brandColor}` }}
        >
          <FaFacebookF />
        </div>
        <div
          className={`text-blue-400 p-2 rounded-sm bg-gray-100 cursor-pointer 
  hover:text-gray-700 transition-all duration-300`}
          // style={{ backgroundColor: `${icon.brandColor}` }}
        >
          <FaLinkedinIn />
        </div>
        <div
          className={`text-blue-400 p-2 rounded-sm bg-gray-100 cursor-pointer 
  hover:text-gray-700 transition-all duration-300`}
          // style={{ backgroundColor: `${icon.brandColor}` }}
        >
          <FaWhatsapp />
        </div>
      </div>
      <div className="p-5">
        <>
          <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="max-w-5xl min-w-[600px] mx-5">
              <ImCancelCircle
                className="fixed right-3 top-3 text-2xl z-100 
              text-red-500 cursor-pointer"
                onClick={closeModal}
              />

              <div className="flex items-center justify-between mb-[15px] text-center">
                <img
                  className="w-[170px] h-[170px] object-cover rounded-full"
                  src={modalData?.photoUrl}
                  alt={modalData?.name}
                />

                <div className="text-left mr-auto ml-5">
                  <h2 className="text-2xl font-bold leading-8 text-[#231f40]">
                    {modalData?.instructorName}
                  </h2>
                  <p className="text-[#c9417c] font-medium mt-2">
                    {modalData?.jobTitle}
                  </p>
                </div>
              </div>
              <div>
                <p className="mt-10 text-lg font-semibold">
                  Know More About {item.instructorName}
                </p>
                <div
                  className="text-sm text-gray-600 mt-5"
                  dangerouslySetInnerHTML={{
                    __html: modalData?.details,
                  }}
                />
              </div>
              <p className="text-base leading-7 text-[#6f6b80] mb-[24px]">
                {modalData?.reviewDetails}
              </p>
            </div>
          </Modal>
        </>
      </div>
    </div>
  );
};
