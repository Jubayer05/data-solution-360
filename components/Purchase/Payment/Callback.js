import { Spin } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const BkashCallback = () => {
  const router = useRouter();
  const { paymentID, status, signature } = router.query;
  const accessToken = JSON.parse(sessionStorage.getItem('token'));

  useEffect(() => {
    const processPayment = async () => {
      // Check if paymentID, signature, and status are available and status is "success"
      if (paymentID && signature && status === 'success') {
        try {
          // Step 3: Execute Payment
          const executeResponse = await fetch('/api/bkash/execute-payment', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
              'X-APP-Key': process.env.NEXT_PUBLIC_BKASH_APP_KEY,
            },
            body: JSON.stringify({
              paymentID, // Use the paymentID from Step 2
            }),
          });

          const executeData = await executeResponse.json();

          if (executeResponse.ok) {
            router.push(`/purchase/payment-success?paymentID=${paymentID}`);
          } else {
            console.error('Error executing payment:', executeData.error);
            // Handle failure case here based on the payment status
            if (
              executeData.error &&
              executeData.error.includes('payment not successful')
            ) {
              console.log('Payment was not successful.');
              router.push(`/purchase/payment-failure?paymentID=${paymentID}`);
            } else {
              console.log('An unexpected error occurred.');
              router.push(`/purchase/payment-failure?paymentID=${paymentID}`);
            }
          }
        } catch (error) {
          console.error('Error processing payment:', error);
          // Redirect to failure page on catch block
          router.push(`/purchase/payment-failure?paymentID=${paymentID}`);
        }
      } else if (status === 'failed') {
        console.log('Payment failed, redirecting...');
        router.push(`/purchase/payment-failure?paymentID=${paymentID}`);
      } else {
        console.log('Payment details are not valid. Redirecting...');
        router.push(`/purchase/payment-failure?paymentID=${paymentID}`);
      }
    };

    processPayment();
  }, [paymentID, status, router, signature, accessToken]);

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
        <div className="flex items-center justify-center flex-col">
          <Spin size="large" />
          <div className="mt-4 text-lg text-gray-700">
            Redirecting based on payment status...
          </div>
        </div>
      </div>
    </div>
  );
};

export default BkashCallback;
