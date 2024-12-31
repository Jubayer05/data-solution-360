import { differenceInMilliseconds, parse } from 'date-fns';
import React, { useEffect, useState } from 'react';

const CouponCountdown = ({ couponData }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!couponData.isActive) return;

    const calculateTimeRemaining = () => {
      const now = new Date();

      // Parse the validUntil date string into a Date object
      const validUntilDate = parse(
        couponData.validUntil,
        'yyyy-MM-dd',
        new Date(),
      );

      // Calculate the difference between the current time and the validUntil date
      const difference = differenceInMilliseconds(validUntilDate, now);

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, [couponData.validUntil, couponData.isActive]);

  if (!couponData.isActive) return null;

  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-4 px-6 top-0 w-full z-[50] shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold">
            🎉 Special Offer! Use Code{' '}
            <span className="bg-white text-green-600 px-2 py-1 rounded-lg font-mono">
              {couponData.code}
            </span>
          </p>
          <p className="text-sm">
            Enjoy {couponData.discount}% off your purchase. Don&apos;t miss out!
          </p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-sm font-semibold">Hurry! Offer ends in:</p>
          <div className="flex justify-center md:justify-end space-x-2 mt-2">
            <div className="flex flex-col items-center bg-white text-green-600 px-3 py-2 rounded-lg">
              <span className="text-lg font-bold">{timeRemaining.days}</span>
              <span className="text-xs">Days</span>
            </div>
            <div className="flex flex-col items-center bg-white text-green-600 px-3 py-2 rounded-lg">
              <span className="text-lg font-bold">{timeRemaining.hours}</span>
              <span className="text-xs">Hours</span>
            </div>
            <div className="flex flex-col items-center bg-white text-green-600 px-3 py-2 rounded-lg">
              <span className="text-lg font-bold">{timeRemaining.minutes}</span>
              <span className="text-xs">Minutes</span>
            </div>
            <div className="flex flex-col items-center bg-white text-green-600 px-3 py-2 rounded-lg">
              <span className="text-lg font-bold">{timeRemaining.seconds}</span>
              <span className="text-xs">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCountdown;
