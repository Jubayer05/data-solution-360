import { parseISO, subDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import ButtonDashboard from './dashboard/ButtonDashboard'; // Assuming you already have this component

const DataFilterComponent = ({ setFilteredData, data }) => {
  const [activeButton, setActiveButton] = useState('Today'); // Default button is 'Today'

  // Filter data whenever the active button changes
  useEffect(() => {
    if (!data) return; // Ensure data exists
    filterData(activeButton);
  }, [activeButton]); // Only depend on `activeButton`

  const filterData = (filterLabel) => {
    let dateLimit;

    // Get the current date
    const currentDate = new Date();

    // Determine the date limit based on the selected filter
    switch (filterLabel) {
      case 'Today':
        dateLimit = subDays(currentDate, 1);
        break;
      case '3 days':
        dateLimit = subDays(currentDate, 3);
        break;
      case '7 days':
        dateLimit = subDays(currentDate, 7);
        break;
      case '15 days':
        dateLimit = subDays(currentDate, 15);
        break;
      case '30 days':
        dateLimit = subDays(currentDate, 30);
        break;
      case 'All time':
      default:
        dateLimit = new Date(0); // Set to epoch to include all data
        break;
    }

    // Filter the data based on the createdAt date string
    const filtered = data.filter((item) => {
      if (!item?.createdAt) return false; // Skip items without a valid createdAt

      const itemDate = parseISO(item.createdAt); // Parse the createdAt date string to a Date object
      return itemDate >= dateLimit;
    });

    setFilteredData(filtered); // Set the filtered data to the parent component
  };

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        {/* Render the filter buttons */}
        {['Today', '3 days', '7 days', '15 days', '30 days', 'All time'].map(
          (label) => (
            <ButtonDashboard
              key={label}
              onClick={() => setActiveButton(label)} // Set the clicked button as active
              className={`py-2 px-4 rounded-md text-lg transition duration-200 border-2 ${
                activeButton === label
                  ? 'bg-blue-600 text-white border-blue-600' // Active button style (filled)
                  : 'bg-transparent text-blue-600 border-blue-600 hover:bg-blue-100' // Default outlined button style
              }`}
            >
              {label}
            </ButtonDashboard>
          ),
        )}
      </div>
    </div>
  );
};

export default DataFilterComponent;
