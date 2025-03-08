import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useStateContextDashboard } from '../../../../src/context/UtilitiesContext';
import useEnrolledCourseData from '../../../../src/hooks/useEnrolledCourseData';
import ResourceContent from './ResourceContent';

const ResourceHome = () => {
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
    };
    setCurrentContent(initialContent);
  }, [courseDataBatch]);

  // NOTE: THIS WILL BE THE ENROLLED COURSE BY USER
  const selectCourse = courseDataBatch.map((option) => ({
    label: option?.courseData.item_name,
    value: option,
  }));

  const handleChange = (item) => {
    setCurrentContent({
      moduleData: item.value?.course_modules,
      title: item.label,
      free_resources: item.value?.free_resources,
    });
  };

  return (
    <div>
      <div
        className={`${
          activeMenu ? 'w-full mx-auto px-4' : 'w-full px-4'
        } mx-auto flex items-start gap-6`}
      >
        <div className="w-full md:w-[90%] mt-6 mx-auto">
          <Select
            className="w-2/3 md:w-1/3 mb-6"
            styles={customStyles}
            options={selectCourse}
            defaultValue={currentContent}
            onChange={handleChange}
          />
          <ResourceContent item={currentContent} />
        </div>
      </div>
    </div>
  );
};

export default ResourceHome;
