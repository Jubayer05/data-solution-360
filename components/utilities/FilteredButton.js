import {
  Button,
  Card,
  ConfigProvider,
  DatePicker,
  Radio,
  Typography,
} from 'antd';
import {
  endOfDay,
  isWithinInterval,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
} from 'date-fns';
import {
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  Calendar as CalendarIcon,
  CalendarRange,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  History,
  InfinityIcon,
} from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const { RangePicker } = DatePicker;
const { Title } = Typography;

const FilterOption = ({ icon, label, isSelected }) => (
  <div className="flex items-center gap-2">
    {React.cloneElement(icon, {
      size: 16,
      className: `${isSelected ? 'text-white' : 'text-blue-600'}`,
    })}
    <span className={`${isSelected ? 'text-white' : 'text-blue-600'}`}>
      {label}
    </span>
  </div>
);

const DataFilterComponent = ({ setFilteredData, data }) => {
  const [activeButton, setActiveButton] = useState('Today');
  const [dateRange, setDateRange] = useState(null);
  const autoRenderCount = useRef(0);
  const maxAutoRenders = 5;
  const isUserAction = useRef(false);

  const filterOptions = [
    { label: 'Today', icon: <Clock />, key: 'Today' },
    { label: 'Yesterday', icon: <History />, key: 'Yesterday' },
    { label: '3 Days', icon: <CalendarClock />, key: '3 Days' },
    { label: '7 Days', icon: <CalendarCheck />, key: '7 Days' },
    { label: '15 Days', icon: <CalendarDays />, key: '15 Days' },
    { label: '1 Month', icon: <CalendarIcon />, key: '1 Month' },
    { label: 'This Month', icon: <CalendarRange />, key: 'This Month' },
    { label: 'This Week', icon: <CalendarCheck />, key: 'This Week' },
    { label: 'All Time', icon: <InfinityIcon />, key: 'All Time' },
    { label: 'Custom Range', icon: <CalendarRange />, key: 'Date Range' },
  ];

  const getFilterFunction = useCallback(
    (filterLabel, currentDate, customDateRange = null) => {
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

        case 'Date Range':
          if (customDateRange?.length === 2) {
            const [start, end] = customDateRange;
            const rangeStart = startOfDay(start.toDate());
            const rangeEnd = endOfDay(end.toDate());
            return (itemDate) =>
              isWithinInterval(itemDate, {
                start: rangeStart,
                end: rangeEnd,
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

    if (!isUserAction.current) {
      autoRenderCount.current += 1;
    }

    if (isUserAction.current || autoRenderCount.current <= maxAutoRenders) {
      const currentDate = new Date();
      const filterFn = getFilterFunction(activeButton, currentDate, dateRange);

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
  }, [data, activeButton, dateRange, getFilterFunction, setFilteredData]);

  useEffect(() => {
    isUserAction.current = false;
    filterData();
  }, [data]);

  useEffect(() => {
    if (isUserAction.current) {
      filterData();
    }
  }, [activeButton, dateRange]);

  const handleFilterChange = useCallback((value) => {
    isUserAction.current = true;

    console.log(value);

    setActiveButton(value);
    if (value !== 'Date Range') {
      setDateRange(null);
    }
  }, []);

  const handleDateRangeChange = useCallback((dates) => {
    isUserAction.current = true;
    setDateRange(dates);
  }, []);

  const theme = {
    token: {
      colorPrimary: '#2563eb',
      colorSuccess: '#16a34a',
      colorWarning: '#d97706',
      colorError: '#dc2626',
      colorInfo: '#2563eb',
      borderRadius: 8,
      controlHeight: 40,
    },
    components: {
      Radio: {
        buttonBg: '#ffffff',
        buttonCheckedBg: '#2563eb',
        buttonColor: '#2563eb',
        buttonSolidCheckedColor: '#ffffff',
        buttonCheckedBorderColor: '#2563eb',
      },
    },
  };

  return (
    <ConfigProvider theme={theme}>
      <Card
        className="shadow-lg rounded-lg border-0"
        bodyStyle={{ padding: '24px' }}
      >
        <Title level={5} className="mb-6 text-gray-700">
          Date Filter
        </Title>

        <div className="space-y-6">
          <Radio.Group
            value={activeButton}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="w-full"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {filterOptions.map(
                ({ label, icon, key }) => (
                  console.log(activeButton, key),
                  (
                    <Radio.Button
                      key={key}
                      value={key}
                      className={`
                    h-12 flex items-center justify-center
                    transition-all duration-200 ease-in-out
                    hover:border-blue-600 hover:text-blue-600 
                    ${
                      activeButton !== key
                        ? 'bg-white border-gray-200'
                        : 'bg-blue-600 border-blue-600'
                    }
                  `}
                    >
                      <FilterOption
                        icon={icon}
                        label={label}
                        isSelected={activeButton === key}
                      />
                    </Radio.Button>
                  )
                ),
              )}
            </div>
          </Radio.Group>

          {activeButton === 'Date Range' && (
            <div className="flex items-center gap-4">
              <RangePicker
                value={dateRange}
                onChange={handleDateRangeChange}
                format="MMM D, YYYY"
                className="w-full md:w-auto"
                size="large"
                suffixIcon={<ChevronDown size={16} className="text-gray-400" />}
                prevIcon={<ChevronLeft size={16} />}
                nextIcon={<ChevronRight size={16} />}
                placeholder={['Start Date', 'End Date']}
              />
              {dateRange && (
                <Button
                  type="text"
                  danger
                  onClick={() => setDateRange(null)}
                  className="flex items-center"
                >
                  Clear
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>
    </ConfigProvider>
  );
};

export default React.memo(DataFilterComponent);
