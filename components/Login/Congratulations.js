import { CheckCircle2 } from 'lucide-react';
import React from 'react';

const ConfettiParticle = ({ x, y, color, delay, duration }) => (
  <div
    className="absolute w-2 h-2 transform rotate-45"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      backgroundColor: color,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      animation: 'fall linear infinite',
    }}
  />
);

const Congratulations = () => {
  const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#A8DADC', '#457B9D'];

  const generateConfetti = () => {
    return Array.from({ length: 50 }).map((_, index) => ({
      x: Math.random() * 100,
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 2,
    }));
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-6 w-full h-64 overflow-hidden">
      <style>{`
        @keyframes fall {
          to {
            transform: translate(50px, 100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      <CheckCircle2 size={96} className="text-green-500 mb-4 animate-pulse" />

      <h2 className="text-2xl font-bold text-green-700 mb-2">
        Congratulations!
      </h2>

      <p className="text-gray-600 text-center">
        Your account has been successfully created.
      </p>

      {generateConfetti().map((particle, index) => (
        <ConfettiParticle key={index} {...particle} />
      ))}
    </div>
  );
};

export default Congratulations;
