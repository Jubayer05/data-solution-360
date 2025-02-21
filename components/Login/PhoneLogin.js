import React, { useState } from 'react';

import dynamic from 'next/dynamic';
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
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import firebase from '../../firebase';
import * as animationData from '../../src/data/json/login_loading.json';
import ForgetPassword from './PhoneForgetPassword.js';

const db = firebase.firestore();

const PhoneLogin = ({ state, setState }) => {
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState(null);

  const formatPhoneNumber = (phoneNumberInput) => {
    if (!phoneNumberInput) return ''; // Handle empty input safely

    const cleanedNumber = phoneNumberInput.replace(/\D/g, ''); // Remove all non-numeric characters

    // If the number starts with a country code (like 880, 1, 44, etc.), return it as is.
    if (/^\d{2,}/.test(cleanedNumber)) {
      return cleanedNumber;
    }

    // If there's no country code, default to Bangladesh (880)
    return `880${cleanedNumber}`;
  };

  const phoneNumber = formatPhoneNumber(phoneNumberInput);
  const phoneNumberEmail = `${phoneNumber}@datasolution360.com`;

  const handleCheckUserValid = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous error
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
          setStep(4); // Skip OTP and proceed to login step
        }
      } else {
        setError('User not found! Please try again.');
      }
    } catch (err) {
      setError('Error during sending OTP or checking user: ' + err.message); // Catch request errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // NOTE: HANDLE LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/auth/login', {
        email: phoneNumberEmail,
        password: password,
      });
      window.location.reload(); // Redirect to a protected page
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
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
            <form onSubmit={handleCheckUserValid} className="mb-4 px-3 md:px-5">
              <h2 className="-mt-2 text-[18px] md:text-[20px] font-bold">
                Your Phone Number
              </h2>
              <div className="mb-4 flex gap-2">
                <PhoneInputWithCountrySelect
                  placeholder="Enter phone number"
                  value={phoneNumberInput}
                  onChange={setPhoneNumberInput}
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

              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={() => setState('email_login')}
                  className="text-primary-bg hover:text-[#d85403] text-sm font-medium"
                >
                  {state == 'phone_login' || state == 'phone_signup'
                    ? 'Or Login with Email'
                    : 'Or Login with Phone Number'}
                </button>

                <button
                  onClick={() => setStep(7)}
                  className="text-primary-bg hover:text-[#d85403] text-sm font-medium"
                >
                  Forgot Password?
                </button>
              </div>
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

          {error && (
            <p className="text-red-500 text-sm text-center font-semibold">
              {error}
            </p>
          )}
        </>
      )}
      {step === 7 && <ForgetPassword state={state} setState={setState} />}
    </div>
  );
};

export default PhoneLogin;
