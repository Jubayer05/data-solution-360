import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Lottie from 'react-lottie';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { v4 as uuidv4 } from 'uuid';
import firebase, { auth, handleAuthError } from '../../firebase';
import * as congratulationsData from '../../src/data/json/congratulations.json';
import * as animationData from '../../src/data/json/login_loading.json';

const db = firebase.firestore();

const PhoneAuth = ({ loginStatePhone, setLoginStatePhone }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1);

  const phoneNumberEmail = `${phoneNumber?.replace(
    /\D/g,
    '',
  )}@datasolution360.com`;

  // NOTE: HANDLE SET USER AND SEND CODE
  const handleCheckUserAndSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const methods = await auth.fetchSignInMethodsForEmail(phoneNumberEmail);
      if (methods.length > 0) {
        // User exists
        setStep(3); // Go to password input step
      } else {
        // User does not exist, send OTP
        const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          'recaptcha-container',
          {
            size: 'invisible',
          },
        );
        await recaptchaVerifier.render(); // Ensure reCAPTCHA is rendered

        const confirmationResult = await auth.signInWithPhoneNumber(
          phoneNumber,
          recaptchaVerifier,
        );
        console.log(confirmationResult);
        setVerificationId(confirmationResult.verificationId);
        setStep(2); // Go to verify code step
      }
    } catch (err) {
      setError(err.message);
      console.error('Error during user check and send code:', err);
    } finally {
      setLoading(false);
    }
  };

  // NOTE: HANDLE VERIFY CODE AND SET PASSWORD
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode,
      );
      const userCredential = await auth.signInWithCredential(credential);
      await userCredential.user.updateEmail(phoneNumberEmail);
      setStep(4); // Go to set password step
    } catch (err) {
      setError(err.message);
      console.error('Error during verify code:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const user = firebase.auth().currentUser;
      await user.updatePassword(password);
      setSuccess('Account created and password set successfully!');
      db.collection('users')
        .add({
          email: phoneNumberEmail,
          phone: phoneNumber,
          role: 'student',
          student_id: uuidv4().split('-')[0],
          enrolled_courses: [],
        })
        .then(() => {
          setStep(5); // Go to success step
        })
        .catch((err) => {
          setError('Cannot create account');
          console.error('Error creating account in Firestore:', err);
        });
    } catch (err) {
      setError(err.message);
      console.error('Error setting password:', err);
    } finally {
      setLoading(false);
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
      window.location.assign('/students/dashboard');
    } catch (err) {
      handleAuthError(err);
      console.error('Error during login:', err);
      // Swal.fire('Hey!', err.message, 'error');
      // setError(err.message);
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
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  country="US"
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
              <p>An OTP has been sent to this number {phoneNumber}</p>
              <div className="my-4">
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
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

          {step === 4 && (
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

          {step === 5 && success && (
            <div className="flex items-center justify-center flex-col">
              <Lottie options={congratulationsLottie} />
              <div className="max-w-md mx-auto p-6  text-center">
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
