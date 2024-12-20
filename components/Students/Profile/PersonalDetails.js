import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ImCheckmark } from 'react-icons/im';
import Swal from 'sweetalert2';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';
import FileInput from '../../utilities/dashboard/FileInput';
import InputBoxStudent from '../utilities/InputBoxStudent';

const PersonalDetails = () => {
  const [studentInfo, setStudentInfo] = useState({
    full_name: '',
    alternative_email: '',
    alternative_number: '',
    primary_number: '',
    primary_email: '',
  });

  const [photoUrl, setPhotoUrl] = useState(null);

  const { findCurrentUser } = useStateContext();

  useEffect(() => {
    if (findCurrentUser) {
      setStudentInfo({ ...findCurrentUser, photoUrl });
    }
  }, [findCurrentUser, photoUrl]);

  const handleChange = (key, value) => {
    setStudentInfo((prevInfo) => ({
      ...prevInfo,
      [key]: value,
    }));
  };

  const handleUpdate = () => {
    const updatedData = { ...studentInfo };
    if (photoUrl) {
      updatedData.photoUrl = photoUrl;
    } else {
      delete updatedData.photoUrl; // Remove photoUrl if it's undefined
    }

    firebase
      .firestore()
      .collection('users')
      .doc(findCurrentUser.key)
      .update(updatedData)
      .then(() => {
        Swal.fire({
          title: 'Hello',
          text: 'Your profile is updated successfully!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((err) => {
        Swal.fire('Hello!', 'Profile cannot be updated!', 'error');
      });
  };

  // console.log(findCurrentUser);

  return (
    <div>
      <Image
        width={500}
        height={300}
        src={findCurrentUser?.photoUrl || '/icon/profile.png'}
        alt="Profile"
        className="h-[150px] w-[150px] mx-auto rounded-full"
      />
      <p className="text-center"> Photo must be 150*150 px</p>

      <div>
        <FileInput folderName="profileImage" setImageState={setPhotoUrl} />
      </div>

      <InputBoxStudent
        value={studentInfo?.full_name}
        title="Full Name"
        id="full_Name"
        type="text"
        func={handleChange}
      />
      <InputBoxStudent
        value={studentInfo?.alternative_email}
        title="Email"
        id="alternative_Email"
        type="email"
        func={handleChange}
      />
      <InputBoxStudent
        value={studentInfo?.alternative_number}
        title="Alternative Number"
        id="alternative_Number"
        type="text"
        func={handleChange}
      />
      <InputBoxStudent
        value={studentInfo?.phone}
        disabled
        title="Primary Number"
        id="primary_Number"
        type="text"
        func={handleChange}
        readOnly={true}
      />
      <button
        onClick={handleUpdate}
        className="w-full mt-5 px-4 py-3 bg-primary_btn text-white rounded flex items-center justify-center gap-2"
      >
        Update <ImCheckmark />
      </button>
    </div>
  );
};

export default PersonalDetails;
