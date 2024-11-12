import { useEffect, useState } from 'react';

function useIsToday(dateString) {
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const checkIfToday = () => {
      const inputDate = new Date(dateString);
      const today = new Date();

      return (
        inputDate.getFullYear() === today.getFullYear() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getDate() === today.getDate()
      );
    };

    setIsToday(checkIfToday());
  }, [dateString]);

  return isToday;
}

export default useIsToday;
