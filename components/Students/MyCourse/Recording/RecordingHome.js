import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import Select from 'react-select';
import { useStateContextDashboard } from '../../../../src/context/UtilitiesContext';
import { courseData } from '../../../../src/data/dummy';
import RecordingContent from './RecordingContent';

const RecordingHome = () => {
  const { activeMenu } = useStateContextDashboard();
  const [activeBtn, setActiveBtn] = useState('Live Class');
  const [currentContent, setCurrentContent] = useState(null);

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

  const handleSegmentClick = (item) => {
    setActiveBtn(item.title);
  };

  useEffect(() => {
    setCurrentContent(courseData[0]);
  }, []);

  // NOTE: THIS WILL BE THE ENROLLED COURSE BY USER
  const selectInstructor = courseData.map((option) => ({
    label: option.title,
    value: option.moduleData,
  }));

  const handleChange = (item) => {
    setCurrentContent({ moduleData: item.value, title: item.label });
  };

  return (
    <div>
      <div
        className={`${
          activeMenu ? 'w-full mx-auto px-4' : 'w-full pr-6 pl-[96px]'
        } mx-auto flex items-start gap-6`}
      >
        <div className="w-[80%] mt-6 mx-auto">
          <Select
            className=" w-1/3 mb-6"
            styles={customStyles}
            options={selectInstructor}
            defaultValue={selectInstructor[0]}
            onChange={handleChange}
          />
          {/* <Link href={`/students/my-course/${item?.key}/videos`}> */}
          <div
            className="w-1/2 flex items-center gap-4 bg-[#e9efff] border border-[#7986f7] px-5 py-3 rounded-md 
        mt-3 cursor-pointer hover:shadow-md transition-all duration-200 mb-6"
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
              <p className="text-xs mt-1">35 Videos</p>
            </div>
            <div>
              <FaChevronRight />
            </div>
          </div>
          {/* </Link> */}

          <div className="w-full flex items-center gap-2 bg-white border px-5 py-4 rounded-md my-5">
            {segmentBtn.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSegmentClick(item)}
                className={`${
                  activeBtn === item.title
                    ? 'bg-primary_btn hover:bg-[#001f3fdb] text-white'
                    : ''
                } flex justify-center items-center gap-2  hover:bg-[#c2c2c2] font-semibold
          py-2 px-4 rounded border `}
              >
                {item.title}
              </button>
            ))}
          </div>

          <RecordingContent item={currentContent} />
        </div>
      </div>
    </div>
  );
};

export default RecordingHome;

const segmentBtn = [
  {
    id: '1',
    title: 'Live Class',
  },
  {
    id: '2',
    title: 'Support Class',
  },
  {
    id: '3',
    title: 'Conceptual Class',
  },
  {
    id: '4',
    title: 'Question Solving',
  },
];
