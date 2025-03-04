/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { loadData } from '../../../src/hooks/loadData';

const AddInstructorCourse = ({ instructors, setInstructors }) => {
  const [instructor, setInstructor] = useState([]);

  useEffect(() => {
    loadData('instructors', setInstructor);
  }, []);

  const selectInstructor = instructor?.map((item) => ({
    label: (
      <div className="flex items-center gap-4">
        <Image
          width={500}
          height={300}
          className="w-10 h-10 rounded-full"
          src={item.photoUrl}
          alt={item.profileName}
        />
        <div>
          <p className="text-lg m-0 font-semibold">{item.profileName}</p>
          <p className="ml-1 text-sm m-0">{item.jobTitle}</p>
        </div>
      </div>
    ),
    value: { ...item },
  }));

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      padding: 30,
    }),
    control: (_, {}) => ({
      display: 'flex',
      border: '1px solid #e5e5e5',
      padding: '8px 10px',
      borderRadius: '6px',
      // backgroundColor: '#f1f1f1',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: '#aaa', // Ensure the placeholder has a visible color
    }),
  };

  const handleChange = (item) => {
    const findInstructor = instructors?.find(
      (val) =>
        val.profileName === item.value.profileName &&
        val.jobTitle === item.value.jobTitle,
    );
    if (!findInstructor) {
      setInstructors([
        ...(instructors || ''),
        { ...item.value, id: uuidv4().split('-')[0] },
      ]);
    }
  };

  const handleDeleteInstructor = (item) => {
    const filterInstructor = instructors.filter((val) => val.id !== item.id);
    setInstructors(filterInstructor);
  };

  return (
    <div className="bg-white border-1 p-5 rounded-lg mt-5 ">
      {instructors?.length > 0 && (
        <div className="mb-4">
          <h3 className="text-base font-semibold mb-2">Selected Instructors</h3>
          {instructors?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-md shadow mb-4"
            >
              <div className="flex items-center gap-4">
                <Image
                  width={500}
                  height={300}
                  className="w-16 h-16 rounded-full"
                  src={item.photoUrl}
                  alt={item.profileName}
                />
                <div>
                  <p className="text-lg font-semibold">{item.profileName}</p>
                  <p className="text-sm">{item.jobTitle}</p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteInstructor(item)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <Select
        className="w-full opacity-0 hidden"
        options={selectInstructor}
        onChange={handleChange}
        placeholder="Select an instructor"
      />
      <Select
        className="w-full"
        styles={customStyles}
        options={selectInstructor}
        onChange={handleChange}
      />
    </div>
  );
};

export default AddInstructorCourse;
