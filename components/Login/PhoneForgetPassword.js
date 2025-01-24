import { ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import firebase from '../../firebase';

const ForgetPassword = () => {
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1);

  const formatPhoneNumber = (phoneNumberInput) => {
    return phoneNumberInput
      ?.replace(/\D/g, '')
      ?.replace(/^0/, '880')
      ?.replace(/^(?!880)/, '880');
  };

  const phoneNumber = formatPhoneNumber(phoneNumberInput);
  const phoneNumberEmail = `${phoneNumber}@datasolution360.com`;

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Check if user exists
      const userRecord = await firebase
        .auth()
        .fetchSignInMethodsForEmail(phoneNumberEmail);

      if (userRecord.length === 0) {
        setError('No account found with this phone number');
        return;
      }

      // Send OTP via API
      const res = await fetch('/api/otp/sendOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message);
        setStep(2);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/otp/verifyOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, inputOtp: otpCode }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message);
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

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Reauthenticate and reset password
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          phoneNumberEmail,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Password reset successfully');
        setTimeout(() => {
          window.location.href = '/login';
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
    <div className="max-w-md mx-auto pt-6 rounded-lg">
      {loading ? (
        <div className="animate-pulse bg-gray-200 w-full h-64 rounded-lg" />
      ) : (
        <>
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="mb-4 px-3 md:px-5">
              <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
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
                className="w-full bg-primary-bg text-white px-4 py-3 rounded-md hover:bg-[#d85403] transition duration-300 flex items-center justify-center gap-2"
              >
                Send OTP <ArrowRight />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="mb-4 px-3 md:px-5">
              <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
              <p>An OTP has been sent to {phoneNumberInput}</p>
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
                Verify OTP
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="mb-4 px-3 md:px-5">
              <h2 className="text-2xl font-bold mb-4">Set New Password</h2>
              <div className="my-4">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md"
                  placeholder="Enter new password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-bg text-white px-4 py-3 rounded-md hover:bg-[#d85403] transition duration-300 flex items-center justify-center gap-2"
              >
                Reset Password
              </button>
            </form>
          )}

          {error && <p className="text-red-500 text-sm px-3">{error}</p>}
          {success && <p className="text-green-500 text-sm px-3">{success}</p>}
        </>
      )}
    </div>
  );
};

export default ForgetPassword;
