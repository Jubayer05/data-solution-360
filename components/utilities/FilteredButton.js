import { parseISO, subDays } from 'date-fns';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ButtonDashboard from './dashboard/ButtonDashboard';

const DataFilterComponent = ({ setFilteredData, data }) => {
  const [activeButton, setActiveButton] = useState('Today');
  const renderCount = useRef(0); // Track the render count

  // Memoized function to filter data
  const filterData = useCallback(
    (filterLabel, currentData) => {
      if (!currentData) return;

      const currentDate = new Date();
      let dateLimit;

      switch (filterLabel) {
        case 'Today':
          dateLimit = subDays(currentDate, 1);
          break;
        case 'All time':
        default:
          dateLimit = new Date(0);
          break;
      }

      const filtered = currentData.filter((item) => {
        if (!item?.createdAt) return false;
        const itemDate = parseISO(item.createdAt);
        return itemDate >= dateLimit;
      });

      setFilteredData(filtered);
    },
    [setFilteredData],
  );

  // Handle filtering for the first five renders
  useEffect(() => {
    if (renderCount.current < 4) {
      filterData(activeButton, data); // Run the filter logic
      renderCount.current += 1; // Increment the render count
    }
  }, [data, filterData, activeButton]); // Depend only on `data`, `filterData`, and `activeButton`

  // Handle button click explicitly
  const handleButtonClick = (label) => {
    if (activeButton !== label) {
      setActiveButton(label); // Update active button state
      filterData(label, data); // Trigger filtering
    }
  };

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        {['Today', 'All time'].map((label) => (
          <ButtonDashboard
            key={label}
            onClick={() => handleButtonClick(label)}
            className={`py-2 px-4 rounded-md text-lg transition duration-200 border-2 ${
              activeButton === label
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-transparent text-blue-600 border-blue-600 hover:bg-blue-100'
            }`}
          >
            {label}
          </ButtonDashboard>
        ))}
      </div>
    </div>
  );
};

export default React.memo(DataFilterComponent);
