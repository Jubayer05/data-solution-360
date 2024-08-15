import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import Select from 'react-select';
import { useStateContextDashboard } from '../../../../src/context/UtilitiesContext';
import ButtonDashboard from '../../../utilities/dashboard/ButtonDashboard';
import ResourceContent from './ResourceContent';

const ResourceHome = () => {
  const { activeMenu } = useStateContextDashboard();
  const [currentContent, setCurrentContent] = useState(null);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

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
      backgroundColor: '#f1f1f1',
    }),
  };

  // NOTE: THIS WILL BE THE ENROLLED COURSE BY USER
  const selectInstructor = [
    { value: 'instructor1', label: 'Instructor 1' },
    { value: 'instructor2', label: 'Instructor 2' },
    { value: 'instructor3', label: 'Instructor 3' },
  ];

  const handleChange = (instructors) => {
    setCurrentContent(instructors.value);
  };

  return (
    <div>
      <div
        className={`${
          activeMenu ? 'w-full mx-auto px-4' : 'w-full pr-6 pl-[96px]'
        } mx-auto flex items-start gap-6`}
      >
        <div className="w-[100%] ">
          <div className="flex items-end gap-4 py-6">
            <ButtonDashboard onClick={handleBack}>
              <FaArrowLeft />
              Back
            </ButtonDashboard>
          </div>
          <Select
            className=" w-1/3 mb-6"
            styles={customStyles}
            options={selectInstructor}
            // defaultValue={instructors}
            onChange={handleChange}
          />
          <ResourceContent />
        </div>
      </div>
    </div>
  );
};

export default ResourceHome;
