import Link from 'next/link';

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Unauthorized</h1>
        <p className="text-gray-700 mb-6">
          You do not have permission to view this page.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 text-white visited:text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
