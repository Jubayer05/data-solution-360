import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PageSkeleton = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 border-r-1">
        <Skeleton height={50} width={150} className="mb-6 rounded-md" />
        <Skeleton count={4} height={30} className="mb-4 rounded" />
        <Skeleton height={30} width={120} className="mt-4 rounded" />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-16 bg-white flex items-center px-4">
          <Skeleton height={40} width={200} className="rounded-md" />
          <div className="ml-auto flex items-center gap-4">
            <Skeleton circle={true} height={40} width={40} />
            <Skeleton height={20} width={100} className="rounded" />
          </div>
        </header>

        {/* Content Box */}
        <main className=" flex-1 p-6 bg-white">
          <div className="max-w-6xl mx-auto ">
            <Skeleton height={60} width="70%" className="mb-8 rounded-lg" />
            {/* Rows with mixed shapes */}
            <div className="grid grid-cols-3 gap-6">
              <Skeleton height={150} className="rounded-lg col-span-2" />
              <Skeleton height={150} className="rounded-lg" />
            </div>
            <Skeleton height={20} width="50%" className="my-6 rounded" />
            <div className="grid grid-cols-2 gap-6">
              <Skeleton height={200} className="rounded-lg" />
              <Skeleton height={200} className="rounded-lg" />
            </div>
            <Skeleton height={20} width="80%" className="my-6 rounded" />
            <Skeleton count={3} height={30} className="mb-3 rounded-md" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageSkeleton;
