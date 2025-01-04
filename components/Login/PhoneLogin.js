import { serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { v4 as uuidv4 } from 'uuid';
import firebase, { auth, handleAuthError } from '../../firebase';
import * as congratulationsData from '../../src/data/json/congratulations.json';
import * as animationData from '../../src/data/json/login_loading.json';

const db = firebase.firestore();

const PhoneAuth = ({ loginStatePhone, setLoginStatePhone }) => {
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');

  const formatPhoneNumber = (phoneNumberInput) => {
    const normalizedPhoneNumber = phoneNumberInput
      ?.replace(/\D/g, '') // Remove all non-digit characters
      ?.replace(/^0/, '880') // Replace leading '0' with '880'
      ?.replace(/^(?!880)/, '880'); // If it doesn't start with '880', add it

    return normalizedPhoneNumber;
  };

  const phoneNumber = formatPhoneNumber(phoneNumberInput);
  const phoneNumberEmail = `${phoneNumber}@datasolution360.com`;

  // NOTE: HANDLE SET USER AND SEND CODE
  const handleCheckUserAndSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous error
    setSuccess(''); // Clear any previous success message
    try {
      // Check if the user already exists in Firebase Auth using phoneNumberEmail
      const userRecord = await firebase
        .auth()
        .fetchSignInMethodsForEmail(phoneNumberEmail);

      if (userRecord.length > 0) {
        // If user exists, go directly to login
        setStep(4); // Skip OTP and proceed to login step
        setSuccess('User found! Please enter your password to login.');
      } else {
        // If user does not exist, send OTP for account creation
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

  const handleSetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    let user = firebase.auth().currentUser;

    if (!user) {
      // If no user is signed in, create a new user with email and password
      auth
        .createUserWithEmailAndPassword(phoneNumberEmail, password)
        .then((newUserCredential) => {
          user = newUserCredential.user;

          // Show success message for account creation
          setSuccess('Account created successfully!');

          // Add user details to Firestore
          return db.collection('users').add({
            full_name: fullName,
            email: phoneNumberEmail,
            phone: phoneNumber,
            role: 'student',
            student_id: uuidv4().split('-')[0],
            enrolled_courses: [],
            createdAt: serverTimestamp(),
          });
        })
        .then((userDocRef) => {
          if (userDocRef.id) {
            setStep(6); // Proceed to success step
          } else {
            setError('Failed to add user to the database.');
          }
        })
        .catch((err) => {
          if (err.code === 'auth/email-already-in-use') {
            setError('This email is already registered.');
          } else if (err.code === 'auth/weak-password') {
            setError('The password is too weak.');
          } else {
            setError(err.message);
          }
          console.error('Error creating account or adding user:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // NOTE: HANDLE LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await auth.signInWithEmailAndPassword(phoneNumberEmail, password);
      window.location.reload();
    } catch (err) {
      handleAuthError(err);
      console.error('Error during login:', err);
    } finally {
      setLoading(false);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const congratulationsLottie = {
    loop: true,
    autoplay: true,
    animationData: congratulationsData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="max-w-md mx-auto pt-6 rounded-lg">
      <div id="recaptcha-container" className=""></div>
      {loading ? (
        <Lottie options={defaultOptions} />
      ) : (
        <>
          {step === 1 && (
            <form
              onSubmit={handleCheckUserAndSendCode}
              className="mb-4 px-3 md:px-5"
            >
              <h2 className="-mt-4 text-[22px] md:text-[26px] font-bold">
                Email / Phone Number
              </h2>
              <div className="mb-4">
                <PhoneInput
                  className="w-full pt-5 pb-1"
                  placeholder="Enter phone number"
                  value={phoneNumberInput}
                  onChange={setPhoneNumberInput}
                  country="BD"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-bg text-white px-4 py-3 rounded-md 
                hover:bg-[#d85403] transition duration-300 flex items-center 
                justify-center gap-2 md:text-lg"
              >
                Next Step <FaArrowRight />
              </button>

              <p className="text-center text-sm mt-3">
                {loginStatePhone
                  ? ' Or Login with Email and Password'
                  : 'Or Login with Phone Number'}
              </p>
              <div className="mt-2">
                <button
                  onClick={() => setLoginStatePhone(!loginStatePhone)}
                  type="submit"
                  className="w-full bg-[#f7d5c0] border-[#fd6404] border-2 px-4 py-3 rounded-md
                   hover:bg-[#f5b993] transition duration-300 flex items-center justify-center 
                   gap-2 text-base md:text-lg font-semibold"
                >
                  {loginStatePhone ? 'Login with Email' : 'Login with Phone'}{' '}
                  <FaArrowRight />
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
                Next Step <FaArrowRight />
              </button>
            </form>
          )}
          {step === 4 && (
            <form onSubmit={handleLogin} className="mb-4 px-3 md:px-5">
              <h2 className="-mt-4 text-[26px] font-bold">
                Enter your password
              </h2>
              <p>Enter your password for login your profile.</p>
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
              {congratulationsLottie ? (
                <Lottie options={congratulationsLottie} />
              ) : (
                <p>Congratulations!</p>
              )}
              <div className="max-w-md mx-auto p-6 text-center">
                <p className="text-base my-4 text-green-600">
                  Your account has been successfully created.
                </p>
                <button
                  onClick={() => (window.location.href = '/students/dashboard')}
                  className="w-full bg-primary-bg text-white px-4 py-3 rounded-md hover:bg-[#d85403] transition duration-300 flex items-center justify-center gap-2 text-base md:text-lg"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </>
      )}
    </div>
  );
};

export default PhoneAuth;
