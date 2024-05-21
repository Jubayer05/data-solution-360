import React, { useEffect, useState } from 'react';

const Countdown = ({ targetDate }) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Format the countdown string
      const countdownString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      // Update the countdown state
      setCountdown(countdownString);

      // If the target date is reached, clear the interval
      if (distance < 0) {
        clearInterval(interval);
        setCountdown('Countdown finished');
      }
    }, 1000);

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [targetDate]);

  return (
    <div className="text-white">
      <h2 className="font-heading text-base text-white flex items-center">
        <span className="font-normal text-xs md:text-sm">
          Expires in: &nbsp;
        </span>{' '}
        {targetDate ? (
          <span className="text-base md:text-xl"> {countdown}</span>
        ) : (
          0
        )}
      </h2>
    </div>
  );
};

export default Countdown;
