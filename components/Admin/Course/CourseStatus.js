/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Select from 'react-select';

const CourseStatus = ({ courseStatus, setCourseStatus }) => {
  const selectCourseStatus = [
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

  return (
    <div className="rounded-lg border-dashed pb-3 ">
      <Select
        className="w-full"
        styles={customStyles}
        options={selectCourseStatus}
        defaultValue={courseStatus}
        onChange={handleChange}
      />
    </div>
  );
};

export default CourseStatus;
