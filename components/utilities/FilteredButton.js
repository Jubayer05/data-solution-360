import {
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  format,
  getDay,
  isWithinInterval,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
} from 'date-fns';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ButtonDashboard from './dashboard/ButtonDashboard';

const Calendar = ({ onSelectDate, selectedDate }) => {
  // Calendar component remains unchanged
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const startDayOfMonth = getDay(startOfMonth(currentMonth));
  const blankDays = Array(startDayOfMonth).fill(null);

  const previousMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1),
    );
  };

  return (
    <div className="w-64 bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={previousMonth}
          className="text-gray-600 hover:text-gray-800"
        >
          ←
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={nextMonth}
          className="text-gray-600 hover:text-gray-800"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {blankDays.map((_, index) => (
          <div key={`blank-${index}`} className="h-8" />
        ))}

        {daysInMonth.map((date) => {
          const isSelected =
            selectedDate &&
            format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
          const isToday =
            format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

          return (
            <button
              key={date.toString()}
              onClick={() => onSelectDate(date)}
              className={`h-8 flex items-center justify-center rounded-full text-sm
                ${isSelected ? 'bg-blue-600 text-white' : ''}
                ${isToday && !isSelected ? 'bg-blue-100' : ''}
                ${!isSelected && !isToday ? 'hover:bg-gray-100' : ''}
              `}
            >
              {format(date, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const DataFilterComponent = ({ setFilteredData, data }) => {
  const [activeButton, setActiveButton] = useState('Today');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const autoRenderCount = useRef(0);
  const maxAutoRenders = 5;
  const isUserAction = useRef(false);

  const filterOptions = [
    'Today',
    'Yesterday',
    '3 Days',
    '7 Days',
    '15 Days',
    '1 Month',
    'This Month',
    'This Week',
    'All Time',
    'Calendar',
  ];

  const getFilterFunction = useCallback(
    (filterLabel, currentDate, date = null) => {
      switch (filterLabel) {
        case 'Today':
          const todayStart = startOfDay(currentDate);
          const todayEnd = endOfDay(currentDate);
          return (itemDate) =>
            isWithinInterval(itemDate, { start: todayStart, end: todayEnd });

        case 'Yesterday':
          const yesterday = subDays(currentDate, 1);
          const yesterdayStart = startOfDay(yesterday);
          const yesterdayEnd = endOfDay(yesterday);
          return (itemDate) =>
            isWithinInterval(itemDate, {
              start: yesterdayStart,
              end: yesterdayEnd,
            });

        case '3 Days':
          const threeDaysAgo = subDays(currentDate, 3);
          return (itemDate) => itemDate >= threeDaysAgo;

        case '7 Days':
          const sevenDaysAgo = subDays(currentDate, 7);
          return (itemDate) => itemDate >= sevenDaysAgo;

        case '15 Days':
          const fifteenDaysAgo = subDays(currentDate, 15);
          return (itemDate) => itemDate >= fifteenDaysAgo;

        case '1 Month':
          const thirtyDaysAgo = subDays(currentDate, 30);
          return (itemDate) => itemDate >= thirtyDaysAgo;

        case 'This Month':
          const monthStart = startOfMonth(currentDate);
          return (itemDate) => itemDate >= monthStart;

        case 'This Week':
          const weekStart = startOfWeek(currentDate);
          return (itemDate) => itemDate >= weekStart;

        case 'Calendar':
          if (date) {
            const calendarDayStart = startOfDay(date);
            const calendarDayEnd = endOfDay(date);
            return (itemDate) =>
              isWithinInterval(itemDate, {
                start: calendarDayStart,
                end: calendarDayEnd,
              });
          }
          return () => true;

        case 'All Time':
        default:
          return () => true;
      }
    },
    [],
  );

  const filterData = useCallback(() => {
    if (!data?.length) return;

    // Only increment counter for automatic renders
    if (!isUserAction.current) {
      autoRenderCount.current += 1;
      console.log(`Auto render count: ${autoRenderCount.current}`);
    }

    // Allow render if it's either user action or within auto render limit
    if (isUserAction.current || autoRenderCount.current <= maxAutoRenders) {
      const currentDate = new Date();
      const filterFn = getFilterFunction(
        activeButton,
        currentDate,
        selectedDate,
      );

      const filtered = data.filter((item) => {
        if (!item?.createdAt) return false;
        try {
          const itemDate = parseISO(item.createdAt);
          return filterFn(itemDate);
        } catch (error) {
          console.error('Error parsing date:', error);
          return false;
        }
      });

      setFilteredData(filtered);
    }
  }, [data, activeButton, selectedDate, getFilterFunction, setFilteredData]);

  // Handle initial data load and changes
  useEffect(() => {
    isUserAction.current = false;
    filterData();
  }, [data]);

  // Handle filter changes from user actions
  useEffect(() => {
    if (isUserAction.current) {
      filterData();
    }
  }, [activeButton, selectedDate]);

  const handleButtonClick = useCallback((label) => {
    isUserAction.current = true;
    setActiveButton(label);
    if (label === 'Calendar') {
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
      setSelectedDate(null);
    }
  }, []);

  const handleDateSelect = useCallback((date) => {
    isUserAction.current = true;
    setSelectedDate(date);
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        {filterOptions.map((label) => (
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

      {showCalendar && (
        <div className="mt-4">
          <Calendar
            onSelectDate={handleDateSelect}
            selectedDate={selectedDate}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(DataFilterComponent);
