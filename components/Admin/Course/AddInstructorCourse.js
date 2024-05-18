/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { useStateContext } from '../../../src/context/ContextProvider';

const AddInstructorCourse = ({ instructors, setInstructors }) => {
  const { instructor } = useStateContext();

  const selectInstructor = instructor.map(
    ({ profileName, photoUrl, jobTitle }) => ({
      label: (
        <div className="flex items-center gap-4">
          <img
            className="w-10 h-10 rounded-full"
            src={photoUrl}
            alt={profileName}
          />
          <div>
            <p className="text-lg m-0">
              <strong>{profileName}</strong>
            </p>
            <p className="ml-1 text-sm m-0">{jobTitle}</p>
          </div>
        </div>
      ),
      value: { profileName, photoUrl, jobTitle },
    }),
  );

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
    <div className="bg-[#f0f0f0] shadow-lg rounded-lg border-dashed px-6 py-3 mt-10">
      <h2 className="text-xl text text-center my-4 font-bold">
        Choose Instructor From List
      </h2>
      <p>Previous</p>
      {instructors?.map((item) => (
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
      ))}
      <Select
        className="w-full"
        styles={customStyles}
        options={selectInstructor}
        defaultValue={instructors}
        onChange={handleChange}
      />
    </div>
  );
};

export default AddInstructorCourse;
