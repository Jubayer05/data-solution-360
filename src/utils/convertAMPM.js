export function convertToAMPM(time) {
  // Ensure the time is a valid string before splitting
  if (!time || typeof time !== 'string') {
    return ''; // Return an empty string or handle error case
  }

  // Split the time into hours and minutes
  let [hours, minutes] = time?.split(':');
  hours = parseInt(hours);

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12 || 12; // Convert '0' to '12' for midnight

  // Return formatted time with AM/PM
  return `${hours}:${minutes} ${ampm}`;
}
