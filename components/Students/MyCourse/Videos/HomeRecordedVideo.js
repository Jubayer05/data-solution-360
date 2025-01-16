import { Collapse, Empty } from 'antd';
import { ArrowLeft, ArrowRight, ChevronRight, CirclePlay } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useStateContextDashboard } from '../../../../src/context/UtilitiesContext';
import useEnrolledCourseData from '../../../../src/hooks/useEnrolledCourseData';
import { capitalizeWords } from '../../../../src/utils/capitalizeWords';
import YouTubePlayer from '../../../FreeCourse/YoutubePlayer';
import ButtonDashboard from '../../../utilities/dashboard/ButtonDashboard';

const HomeRecordedVideo = () => {
  const { activeMenu } = useStateContextDashboard();
  const [showedItem, setShowedItem] = useState();
  const router = useRouter();
  const { enrolledCourse } = useEnrolledCourseData();

  useEffect(() => {
    const findRecordingLink = (modules) => {
      for (let i = 0; i < modules.length; i++) {
        for (let j = 0; j < modules[i].lessons.length; j++) {
          if (modules[i].lessons[j].recordingLink) {
            return {
              url: modules[i].lessons[j].recordingLink,
              title: modules[i].lessons[j].title,
            }; // Return the first valid recordingLink found
          }
        }
      }
      return null; // Return null if no recordingLink is found
    };

    if (enrolledCourse && enrolledCourse.course_modules) {
      const initialContent = findRecordingLink(enrolledCourse.course_modules);
      setShowedItem(initialContent || 'No recording link available'); // Set default message if none is found
    }
  }, [enrolledCourse]);

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <div
        className={`${
          activeMenu
            ? 'w-full mx-auto px-4'
            : 'w-full pr-3 md:pr-6 pl-[84px] md:pl-[96px]'
        } mx-auto flex items-start gap-6`}
      >
        {/* NOTE: LEFT SIDE */}
        <div className="w-[60%] ">
          <div className="flex items-end gap-4 pt-6">
            <ButtonDashboard onClick={handleBack}>
              <ArrowLeft />
              Back
            </ButtonDashboard>
            <Image
              width={500}
              height={300}
              src="/icon/video_recorded.png"
              className="w-8 ml-5"
              alt=""
            />
            <h3 className="text-lg font-semibold">Class Recording Video</h3>
          </div>
          <div className="px-6 pb-2 my-5 ">
            <h2 className="font-heading font-bold text-2xl my-2 ">
              My Courses
            </h2>
            <div>
              {showedItem?.url ? (
                // <iframe
                //   src={`https://drive.google.com/file/d/${getDriveFileId(
                //     showedItem?.url,
                //   )}/preview`}
                //   width="100%"
                //   height="400"
                //   allow="autoplay"
                // ></iframe>
                <YouTubePlayer url={showedItem?.url} />
              ) : (
                <div className="w-full h-[300px] border flex justify-center items-center bg-white rounded-md">
                  <Empty />
                </div>
              )}
            </div>
            <div className="mt-6">
              <p className="text-lg font-medium mb-2">
                {capitalizeWords(showedItem?.title)}
              </p>
              <div className="flex items-center gap-3 bg-white p-3 shadow rounded-md">
                <ButtonDashboard className="w-full">
                  <ArrowLeft />
                  Back
                </ButtonDashboard>
                <ButtonDashboard className="w-full">
                  Next
                  <ArrowRight />
                </ButtonDashboard>
              </div>
            </div>
          </div>
        </div>

        {/* NOTE: RIGHT SIDE */}
        <div className="w-[40%] sticky top-52 bg-white shadow-lg rounded-lg py-5 my-5 overflow-y-scroll h-[500px]">
          <h2 className="text-xl font-semibold px-5">Playlist</h2>

          {enrolledCourse?.course_modules?.map((item, index) => (
            <div key={item.unique_batch_id} className="w-full">
              <Collapse
                className="my-2 overflow-hidden rounded-none"
                collapsible="header"
                expandIconPosition="end"
                expandIcon={({ isActive }) => (
                  <ChevronRight
                    style={{
                      color: 'white',
                      fontSize: '16px',
                      rotate: `${isActive ? '90deg' : '0deg'}`,
                    }}
                  />
                )}
                defaultActiveKey={
                  index === 0 ? [`${item.unique_batch_id}`] : null
                }
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
                              {capitalizeWords(item.moduleName)}
                            </p>
                            <p className="text-base mb-0 font-normal text-gray-300 mt-5">
                              {item?.lessons.length} videos
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  }
                  key={item.id}
                >
                  {item?.lessons?.map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center gap-2 py-2 my-1 hover:text-blue-500 cursor-pointer 
                      font-medium"
                      onClick={() =>
                        setShowedItem({
                          url: video?.recordingLink,
                          title: video?.title,
                        })
                      }
                    >
                      <CirclePlay className="text-lg mt-1" />
                      <p className="flex-1">{video.title}</p>
                      {video?.recordingLink ? (
                        <span className="bg-green-100 border border-green-500 px-2 text-[10px] rounded-full font-semibold text-green-700">
                          Available
                        </span>
                      ) : (
                        <span className="bg-red-100 border border-red-500 px-2 text-[10px] rounded-full font-semibold text-red-700">
                          Unavailable
                        </span>
                      )}
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
