import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import Swal from 'sweetalert2';
import { useStateContext } from '../../src/context/ContextProvider';

const Payment = ({ payableAmount, batchData }) => {
  const [amount, setAmount] = useState(10);
  const [bkashURL, setBkashURL] = useState(null); // State to hold the bKash URL
  const { findCurrentUser } = useStateContext();

  const handlePayment = async () => {
    try {
      if (findCurrentUser?.student_id) {
        // Step 1: Create Payment
        const createResponse = await fetch('/api/bkash/create-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            additionalInfo: {
              id: batchData?.id,
              unique_batch_id: batchData?.unique_batch_id,
              studentId: findCurrentUser.student_id,
            },
          }),
        });

        const createData = await createResponse.json();

        console.log('Create Payment Response:', createResponse.ok); // Debugging response

        if (createResponse.ok) {
          const { bkashURL } = createData; // Extract bKash URL and payment ID
          setBkashURL(bkashURL); // Set the bKash URL to state
        } else {
          console.error('Error creating payment:', createData.error);
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
          <TbCurrencyTaka />
          {payableAmount}
        </p>
      </div>
      <button
        onClick={handlePayment}
        className="bg-primary-bg text-[#f9fbff] w-full py-[12px] px-[24px] 
                    rounded-[8px] mt-4 hover:opacity-[0.8] transition-all font-semibold"
      >
        Complete Payment
      </button>
    </div>
  );
};

export default Payment;
