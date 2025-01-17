import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import animationData from '../../../src/data/json/payment-cancelled.json'; // Path to your Lottie JSON file
const LottieAnimation = dynamic(
  () => import('../../utilities/Home/LottieAnimation'),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-gray-200 w-full h-64 rounded-lg" />
    ), // Loading placeholder
  },
);

const PaymentFailure = () => {
  const router = useRouter();
  const { paymentID } = router.query;

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="min-h-screen py-10 flex flex-col justify-center items-center bg-gray-50 px-4">
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
          <LottieAnimation animationData={animationData} />
        </div>

        {/* Payment Failed Heading */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-red-600">Payment Failed</h1>
        </div>
        <p className="text-gray-600 mb-4">
          Unfortunately, your payment could not be processed.
        </p>
        {paymentID && (
          <p className="text-gray-500">
            <span className="font-semibold">Payment ID:</span> {paymentID}
          </p>
        )}

        <button
          onClick={() => router.push('/')}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure;
