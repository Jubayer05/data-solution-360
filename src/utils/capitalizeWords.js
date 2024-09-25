export function capitalizeWords(input) {
  // Check if input is valid
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
