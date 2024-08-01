import React from 'react';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa6';
import { LuChevronRight, LuClipboardSignature } from 'react-icons/lu';
import LeaderBoard from './LeaderBoard';
import Report from './Report';

const ProgressHome = () => {
  return (
    <div className="h-[calc(100vh-100px)] fixed top-[90px] overflow-y-scroll mr-5">
      <Report />
      <button
        className="flex justify-between items-center gap-2 bg-[#ffffff] 
        font-semibold  py-3 px-5 rounded border-dashboard_border border w-full mt-4 hover:text-primary transition-all duration-200"
      >
        <span className="flex items-center gap-2 text-lg">
          {' '}
          <LuClipboardSignature className="text-primary text-2xl" /> How to
          calculate score{' '}
        </span>{' '}
        <LuChevronRight className="text-primary text-2xl" />
      </button>

      <LeaderBoard />

      <div className="bg-white mt-4 p-4 border border-dashboard_border rounded">
        <h4 className="text-sm">Join Private Group</h4>
        <div className="flex gap-3 mt-2">
          <button
            className="flex justify-center items-center gap-2 bg-[#c8ffe6] hover:bg-[#d0d0d0] font-semibold
            py-2 px-4 rounded w-full text-[#009351] transition-all duration-200"
          >
            JOIN <FaWhatsapp />
          </button>
          <button
            className="flex justify-center items-center gap-2 bg-[#e9efff] hover:bg-[#d0d0d0] font-semibold
            py-2 px-4 rounded w-full text-[#4478ff] transition-all duration-200"
          >
            JOIN <FaFacebook />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressHome;
