import { Camera, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { colors } from '../../../../src/data/data';
import { formatDateWithoutYear } from '../../../../src/utils/convertDate';

const ModuleIntro = ({ moduleData }) => {
  return (
    <div className="mt-10 w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center rounded-lg border bg-white p-4 gap-4 my-4">
        {/* Module Info */}
        <div className="w-full lg:w-[70%] flex items-start gap-3">
          {/* Module Color and Number */}
          <div
            style={{
              backgroundColor: colors[moduleData?.moduleNumber - 1 || 0],
            }}
            className="p-2 rounded-lg text-white text-center text-base font-normal"
          >
            <p className="m-0 text-sm">Module</p>
            <p className="m-0 font-bold">{moduleData?.moduleNumber}</p>
          </div>

          {/* Module Details */}
          <div className="flex-1">
            <h2 className="text-lg lg:text-[22px] font-semibold -mt-[6px]">
              {moduleData?.moduleName}
            </h2>
            <div className="flex flex-wrap gap-4 items-center mt-1">
              <p className="flex items-center gap-1 text-sm">
                <Video className="text-lg lg:text-xl" />
                {moduleData?.liveClassNumber} Live Class
              </p>
              <p className="flex items-center gap-1 text-sm">
                <Camera className="text-lg lg:text-xl" />
                {moduleData?.projectNumber || 0} Project
              </p>
            </div>

            {/* Resource and Recording Links */}
            <div className="flex flex-wrap gap-3 mt-4">
              <Link href="/students/resource">
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 font-semibold py-2 px-4 rounded transition-all duration-200">
                  <Image
                    width={24}
                    height={24}
                    src="/icon/resource.png"
                    alt="Resource Icon"
                  />
                  <span>Resource ({moduleData?.liveClassNumber})</span>
                </button>
              </Link>
              <Link href="/students/recording">
                <button className="flex items-center md:gap-2 bg-gray-200 hover:bg-gray-300 font-semibold py-2 px-2 md:px-4 rounded transition-all duration-200">
                  <Image
                    width={24}
                    height={24}
                    src="/icon/video-player.png"
                    alt="Class Recording Icon"
                  />
                  <span>Class Recording</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Module Date Range */}
        <div className="w-full lg:w-[30%] flex justify-end mt-4 lg:mt-0">
          <p className="text-sm lg:text-base bg-gray-200 px-2 py-1 rounded-md">
            {formatDateWithoutYear(moduleData?.lessons[0]?.classDate)} -{' '}
            {formatDateWithoutYear(moduleData?.lessons?.at(-1)?.classDate)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModuleIntro;
