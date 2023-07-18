import Link from 'next/link';
import React from 'react';
import Countdown from './CountDown';

const Discount = () => {
  const targetDate = new Date('2023-08-01T23:59:59');

  return (
    <div className="bg-green-600 sticky top-0 z-20">
      <Link href="/login">
        <a>
          <div className="flex justify-around text-center pt-3 pb-3 cursor-pointer">
            <Countdown targetDate={targetDate} />
            <h2 className="font-heading text-base text-white hover:underline">
              Signup Today and get 10% extra discount!
            </h2>
            <h2 className="font-heading text-base text-white hover:underline">
              Click Here
            </h2>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Discount;
