import React, { useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import { useStateContext } from '../../../src/context/ContextProvider';
import HeadingDashboard from '../../utilities/HeadingDashboard';
import Academic from './Academic';
import BasicInfo from './BasicInfo';
import ContactInfo from './ContactInfo';

const Register = ({ title }) => {
  const { userEmail, findCurrentUser } = useStateContext();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [progressData, setProgressData] = useState(0);

  // const handleFileSubmit = (e) => {
  //   const fileSize = document.getElementById("photoUrl").files[0].size;
  //   const profileImg = e.target.files[0];

  //   if (fileSize < 512000) {
  //     const uploadTask = firebase
  //       .storage()
  //       .ref(`profileImage/${userEmail}/${profileImg?.name}`)
  //       .put(profileImg);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress = Math.round(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );

  //         setProgressData(progress);
  //       },
  //       (error) => {
  //         alert(error.message + "" + "Something went wrong");
  //       },
  //       () => {
  //         firebase
  //           .storage()
  //           .ref("profileImage")
  //           .child(userEmail)
  //           .child(profileImg?.name)
  //           .getDownloadURL()
  //           .then((url) => {
  //             // NOTE: use this url
  //             setPhotoUrl(url);
  //           });
  //       }
  //     );
  //   } else {
  //     alert("File Size must be under 500kb");
  //   }
  //   console.log(fileSize);
  // };

  return (
    <div>
      <HeadingDashboard title={title} />
      <BasicInfo />
      <ContactInfo />
      <Academic />
    </div>
  );
};

export default Register;
