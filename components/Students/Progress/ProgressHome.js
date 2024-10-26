import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa6';
import { LuChevronRight, LuClipboardSignature } from 'react-icons/lu';
import LeaderBoard from './LeaderBoard';
import Report from './Report';

const ProgressHome = () => {
  const [currentUrl, setCurrentUrl] = useState(null);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <div className="h-[calc(100vh-100px)] md:fixed top-[90px] overflow-y-scroll md:mr-5 pl-[84px] pr-2 md:pl-6 md:pr-3">
      <Report />
      <Link href={`${currentUrl}/notice`}>
        <button
          className="flex justify-between items-center gap-2 bg-white text-black visited:text-black
        font-semibold py-3 px-4 rounded border border-dashboard_border w-full mt-4 hover:text-primary transition-all duration-200"
        >
          <p className="flex items-center gap-2 text-lg">
            <LuClipboardSignature className="text-primary text-2xl" /> Notice
            Board (3)
          </p>
          <LuChevronRight className="text-primary text-2xl" />
        </button>
      </Link>

      <LeaderBoard />

      <div className="bg-white mt-4 p-4 border border-dashboard_border rounded">
        <h4 className="text-sm">Join Private Group</h4>
        <div className="flex flex-col md:flex-row gap-3 mt-2">
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
