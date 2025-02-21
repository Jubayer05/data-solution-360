import { ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import firebase from '../../firebase';
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
import * as animationData from '../../src/data/json/login_loading.json';
const db = firebase.firestore();

const ForgetPassword = ({ state, setState }) => {
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1);

  const formatPhoneNumber = (phoneNumberInput) => {
    const normalizedPhoneNumber = phoneNumberInput
      ?.replace(/\D/g, '') // Remove all non-digit characters
      ?.replace(/^0/, '880') // Replace leading '0' with '880'
      ?.replace(/^(?!880)/, '880'); // If it doesn't start with '880', add it

    return normalizedPhoneNumber;
  };

  const phoneNumber = formatPhoneNumber(phoneNumberInput);
  const phoneNumberEmail = `${phoneNumber}@datasolution360.com`;

  const handleRequestReset = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/request-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: phoneNumberEmail }),
      });

      const data = await res.json();

      console.log(data);
      if (res.ok) {
        setSuccess('Reset instructions sent to your email');
        setResetToken(data.resetToken); // In production, this would come via email
        setStep(2);
      } else {
        setError(data.message || 'Failed to send reset instructions');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // NOTE: SENT OTP
  const handleSendOTP = async (e) => {
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
          const res = await fetch('/api/otp/sendOtp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber }),
          });
          const data = await res.json();
          console.log(data);
          if (res.ok) {
            setSuccess('OTP sent to your phone!');
            setStep(2);
          } else {
            setError(data.message || 'Failed to send OTP');
          }
        }
      } else {
        setError('User not found! Please try again.');
      }
    } catch (err) {
      console.log(err);
      setError('Error during sending OTP or checking user: ' + err.message); // Catch request errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // NOTE: VERIFY OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/otp/verifyOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          inputOtp: otpCode,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        await handleRequestReset();
        setSuccess('OTP verified successfully!');
        setStep(3);
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // NOTE: HANDLE RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resetToken,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Password reset successfully');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setError(data.message || 'Password reset failed');
      }
    } catch (err) {
      setError('Error resetting password: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto pt-6 rounded-lg">
      {loading ? (
        <LottieAnimation animationData={animationData} />
      ) : (
        <>
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="mb-4 px-3 md:px-5 w-full">
              <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
              <div className="mb-4">
                <input
                  type="text"
                  id="phoneNumberInput"
                  value={phoneNumberInput}
                  onChange={(e) => setPhoneNumberInput(e.target.value)}
                  className="mt-1 block w-full px-3 py-3 text-base md:text-lg border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="01711223344"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-bg text-white px-4 py-3 rounded-md hover:bg-[#d85403] transition duration-300 flex items-center justify-center gap-2"
              >
                Send OTP <ArrowRight />
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

          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="mb-4 px-3 md:px-5">
              <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
              <p className="mb-4 text-gray-600">
                Please enter the OTP sent to {phoneNumber}
              </p>
              <div className="my-4">
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md"
                  placeholder="Enter OTP"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-bg text-white px-4 py-3 rounded-md hover:bg-[#d85403] transition duration-300 flex items-center justify-center gap-2"
              >
                Verify OTP <ArrowRight />
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="mb-4 px-3 md:px-5">
              <h2 className="text-2xl font-bold mb-4">Set New Password</h2>
              <p className="mb-4 text-gray-600">
                Please enter your new password below.
              </p>
              <div className="my-4">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md"
                  placeholder="Enter new password"
                  minLength="6"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-bg text-white px-4 py-3 rounded-md hover:bg-[#d85403] transition duration-300 flex items-center justify-center gap-2"
              >
                Reset Password <ArrowRight />
              </button>
            </form>
          )}

          <p className="text-red-500 text-sm text-center font-semibold">
            {error}
          </p>
          {success && (
            <p className="text-green-500 text-sm text-center font-semibold">
              {success}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default ForgetPassword;
