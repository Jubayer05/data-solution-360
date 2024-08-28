import { Collapse } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRight, FaRegCirclePlay } from 'react-icons/fa6';
import { MdOutlineOndemandVideo } from 'react-icons/md';
import { useStateContextDashboard } from '../../../../src/context/UtilitiesContext';
import { videosPlaylist } from '../../../../src/data/dummy';
import ButtonDashboard from '../../../utilities/dashboard/ButtonDashboard';

const HomeRecordedVideo = () => {
  const { activeMenu, showedItem, setShowedItem } = useStateContextDashboard();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  // console.log(videoUrls);

  return (
    <div>
      <div
        className={`${
          activeMenu ? 'w-full mx-auto px-4' : 'w-full pr-6 pl-[96px]'
        } mx-auto flex items-start gap-6`}
      >
        {/* NOTE: LEFT SIDE */}
        <div className="w-[60%] ">
          <div className="flex items-end gap-4 pt-6">
            <ButtonDashboard onClick={handleBack}>
              <FaArrowLeft />
              Back
            </ButtonDashboard>
            <Image
              width={500}
              height={300}
              src="/icon/video_recorded.png"
              className="w-8 ml-5"
              alt=""
            />
            <h3 className="text-lg font-semibold">Pre Recorded Video</h3>
            <div
              className="flex items-center gap-2 bg-gray-200 px-3 py-1 text-xs font-medium
          rounded-sm "
            >
              <MdOutlineOndemandVideo className="text-base" />
              31 Videos
            </div>
          </div>
          <div className="px-6 pb-2 my-5 ">
            <h2 className="font-heading font-bold text-2xl my-2 ">
              My Courses
            </h2>
            <div>
              {showedItem?.url && (
                <iframe
                  src={`https://drive.google.com/file/d/${getDriveFileId(
                    showedItem?.url,
                  )}/preview`}
                  width="100%"
                  height="400"
                  allow="autoplay"
                ></iframe>
              )}
            </div>
            <div className="mt-6">
              <p className="text-lg font-medium mb-2">{showedItem?.title}</p>
              <div className="flex items-center gap-3 bg-white p-3 shadow rounded-md">
                <ButtonDashboard className="w-full">
                  <FaArrowLeft />
                  Back
                </ButtonDashboard>
                <ButtonDashboard className="w-full">
                  Next
                  <FaArrowRight />
                </ButtonDashboard>
              </div>
            </div>
          </div>
        </div>

        {/* NOTE: RIGHT SIDE */}
        <div className="w-[40%] sticky top-52 bg-white shadow-lg rounded-lg py-5 my-5 overflow-y-scroll h-[500px]">
          <h2 className="text-xl font-semibold px-5">Playlist</h2>

          {videosPlaylist?.map((item, index) => (
            <div key={item.id} className="w-full">
              <Collapse
                className="my-2 overflow-hidden rounded-none"
                collapsible="header"
                expandIconPosition="end"
                expandIcon={({ isActive }) => (
                  <FaChevronRight
                    style={{
                      color: 'white',
                      fontSize: '16px',
                      rotate: `${isActive ? '90deg' : '0deg'}`,
                    }}
                  />
                )}
                defaultActiveKey={index === 0 ? [`${item.id}`] : null}
              >
                <Collapse.Panel
                  className="text-base relative"
                  header={
                    <>
                      <div className="absolute w-full left-0 top-0 bg-[#1d2939] h-full -z-10" />
                      <div className="z-10">
                        <div className="pl-2">
                          <div>
                            <p className="text-base mb-0 font-normal text-white">
                              {item.title}
                            </p>
                            <p className="text-base mb-0 font-normal text-gray-300 mt-5">
                              {item.totalVideo} videos
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  }
                  key={item.id}
                >
                  {item?.videoUrl?.map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center gap-2 py-2 my-1 hover:text-blue-500 cursor-pointer 
                      font-medium"
                      onClick={() => setShowedItem(video)}
                    >
                      <FaRegCirclePlay className="text-lg mt-1" />
                      <p className="flex-1">{video.title}</p>
                      <p>{video.duration} min</p>
                    </div>
                  ))}
                </Collapse.Panel>
              </Collapse>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeRecordedVideo;

function getDriveFileId(url) {
  const regex = /\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
