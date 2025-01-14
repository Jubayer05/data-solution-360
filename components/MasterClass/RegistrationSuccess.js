import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';
import registration_success from '../../src/data/json/registration_success.json';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

const RegistrationSuccess = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: registration_success,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="py-20 flex flex-col justify-center items-center bg-gray-50 px-4 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg text-center">
        {/* Company Logo */}
        <div className="mb-6">
          <Image
            src="/logo/logo.png" // Replace with your logo path
            alt="Company Logo"
            width={150}
            height={50}
            className="mx-auto w-20"
          />
        </div>

        {/* Lottie Animation */}
        <div className="mb-6">
          <Lottie options={defaultOptions} />
        </div>

        {/* Thank You Heading */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-green-600">
            Thank You for Registering!
          </h1>
        </div>

        {/* Confirmation Text */}
        <div className="text-lg text-gray-700 mb-4">
          <p>Your registration has been successfully received.</p>
          <p>We are excited to have you on board!</p>
        </div>

        {/* Return to Dashboard Button */}
        <button
          onClick={() => (window.location.href = '/')}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Return to home page
        </button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
