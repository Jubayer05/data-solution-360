import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useStateContextDashboard } from '../../../../src/context/UtilitiesContext';
import { courseData } from '../../../../src/data/dummy';
import ResourceContent from './ResourceContent';

const ResourceHome = () => {
  const { activeMenu } = useStateContextDashboard();
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
          <ResourceContent item={currentContent} />
        </div>
      </div>
    </div>
  );
};

export default ResourceHome;
