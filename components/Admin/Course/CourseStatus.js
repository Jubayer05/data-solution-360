/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Select from 'react-select';
import { useStateContext } from '../../../src/context/ContextProvider';

const CourseStatus = ({ courseStatus, setCourseStatus }) => {
  const { instructor } = useStateContext();

  const selectInstructor = [
    {
      label: <div>Registration Going on</div>,
      value: 'Registration Going on',
    },
    {
      label: <div>Running</div>,
      value: 'Running',
    },
    {
      label: <div>Upcoming</div>,
      value: 'Upcoming',
    },
  ];

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
      backgroundColor: '#f6f6f6',
    }),
  };

  const handleChange = (item) => {
    setCourseStatus(item.value);
  };

  // const handleDeleteInstructor = (item) => {
  //   const filterInstructor = instructors.filter((val) => val.id !== item.id);
  //   setInstructors(filterInstructor);
  // };

  return (
    <div className="rounded-lg border-dashed pb-3 ">
      {/* {instructors?.map((item) => (
        <div key={item.id} className="my-4 shadow-md flex items-center">
          <div className="flex-1">
            <div className="px-4 py-2 rounded-lg text-base font-normal flex items-center justify-between gap-10 bg-white">
              <div className="flex items-center gap-4">
                <img
                  className="w-20 h-20 rounded-full"
                  src={item.photoUrl}
                  alt={item.profileName}
                />
                <div>
                  <p className="text-xl m-0">
                    <strong>{item.profileName}</strong>
                  </p>
                  <p className="ml-1 text-base m-0">{item.jobTitle}</p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteInstructor(item)}
                className="px-4 py-3 mx-4 bg-red-500 text-white rounded-md"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))} */}
      <Select
        className="w-full"
        styles={customStyles}
        options={selectInstructor}
        defaultValue={courseStatus}
        onChange={handleChange}
      />
    </div>
  );
};

export default CourseStatus;
