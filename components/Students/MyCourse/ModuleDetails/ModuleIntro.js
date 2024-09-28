import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdOutlineVideoCall, MdOutlineVideoCameraFront } from 'react-icons/md';
import { colors } from '../../../../src/data/data';
import { formatDateWithoutYear } from '../../../../src/utils/convertDate';

const ModuleIntro = ({ moduleData }) => {
  return (
    <div className="mt-10  w-full">
      <div className="flex justify-between items-center self-stretch rounded-lg border bg-white p-4 gap-4 my-4">
        <div className="w-[70%] flex items-start gap-3">
          <div
            style={{
              backgroundColor: colors[moduleData?.moduleNumber - 1 || 0],
            }}
            className={`p-2 rounded-lg text-white text-center text-base font-normal`}
          >
            <p className="m-0 text-sm">Module</p>
            <p className="m-0 font-bold">{moduleData?.moduleNumber}</p>
          </div>
          <div>
            <h2
              className="text-[22px] font-semibold -mt-[6px]
              "
            >
              {moduleData?.moduleName}
            </h2>
            <div className="flex gap-6 items-center mt-1">
              <p className="flex gap-1 items-center">
                <MdOutlineVideoCall className="text-xl" />{' '}
                {moduleData?.liveClassNumber} Live Class
              </p>
              <p className="flex gap-1 items-center">
                <MdOutlineVideoCameraFront className="text-xl" />{' '}
                {moduleData?.projectNumber || 0} Project
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/students/resource">
                <button
                  className="flex justify-between items-center gap-2 bg-[#e2e2e2] hover:bg-[#d5d5d5] font-semibold py-2
        px-5 rounded border-dashboard_border border mt-4 transition-all duration-200"
                >
                  <span className="flex items-center gap-2">
                    <Image
                      width={500}
                      height={300}
                      src="/icon/resource.png"
                      className="w-6"
                      alt=""
                    />
                    Resource({moduleData?.liveClassNumber})
                  </span>
                </button>
              </Link>
              <Link href="/students/recording">
                <button
                  className="flex justify-between items-center gap-2 bg-[#e2e2e2] hover:bg-[#d5d5d5] font-semibold py-2
        px-5 rounded border-dashboard_border border mt-4 transition-all duration-200"
                >
                  <span className="flex items-center gap-2">
                    <Image
                      width={500}
                      height={300}
                      src="/icon/video-player.png"
                      className="w-6"
                      alt=""
                    />
                    Class Recording
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[30%] flex justify-end">
          <p className="text-base bg-gray-200 px-2 py-[2px] rounded-md">
            {formatDateWithoutYear(moduleData?.lessons[0].classDate)} -{' '}
            {formatDateWithoutYear(moduleData?.lessons?.at(-1).classDate)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModuleIntro;
