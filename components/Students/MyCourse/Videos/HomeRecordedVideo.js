import { Collapse, Empty, Spin } from 'antd';
import {
  ArrowLeft,
  Award,
  Bookmark,
  Calendar,
  ChevronRight,
  CirclePlay,
  Clock,
  Menu,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useEnrolledCourseData from '../../../../src/hooks/useEnrolledCourseData';
import { capitalizeWords } from '../../../../src/utils/capitalizeWords';
import { convertToAMPM } from '../../../../src/utils/convertAMPM';
import { formatDate } from '../../../../src/utils/convertDate';
import { extractVideoId } from '../../../../src/utils/utils';
import YouTubePlayer from '../../../FreeCourse/YoutubePlayer';
import ButtonDashboard from '../../../utilities/dashboard/ButtonDashboard';

const HomeRecordedVideo = () => {
  const [isMobilePlaylistOpen, setIsMobilePlaylistOpen] = useState(false);
  const router = useRouter();
  const { enrolledCourse } = useEnrolledCourseData();

  const handleBack = () => {
    router.back();
  };

  const { moduleId, lessonId, courseId } = router.query;

  const toggleMobilePlaylist = () => {
    setIsMobilePlaylistOpen(!isMobilePlaylistOpen);
  };

  // Helper function to check if module has any recordings
  const hasRecordings = (module) => {
    return module.lessons.some((lesson) => lesson.recordingLink);
  };

  // Count available videos in a module
  const getAvailableVideosCount = (module) => {
    return module.lessons.filter((lesson) => lesson.recordingLink).length;
  };

  const classDetails = enrolledCourse?.course_modules
    ?.find((item) => item.id === moduleId)
    ?.lessons?.find((lesson) => lesson?.id === lessonId);

  console.log(classDetails);

  return (
    <div className="container mx-auto px-4">
      {/* Mobile Playlist Toggle */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Image
            width={500}
            height={300}
            src="/icon/video_recorded.png"
            className="w-8"
            alt="Recorded Video"
          />
          <h3 className="text-lg font-semibold">Class Recording Video</h3>
        </div>
        <button
          onClick={toggleMobilePlaylist}
          className="p-2 bg-gray-100 rounded-md"
        >
          {isMobilePlaylistOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Video Content */}
        <div className="w-full lg:w-[60%]">
          <div className="hidden lg:flex items-end gap-4 pt-6 mb-5">
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

          <div className="px-2 lg:px-0 pb-2">
            <h2 className="font-heading font-bold text-2xl my-2">My Courses</h2>
            <div className="rounded-xl overflow-hidden">
              {classDetails?.recordingLink ? (
                <YouTubePlayer
                  videoId={extractVideoId(classDetails?.recordingLink)}
                />
              ) : (
                <div className="min-h-[30vh] flex justify-center items-center bg-white">
                  <Spin size="medium" />
                </div>
              )}
            </div>
            <div className="max-w-2xl mx-auto mt-10 pb-10">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-2xl">
                {/* Header Section with Gradient Accent */}
                <div className="relative px-8 pt-8 pb-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 opacity-20 rounded-bl-full" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {capitalizeWords(classDetails?.title)}
                  </h2>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                    <Bookmark className="w-4 h-4 mr-2" />
                    {classDetails?.classType}
                  </div>
                </div>

                {/* Details Section */}
                <div className="px-8 py-6 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-blue-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Date
                        </p>
                        <p className="text-base font-semibold text-gray-900">
                          {formatDate(classDetails?.classDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-blue-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Time
                        </p>
                        <p className="text-base font-semibold text-gray-900">
                          {convertToAMPM(classDetails?.classTime)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Instructor Section */}
                  <div className="relative mt-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                    <div className="absolute top-0 right-0 transform -translate-y-1/2">
                      <Award className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="flex items-start space-x-5">
                      <div className="flex-shrink-0">
                        <img
                          src={classDetails?.instructorForClass.photoUrl}
                          alt={classDetails?.instructorForClass.profileName}
                          className="w-20 h-20 rounded-xl object-cover border-2 border-white shadow-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-bold text-gray-900 mb-2">
                          {classDetails?.instructorForClass.profileName}
                        </p>
                        <div
                          className="text-sm leading-relaxed text-gray-600 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: classDetails?.instructorForClass.details,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Playlist - Desktop & Mobile */}
        <div
          className={`
          fixed lg:sticky inset-0 z-50 lg:z-0 
          w-full lg:w-[40%] lg:top-52 
          bg-white lg:shadow-lg rounded-lg 
          py-5 my-5 overflow-y-scroll 
          ${isMobilePlaylistOpen ? 'block' : 'hidden lg:block'}
          lg:h-[85vh]
        `}
        >
          <div className="relative">
            {/* Mobile Close Button */}
            <button
              onClick={toggleMobilePlaylist}
              className="lg:hidden absolute top-0 right-4 z-50"
            >
              <X className="text-2xl" />
            </button>

            <h2 className="text-xl font-semibold px-5 pt-4 lg:pt-0">
              Playlist
            </h2>

            {enrolledCourse?.course_modules?.some((module) =>
              hasRecordings(module),
            ) ? (
              enrolledCourse?.course_modules?.map(
                (item, index) =>
                  // Only render the Collapse if the module has recordings
                  hasRecordings(item) && (
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
                                      {getAvailableVideosCount(item)} videos
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </>
                          }
                          key={item.id}
                        >
                          {item?.lessons?.map(
                            (video) =>
                              video?.recordingLink && (
                                <Link
                                  key={video.id}
                                  href={`/students/my-course/${courseId}/videos?moduleId=${
                                    item?.id
                                  }&lessonId=${video?.id || ''}`}
                                >
                                  <div
                                    className="flex items-center gap-2 py-2 my-1 hover:text-blue-500 cursor-pointer 
                            font-medium"
                                  >
                                    <CirclePlay className="text-lg mt-1" />
                                    <p className="flex-1">{video.title}</p>
                                    <span className="bg-green-100 border border-green-500 px-2 text-[10px] rounded-full font-semibold text-green-700">
                                      Available
                                    </span>
                                  </div>
                                </Link>
                              ),
                          )}
                        </Collapse.Panel>
                      </Collapse>
                    </div>
                  ),
              )
            ) : (
              <div className="p-5">
                <Empty description="No recordings available" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRecordedVideo;
