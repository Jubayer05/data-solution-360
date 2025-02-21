import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { v4 as uuidv4 } from 'uuid';

const LottieAnimation = dynamic(
  () => import('../../utilities/Home/LottieAnimation.js'),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-gray-200 w-full h-64 rounded-lg" />
    ), // Loading placeholder
  },
);

import axios from 'axios';
import { ClipboardCopy, UserCheck } from 'lucide-react';
import 'react-phone-number-input/style.css';
import Swal from 'sweetalert2';

const AddForeignStudent = () => {
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fullName, setFullName] = useState('');
  const [copied, setCopied] = useState(false);
  const DEFAULT_PASSWORD = '123456#ds360';

  const formatPhoneNumber = (phoneNumberInput) => {
    return phoneNumberInput?.replace(/^\+/, '');
  };

  const phoneNumberEmail = `${formatPhoneNumber(
    phoneNumberInput,
  )}@datasolution360.com`;

  const handleSetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!phoneNumberInput || !fullName) {
      setError('Please enter a phone number and full name.');
      return;
    }

    try {
      await axios.post('/api/auth/signup', {
        email: phoneNumberEmail,
        password: DEFAULT_PASSWORD,
        fullName,
        phoneNumber: phoneNumberInput,
        student_id: uuidv4().split('-')[0],
      });
      Swal.fire('Success', 'User has been added successfully.', 'success').then(
        () => {
          window.location.reload();
        },
      );
      setLoading(false); // Stop loading
    } catch (error) {
      setSuccess('An error occurred. Please try again.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(DEFAULT_PASSWORD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2s
  };

  return (
    <div className="max-w-md mx-auto pt-6 rounded-lg  px-3 md:px-8 md:py-10 border-1 bg-white">
      <div className="relative max-w-xl p-5 bg-white rounded-xl shadow-sm border-1">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-mono text-base text-gray-700 truncate font-semibold">
            Password:{' '}
            <span className="text-[orangered] font-bold text-sm">
              {DEFAULT_PASSWORD}
            </span>
          </h2>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <ClipboardCopy size={16} />
            <span className="font-medium text-sm">
              {copied ? 'Copied' : 'Copy'}
            </span>
          </button>
        </div>
      </div>
      <form onSubmit={handleSetPassword} className="mb-4">
        <h2 className="mt-2 text-[16px] md:text-[18px] font-bold">
          Your Phone Number
        </h2>
        <div className="mb-4 flex gap-2">
          <PhoneInput
            placeholder="Enter phone number"
            value={phoneNumberInput}
            onChange={setPhoneNumberInput}
          />
        </div>
        <h2 className="mt-2 text-[16px] md:text-[18px] font-bold">Full Name</h2>
        <div className="mb-5">
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full px-3 py-3 text-base md:text-lg border border-gray-300 rounded-md"
            placeholder="Enter your full name"
          />
        </div>
        <h2 className="text-sm font-bold mb-6">{phoneNumberEmail}</h2>
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-3 rounded-md 
              hover:bg-green-700 transition duration-300 flex items-center 
              justify-center gap-2 md:text-lg"
        >
          Add User <UserCheck />
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-sm text-center font-semibold">
          {error}
        </p>
      )}
    </div>
  );
};

export default AddForeignStudent;
