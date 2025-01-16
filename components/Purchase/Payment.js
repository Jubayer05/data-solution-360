import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useStateContext } from '../../src/context/ContextProvider';

const Payment = ({ payableAmount, batchData }) => {
  const [amount, setAmount] = useState(10);
  const [bkashURL, setBkashURL] = useState(null);
  const { findCurrentUser } = useStateContext();
  const [loading, setLoading] = useState(false); // Loading state

  const handlePayment = async () => {
    setLoading(true); // Start loading
    sessionStorage.setItem('currentCourse', JSON.stringify(batchData));
    sessionStorage.setItem('findCurrentUser', JSON.stringify(findCurrentUser));
    try {
      if (findCurrentUser?.student_id) {
        // Step 1: Generate Grant Token
        const tokenResponse = await fetch('/api/bkash/grant-token', {
          method: 'POST',
        });
        const tokenData = await tokenResponse.json();
        const { token: id_token } = tokenData;

        sessionStorage.setItem('token', JSON.stringify(id_token));

        // Step 2: Create Payment
        const createResponse = await fetch('/api/bkash/create-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${id_token}`, // Correct Authorization header
          },
          body: JSON.stringify({
            token: id_token,
            amount,
            additionalInfo: {
              id: batchData?.id,
              unique_batch_id: batchData?.unique_batch_id,
              studentId: findCurrentUser.student_id,
            },
          }),
        });

        const createData = await createResponse.json();

        if (createResponse.ok) {
          const { bkashURL } = createData;
          setBkashURL(bkashURL); // Redirect to bKash
        } else {
          console.error('Error creating payment:', createData.error);
          Swal.fire('Error!', 'Payment creation failed.', 'error');
        }
      } else {
        Swal.fire(
          'Dear user!',
          'Please login first to complete the payment',
          'error',
        );
      }
    } catch (error) {
      console.error('Error during payment:', error.message);
      Swal.fire('Error!', 'An error occurred during payment.', 'error');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (bkashURL) {
      window.location.href = bkashURL;
    }
  }, [bkashURL]);

  useEffect(() => {
    if (payableAmount) {
      setAmount(payableAmount);
    }
  }, [payableAmount]);

  return (
    <div>
      <p className="text-base font-bold">Payment Method</p>
      <div className="flex justify-center items-center border mt-3 p-2 rounded-md border-primary">
        <Image
          width={300}
          height={200}
          src="/payment/bkash_payment_logo.png"
          className="w-[200px]"
          alt=""
        />
      </div>
      <div className="w-full flex justify-between mt-8">
        <p className="font-semibold">Total Payment</p>
        <p className="text-lg text-gray-600 flex items-center font-bold">
          ৳&nbsp;{payableAmount}
        </p>
      </div>
      <button
        onClick={handlePayment}
        className={`bg-primary-bg text-[#f9fbff] w-full py-[12px] px-[24px] 
                    rounded-[8px] mt-4 hover:opacity-[0.8] transition-all font-semibold ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Processing...' : 'Complete Payment'}
      </button>
    </div>
  );
};

export default Payment;
