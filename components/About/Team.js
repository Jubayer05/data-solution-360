import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { loadData } from '../../src/hooks/loadData';
import CustomModal from '../utilities/CustomModal';
import MemberDetails from './MemberDetails';

const Team = () => {
  const [teamMember, setTeamMember] = useState([]);

  useEffect(() => {
    loadData('team_members', setTeamMember);
  }, []);

  const findCoreMember = teamMember.filter(
    (member) => member.role === 'Core Team Member',
  );
  const findEmployee = teamMember.filter(
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = (item) => {
    setModalData(item);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div
      key={item?.key}
      className="bg-white bg-cover overflow-hidden group py-6 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] 
    rounded-md"
    >
      <div className="relative flex justify-center">
        <Image
          width={500}
          height={300}
          className="w-[135px] h-[135px] mt-8 rounded-full"
          src={item.photoUrl}
          alt=""
        />
        <Image
          width={500}
          height={300}
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
          {item?.profileName}
        </h2>
        <p className="font-body">{item?.jobTitle}</p>
      </div>

      <div className="flex justify-center gap-2 mt-5">
        <Link href={item?.facebookLink} target="_blank">
          <div
            className={`text-blue-400 p-2 rounded-sm bg-gray-100 cursor-pointer 
          hover:text-gray-700 transition-all duration-300`}
            // style={{ backgroundColor: `${icon.brandColor}` }}
          >
            <FaFacebookF />
          </div>
        </Link>
        <div
          className={`text-blue-400 p-2 rounded-sm bg-gray-100 cursor-pointer 
  hover:text-gray-700 transition-all duration-300`}
          // style={{ backgroundColor: `${icon.brandColor}` }}
        >
          <FaLinkedinIn />
        </div>
      </div>
      <div className="p-5">
        <>
          <CustomModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            setModalIsOpen={setModalIsOpen}
          >
            <MemberDetails data={modalData} closeModal={closeModal} />
          </CustomModal>
        </>
      </div>
    </div>
  );
};
