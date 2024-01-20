/* eslint-disable @next/next/no-img-element */
import { Progress } from 'antd';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';
const db = firebase.firestore();

const initialInstructorState = {
  instructorName: '',
  photoUrl: '',
  jobTitle: '',
};

const AddInstructor = () => {
  const { instructor } = useStateContext();
  // console.log(instructor);

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
      db.collection('instructors')
        .add({ ...instructorInfo })
        .then(() => {
          alert('Instructor information was successfully uploaded.');
          window.location.reload();
        })
        .catch((error) => {
          alert(error.message + '' + 'Something went wrong');
        });

      setInstructorInfo({ ...initialInstructorState });
    } else {
      alert('Please provide a valid information!');
    }
  };

  const handleChange = (e) => {
    setInstructorInfo({ ...instructorInfo, [e.target.name]: e.target.value });
  };

  const handleDeleteInstructor = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        db.collection('instructors')
          .doc(item.key)
          .delete()
          .then(() => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error!', 'Something went wrong.', 'error');
          });
      }
    });
  };

  return (
    <div>
      <div className="bg-[#f0f0f0] shadow-lg rounded-lg border-dashed px-6 py-3 mt-5">
        <h2 className="text-xl text text-center my-4 font-bold">
          Instructor List
        </h2>
        {instructor?.length === 0 ? (
          <p className="text-base">No instructor information were added!</p>
        ) : (
          instructor?.map((item) => (
            <div key={item.id} className="my-4 shadow-md flex items-center">
              <div className="flex-1">
                <div className="px-4 py-2 rounded-lg text-base font-normal flex items-center justify-between gap-10 bg-white">
                  <div className="flex items-center gap-4">
                    <img
                      className="w-20 h-20 rounded-full"
                      src={item.photoUrl}
                      alt={item.instructorName}
                    />
                    <div>
                      <p className="text-xl m-0">
                        <strong>{item.instructorName}</strong>
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
          ))
        )}
      </div>
      <div className="bg-[#f0f0f0] shadow-lg rounded-lg border-dashed px-6 py-3 mt-10">
        <h2 className="text-xl text text-center my-4 font-bold">
          Add Instructor
        </h2>
        <div className="grid gap-4 grid-cols-2 ">
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
          <div className="col-span-2">
            <label htmlFor className="font-semibold block text-[#17012e]">
              Image of the instructor
            </label>
            <input
              id="photoUrl"
              onChange={handleFileSubmit}
              type="file"
              className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded bg-white"
            />
          </div>
        </div>
        <Progress
          percent={progressData}
          size="small"
          strokeColor={conicColors}
        />
        <div className="w-full text-center pt-5 pb-4">
          <button
            onClick={handleAddInstructor}
            className="px-4 py-3 bg-blue-500 text-white rounded-md"
          >
            Add Instructor
          </button>
        </div>
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
