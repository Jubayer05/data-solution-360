export function formatDate(dateString) {
  if (!dateString) {
    return 'Date unavailable'; // Default message if date is missing
  }

  // Create a Date object from the input string
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date)) {
    return 'Date unavailable'; // Default message if date is invalid
  }

  // Array of month names
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Extract day, month, and year from the date
  const day = date.getDate();
  const month = monthNames[date.getMonth()]; // getMonth() returns 0-based index
  const year = date.getFullYear();

  // Return the formatted date string
  return `${day} ${month}, ${year}`;
}

export function formatDateWithoutYear(dateString) {
  if (!dateString) {
    return 'Date unavailable'; // Default message if date is missing
  }

  // Create a Date object from the input string
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date)) {
    return 'Date unavailable'; // Default message if date is invalid
  }

  // Array of month names
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Extract day and month from the date
  const day = date.getDate();
  const month = monthNames[date.getMonth()]; // getMonth() returns 0-based index

  // Return the formatted date string
  return `${day} ${month}`;
}

export function calculateDaysBetween(start, end) {
  if (!start || !end) {
    return 'Date unavailable'; // Default message if either date is missing
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  // Check if both dates are valid
  if (isNaN(startDate) || isNaN(endDate)) {
    return 'Date unavailable'; // Default message if either date is invalid
  }

  // Calculate the difference in milliseconds
  const differenceInTime = endDate - startDate;

  // Calculate the difference in days
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  // Add 1 to include both start and end date in the count
  return differenceInDays + 1;
}

export function getFullDayName(abbreviatedDay) {
  const days = {
    Sat: 'Saturday',
    Sun: 'Sunday',
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
  };

  // Return the full name or the original input if not found
  return days[abbreviatedDay] || abbreviatedDay;
}

export function isToday(dateString) {
  const inputDate = new Date(dateString);
  const today = new Date();

  return (
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate()
  );
}

export function getTimeDifference(givenTime) {
  const [givenHour, givenMinute] = givenTime.split(':').map(Number);

  // Get the current time
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Create Date objects for the current time and given time, on the same date
  const currentTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    currentHour,
    currentMinute,
  );
  const targetTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    givenHour,
    givenMinute,
  );

  // Calculate the difference in milliseconds
  const differenceMs = targetTime - currentTime;

  // Convert milliseconds to minutes
  const differenceMinutes = Math.floor(differenceMs / 60000);

  return differenceMinutes;
}
