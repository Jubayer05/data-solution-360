/* eslint-disable @next/next/no-img-element */
{
  /* 
          TODO: InputBox component for the instructor name 
          * 1. Build a form for the instructor 
          * 2. This will contain following information 
          * 3. Name, photoUrl, job title
        */
}

import { Collapse, Progress } from 'antd';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../../firebase';
const { Panel } = Collapse;

const initialInstructorState = {
  instructorName: '',
  photoUrl: '',
  jobTitle: '',
};

const AddInstructor = ({ instructor, setInstructor }) => {
  const [instructorInfo, setInstructorInfo] = useState({
    ...initialInstructorState,
  });
  const [progressData, setProgressData] = useState(0);

  const conicColors = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
  };

  // Handler for file submission
  const handleFileSubmit = (e) => {
    const fileSize = e.target.files[0].size;
    const instructorImg = e.target.files[0];
    // console.log(instructorImg.size);

    if (fileSize < 1024000) {
      const uploadTask = firebase
        .storage()
        .ref(`instructorImage/${instructorImg?.name}`)
        .put(instructorImg);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          setProgressData(progress);
        },
        (error) => {
          alert(error.message + '' + 'Something went wrong');
        },
        () => {
          firebase
            .storage()
            .ref('instructorImage')
            .child(instructorImg?.name)
            .getDownloadURL()
            .then((url) => {
              // NOTE: use this url
              setInstructorInfo({ ...instructorInfo, photoUrl: url });
            });
        },
      );
    } else {
      alert('File Size must be under 1mb');
    }
  };

  const handleAddInstructor = () => {
    if (
      instructorInfo.instructorName !== '' &&
      instructorInfo.photoUrl !== '' &&
      instructorInfo.jobTitle !== ''
    ) {
      setInstructor([
        ...instructor,
        { ...instructorInfo, id: uuidv4().split('-')[0] },
      ]);

      setInstructorInfo({ ...initialInstructorState });
    } else {
      alert('Please provide a valid information!');
    }
  };

  const handleChange = (e) => {
    setInstructorInfo({ ...instructorInfo, [e.target.name]: e.target.value });
  };

  const handleDeleteInstructor = (item) => {
    setInstructor(instructor.filter((x) => x.id !== item.id));
    // console.log(item);
  };

  console.log(instructorInfo);

  return (
    <div className="bg-[#f0f0f0] shadow-lg rounded-lg border-dashed px-6 py-3 mt-5">
      <h2 className="text-xl text text-center my-4 font-bold">
        Add Instructor
      </h2>
      {instructor.length === 0 ? (
        <p className="text-base">No instructor information were added!</p>
      ) : (
        instructor.map((item) => (
          <div key={item.id} className="my-2 flex items-center">
            <div className="flex-1">
              <Collapse
                collapsible="header"
                expandIconPosition="end"
                defaultActiveKey={['1']}
              >
                <Panel
                  className="text-lg font-semibold"
                  header={`${item.instructorName}`}
                  key={item.id}
                >
                  <div className="text-base font-normal flex items-center gap-10">
                    <img
                      className="w-20"
                      src={item.photoUrl}
                      alt={item.instructorName}
                    />
                    <p className="text-center text-base">
                      Name: <strong>{item.instructorName}</strong>
                    </p>
                    <p className="text-center text-base">
                      Designation:<strong>{item.jobTitle}</strong>
                    </p>
                  </div>
                </Panel>
              </Collapse>
            </div>
            <button
              onClick={() => handleDeleteInstructor(item)}
              className="px-4 py-3 mx-4 bg-red-500 text-white rounded-md"
            >
              Delete Instructor
            </button>
          </div>
        ))
      )}
      <div className="grid gap-4 grid-cols-3 mt-10">
        <div className="col-span-1">
          <InputBox
            value={instructorInfo.instructorName}
            title="Instructor Name"
            name="instructorName"
            id="instructorName"
            type="text"
            func={handleChange}
          />
        </div>
        <div className="col-span-1">
          <InputBox
            value={instructorInfo.jobTitle}
            title="Job Title"
            name="jobTitle"
            id="jobTitle"
            type="text"
            func={handleChange}
          />
        </div>
        <div className="col-span-1">
          <label htmlFor className="font-semibold block text-[#17012e]">
            Course Image
          </label>
          <input
            id="photoUrl"
            onChange={handleFileSubmit}
            type="file"
            className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
          />
        </div>
      </div>
      <Progress percent={progressData} size="small" strokeColor={conicColors} />
      <div className="w-full text-center pt-5 pb-4">
        <button
          onClick={handleAddInstructor}
          className="px-4 py-3 bg-blue-500 text-white rounded-md"
        >
          {instructor.length > 0 ? 'Add Another Instructor' : 'Add Instructor'}
        </button>
      </div>
    </div>
  );
};

export default AddInstructor;

const InputBox = ({ title, type, id, func, placeholder, name, value }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="font-semibold block text-[#17012e]">
        {title}
      </label>
      <input
        value={value}
        id={id}
        onChange={func}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
      />
    </div>
  );
};
