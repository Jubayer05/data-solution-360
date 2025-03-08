import { useState } from 'react';

const FreeResources = ({ item }) => {
  const iconSet = [
    '⚡',
    '🚀',
    '📚',
    '💡',
    '🎯',
    '🌟',
    '🔥',
    '💻',
    '📖',
    '🎓',
    '🧠',
    '⌨️',
    '📊',
    '🔍',
    '📝',
    '🎮',
    '💡',
    '🎥',
    '🔧',
    '📢',
    '📐',
    '✍️',
    '📜',
    '🎯',
    '📆',
    '🧩',
    '🏆',
    '📌',
    '🔑',
  ];

  // Function to get a random icon
  const getRandomIcon = () =>
    iconSet[Math.floor(Math.random() * iconSet.length)];

  // Sample resources data
  const resources = item?.map((resource) => ({
    ...resource,
    icon: getRandomIcon(),
  })); // Assign random icons

  // State to track if resources are visible
  const [showResources, setShowResources] = useState(false);

  // Toggle resources visibility
  const toggleResources = () => {
    setShowResources((prev) => !prev);
  };

  return (
    <div className="mb-10 bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl shadow-lg border border-blue-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-8">
          <button
            onClick={toggleResources}
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
          >
            <span className="font-semibold text-lg">
              Free Learning Resources
            </span>
            <svg
              className={`ml-3 w-5 h-5 transform transition-transform duration-500 group-hover:translate-y-1 ${
                showResources ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${
            showResources
              ? 'max-h-screen opacity-100 transform translate-y-0'
              : 'max-h-0 opacity-0 transform -translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources?.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-center">
                  <span className="text-4xl">{resource.icon}</span>
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="font-bold text-xl text-gray-800 mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {resource.description}
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <a
                    href={resource.links}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-3 bg-indigo-600 text-white visited:text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                  >
                    Access Resource
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>More resources coming soon. Check back regularly for updates!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeResources;
