import React, { useState } from 'react';
import { ImCheckmark } from 'react-icons/im';
import Swal from 'sweetalert2';
import firebase, { auth } from '../../../firebase';
import InputBoxStudent from '../utilities/InputBoxStudent';

const ChangePassword = () => {
  const [password, setPassword] = useState({
    current_password: '',
    new_password: '',
  });

  const handleChange = (key, value) => {
    setPassword((prevInfo) => ({
      ...prevInfo,
      [key]: value,
    }));
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (user && user.email) {
      try {
        // Reauthenticate the user
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          password.current_password,
        );
        await user.reauthenticateWithCredential(credential);

        // Update the password
        await user.updatePassword(password.new_password);
        Swal.fire({
          title: 'Dear User!',
          text: 'Your Account Password Changed Successfully!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } catch (err) {
        Swal.fire(
          'Dear User!',
          'Wrong Password! Try again with correct password.',
          'error',
        );
      }
    } else {
      Swal.fire(
        'Dear User!',
        'You are not authenticated. Try again with correct password.',
        'error',
      );
    }
  };
  return (
    <div>
      <InputBoxStudent
        value={password?.current_password}
        title="Current Password"
        id="current_password"
        type="password"
        func={handleChange}
      />
      <InputBoxStudent
        value={password?.new_password}
        title="New Password"
        id="alternative_Email"
        type="password"
        func={handleChange}
      />
      <button
        onClick={handleUpdatePassword}
        className="w-full mt-5 px-4 py-3 bg-primary_btn text-white rounded flex items-center justify-center gap-2"
      >
        Update <ImCheckmark />
      </button>
    </div>
  );
};

export default ChangePassword;
