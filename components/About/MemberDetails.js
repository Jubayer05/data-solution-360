/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { ImCancelCircle } from 'react-icons/im';

const MemberDetails = ({ data, closeModal }) => {
  return (
    <div className="max-w-5xl min-w-[600px] mx-5">
      <ImCancelCircle
        className="fixed right-3 top-3 text-2xl z-100 
              text-red-500 cursor-pointer"
        onClick={closeModal}
      />

      <div className="flex items-center justify-between mb-[15px] text-center">
        <img
          className="w-[170px] h-[170px] object-cover rounded-full"
          src={data?.photoUrl}
          alt={data?.name}
        />

        <div className="text-left mr-auto ml-5">
          <h2 className="text-2xl font-bold leading-8 text-[#231f40]">
            {data?.profileName}
          </h2>
          <p className="text-[#c9417c] font-medium mt-2">{data?.jobTitle}</p>
        </div>
      </div>
      <div>
        <p className="mt-10 text-lg ">
          Know More About{' '}
          <span className="font-semibold text-[#6a00ff] italic">
            {data?.profileName}
          </span>
        </p>
        <div
          className="text-sm text-gray-600 mt-5"
          dangerouslySetInnerHTML={{
            __html: data?.details,
          }}
        />
      </div>
      <p className="text-base leading-7 text-[#6f6b80] mb-[24px]">
        {data?.reviewDetails}
      </p>
    </div>
  );
};

export default MemberDetails;
