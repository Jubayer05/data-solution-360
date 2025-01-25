import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useStateContextDashboard } from '../../../../src/context/UtilitiesContext';
import useEnrolledCourseData from '../../../../src/hooks/useEnrolledCourseData';
import RecordingContent from './RecordingContent';

const RecordingHome = () => {
  const { activeMenu } = useStateContextDashboard();
  const [currentContent, setCurrentContent] = useState(null);
  const { courseDataBatch } = useEnrolledCourseData();

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      padding: 20,
    }),
    control: (_, {}) => ({
      display: 'flex',
      border: '1px solid #e5e5e5',
      padding: '5px 10px',
      borderRadius: '6px',
      backgroundColor: '#ffffff',
    }),
  };

  useEffect(() => {
    const initialContent = {
      title: courseDataBatch[0]?.courseData.item_name,
      moduleData: courseDataBatch[0]?.course_modules,
      batchId: courseDataBatch[0]?.unique_batch_id,
    };
    setCurrentContent(initialContent);
  }, [courseDataBatch]);

  // NOTE: THIS WILL BE THE ENROLLED COURSE BY USER
  const selectRecording = courseDataBatch.map((option) => ({
    label: option.courseData.item_name,
    value: {
      course_modules: option.course_modules,
      batchId: option.unique_batch_id,
    },
  }));

  const handleChange = (item) => {
    setCurrentContent({
      moduleData: item.value.course_modules,
      title: item.label,
      batchId: item.value.batchId,
    });
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
        <div className="w-full md:w-[80%] mt-6 mx-auto">
          <Select
            className="w-2/3 md:w-1/3 mb-6"
            styles={customStyles}
            options={selectRecording}
            defaultValue={currentContent}
            onChange={handleChange}
          />
          {/* <Link href={`/students/my-course/${item?.key}/videos`}> */}
          <div
            className="w-full md:w-1/2 flex items-center gap-4 bg-[#e9efff] border 
            border-[#7986f7] px-3 md:px-5 py-3 rounded-md mt-3 cursor-pointer hover:shadow-md transition-all duration-200 mb-6"
          >
            <Image
              width={500}
              height={300}
              src="/icon/video-player.png"
              className="w-[60px]"
              alt=""
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold leading-6 ">
                Recorded Live Class
              </h2>
              <p className="text-xs mt-1">{currentContent?.title}</p>
            </div>
            <div>
              <ChevronRight />
            </div>
          </div>

          <RecordingContent item={currentContent} />
        </div>
      </div>
    </div>
  );
};

export default RecordingHome;
