import { Check } from 'lucide-react';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useStateContext } from '../../../src/context/ContextProvider';
import InputBoxStudent from '../utilities/InputBoxStudent';

const ChangePassword = () => {
  const [password, setPassword] = useState({
    current_password: '',
    new_password: '',
  });
  const { findCurrentUser } = useStateContext();

  const handleChange = (key, value) => {
    setPassword((prevInfo) => ({
      ...prevInfo,
      [key]: value,
    }));
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: findCurrentUser.email, // Ensure user is authenticated
          currentPassword: password.current_password,
          newPassword: password.new_password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: data.message,
          icon: 'success',
          confirmButtonText: 'Okay',
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: data.message || 'Something went wrong!',
          icon: 'error',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message || 'Something went wrong. Please try again.',
        icon: 'error',
      });
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
        id="new_password"
        type="password"
        func={handleChange}
      />
      <button
        onClick={handleUpdatePassword}
        className="w-full mt-5 px-4 py-3 bg-primary_btn text-white rounded flex items-center justify-center gap-2"
      >
        Update <Check />
      </button>
    </div>
  );
};

export default ChangePassword;
