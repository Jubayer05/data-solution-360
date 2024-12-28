import Link from 'next/link';

export default function CompleteProfile({ onClose, onRegister }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      {/* Main Popup Container */}
      <div className="relative bg-gradient-to-tr from-purple-600 via-indigo-500 to-indigo-800 text-white rounded-3xl shadow-2xl p-6 sm:p-8 w-[90%] max-w-lg animate-fadeIn scale-95 hover:scale-100 transform transition-all duration-500 ease-in-out">
        {/* Title Section */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center animate-glow">
          ✨ Complete Your Profile Now!
        </h2>
        {/* Description */}
        <p className="text-sm sm:text-lg text-white/90 mb-6 sm:mb-8 leading-relaxed text-center">
          Please update your profile to proceed and ensure all your information
          is complete.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Link href="/students/dashboard">
            <button className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-yellow-400/50 text-sm sm:text-base">
              Complete Now
            </button>
          </Link>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-white/20 hover:bg-white/30 text-white font-medium rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
          >
            Maybe Later
          </button>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-4 left-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full shadow-md animate-bounce"></div>
        <div className="absolute -bottom-6 -right-6 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tl from-blue-500 to-cyan-500 rounded-full shadow-xl animate-spin-slow"></div>
      </div>
    </div>
  );
}
