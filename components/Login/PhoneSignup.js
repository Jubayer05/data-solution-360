import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const LottieAnimation = dynamic(
  () => import('../utilities/Home/LottieAnimation.js'),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-gray-200 w-full h-64 rounded-lg" />
    ), // Loading placeholder
  },
);

import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import 'react-phone-number-input/style.css';
import firebase from '../../firebase.js';
import * as animationData from '../../src/data/json/login_loading.json';
import Congratulations from './Congratulations.js';

const db = firebase.firestore();

const PhoneSignup = ({ state, setState }) => {
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [userData, setUserData] = useState(null);

  const formatPhoneNumber = (phoneNumberInput) => {
    const normalizedPhoneNumber = phoneNumberInput
      ?.replace(/\D/g, '') // Remove all non-digit characters
      ?.replace(/^0/, '880') // Replace leading '0' with '880'
      ?.replace(/^(?!880)/, '880'); // If it doesn't start with '880', add it

    return normalizedPhoneNumber;
  };

  const phoneNumber = formatPhoneNumber(phoneNumberInput);
  const phoneNumberEmail = `${phoneNumber}@datasolution360.com`;

  function isValidEmail(email) {
    const regex = /^8801\d{9}@datasolution360\.com$/;
    return regex.test(email);
  }

  // NOTE: HANDLE SET USER AND SEND CODE
  const handleCheckUserAndSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous error

    if (!isValidEmail(phoneNumberEmail)) {
      setError('Invalid phone number');
      setLoading(false);
      return;
    }
    try {
      // Check if the user already exists in Firebase Auth using phoneNumberEmail
      const usersRef = db.collection('users');
      const snapshot = await usersRef
        .where('email', '==', phoneNumberEmail)
        .get();

      if (!snapshot.empty) {
        const userData = snapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID
          ...doc.data(), // Extract user data
        }));

        if (userData.length > 0) {
          setUserData(userData[0]);
          setError('User already exists. Please Login');
        }
      } else {
        setStep(3); // Proceed to OTP verification step
        const res = await fetch('/api/otp/sendOtp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phoneNumber }), // Send phoneNumber in request body
        });

        const data = await res.json();

        if (res.ok) {
          setSuccess(data.message); // Show success message
          setStep(2); // Proceed to OTP verification step
        } else {
          setError(data.message || 'Failed to send OTP'); // Handle errors
        }
      }
    } catch (err) {
      setError('Error during sending OTP or checking user: ' + err.message); // Catch request errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // NOTE: HANDLE VERIFY CODE AND SET PASSWORD
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/otp/verifyOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, inputOtp: otpCode }), // Send OTP for verification
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message); // Show success message
        setStep(3); // Proceed to set fullname step
      } else {
        setError(data.message || 'Invalid OTP, please try again'); // Show error if OTP is invalid
      }
    } catch (err) {
      setError('Error during OTP verification: ' + err.message); // Handle request errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await axios.post('/api/auth/signup', {
        email: phoneNumberEmail,
        password,
        fullName,
        phoneNumber,
        student_id: uuidv4().split('-')[0],
      });

      setLoading(false); // Stop loading
      setStep(6);
    } catch (error) {
      setSuccess('An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto pt-6 rounded-lg">
      <div id="recaptcha-container" className=""></div>
      {loading ? (
        <LottieAnimation animationData={animationData} />
      ) : (
        <>
          {step === 1 && (
            <form
              onSubmit={handleCheckUserAndSendCode}
              className="mb-4 px-3 md:px-5"
            >
              <h2 className="-mt-2 text-[18px] md:text-[20px] font-bold">
                Your Phone Number
              </h2>
              <div className="my-4 flex gap-2">
                <input
                  type="text"
                  id="phoneNumberInput"
                  value="+88"
                  className="mt-1 flex-[17%] block w-full px-3 py-3 text-base md:text-lg border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  disabled
                />
                <input
                  type="text"
                  id="phoneNumberInput"
                  value={phoneNumberInput}
                  onChange={(e) => setPhoneNumberInput(e.target.value)}
                  className="mt-1 flex-[83%] block w-full px-3 py-3 text-base md:text-lg border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="01711223344"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-bg text-white px-4 py-3 rounded-md 
              hover:bg-[#d85403] transition duration-300 flex items-center 
              justify-center gap-2 md:text-lg"
              >
                Next Step <ArrowRight />
              </button>

              <div className="flex justify-center items-center mt-3">
                <button
                  onClick={() => setState('email_login')}
                  className="text-primary-bg hover:text-[#d85403] text-sm font-medium"
                >
                  {state == 'phone_login' || state == 'phone_signup'
                    ? 'Or Login with Email'
                    : 'Or Login with Phone Number'}
                </button>
              </div>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="mb-4 px-3 md:px-5">
              <h2 className="-mt-4 text-[26px] font-bold">Enter OTP</h2>
              <p>An OTP has been sent to this number {phoneNumberInput}</p>
              <div className="my-4">
                <input
                  type="text"
                  id="otpCode"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="mt-1 block w-full px-3 py-3 text-base md:text-lg border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter verification code"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-bg text-white px-4 py-3 rounded-md hover:bg-[#d85403] 
            transition duration-300 flex items-center justify-center gap-2 text-lg"
              >
                Verify Code
              </button>
            </form>
          )}
          {step === 3 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(5);
              }}
              className="mb-4 px-3 md:px-5"
            >
              <h2 className="-mt-4 text-[26px] font-bold">Full Name</h2>
              <div className="my-4">
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 block w-full px-3 py-3 text-base md:text-lg border border-gray-300 rounded-md"
                  placeholder="Enter your full name"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-bg text-white px-4 py-3 rounded-md hover:bg-[#d85403] 
            transition duration-300 flex items-center justify-center gap-2 text-lg"
              >
                Next Step <ArrowRight />
              </button>
            </form>
          )}

          {step === 5 && (
            <form onSubmit={handleSetPassword} className="mb-4 px-3 md:px-5">
              <h2 className="-mt-4 text-[26px] font-bold">Set password</h2>
              <p>Enter a strong password for your profile.</p>
              <div className="my-4">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-3 text-base md:text-lg border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-bg text-white px-4 py-3 rounded-md hover:bg-[#d85403] 
            transition duration-300 flex items-center justify-center gap-2 text-lg"
              >
                Submit
              </button>
            </form>
          )}

          {step === 6 && (
            <div className="flex items-center justify-center flex-col">
              <Congratulations />
              <div className="max-w-md mx-auto p-6 text-center">
                <button
                  onClick={() => setState('phone_login')}
                  className="w-full bg-primary-bg text-white px-4 py-3 rounded-md hover:bg-[#d85403] transition duration-300 flex items-center justify-center gap-2 text-base md:text-lg"
                >
                  Login Now
                </button>
              </div>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm text-center font-semibold">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PhoneSignup;
