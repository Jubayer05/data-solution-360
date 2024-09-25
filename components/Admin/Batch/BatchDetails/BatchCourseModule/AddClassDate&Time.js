import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import ButtonDashboard from '../../../../utilities/dashboard/ButtonDashboard';
import InputBox from '../../../Course/InputBox';

const AddClassDateAndTime = ({
  moduleData,
  setModuleData,
  updateModuleInFirestore,
  indexLesson,
  currentLesson,
  setCurrentLesson,
}) => {
  const [classDate, setClassDate] = useState('');
  const [classTime, setClassTime] = useState('');

  // Update the current lesson with classDate and classTime changes
  useEffect(() => {
    setCurrentLesson({
      ...moduleData.lessons[indexLesson],
      classDate,
      classTime,
    });
  }, [classDate, classTime, moduleData, indexLesson, setCurrentLesson]);

  const handleSubmit = () => {
    if (classDate !== '' && classTime !== '') {
      const updatedModuleData = {
        ...moduleData,
        lessons: moduleData.lessons.map((lesson) =>
          lesson.id === currentLesson.id ? currentLesson : lesson,
        ),
      };
      setModuleData(updatedModuleData);
      updateModuleInFirestore(updatedModuleData);
      setClassDate('');
      setClassTime('');
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Please enter both a valid class date and class time.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  };

  return (
    <div className="bg-white border-1 p-5 rounded-lg mt-5">
      <h2 className="text-lg pb-2 text-[#2ecc71] text-center font-medium font-dash_heading">
        Class Date and Time
      </h2>

      {/* Class Date Input */}
      <div className="flex gap-3 items-end">
        <InputBox
          className="py-1"
          title="Enter Class Date"
          type="date"
          value={classDate}
          func={(e) => setClassDate(e.target.value)}
        />
      </div>

      {/* Class Time Input */}
      <div className="flex gap-3 items-end mt-3">
        <InputBox
          className="py-1"
          title="Enter Class Time"
          type="time"
          value={classTime}
          func={(e) => setClassTime(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-5">
        <ButtonDashboard
          onClick={handleSubmit}
          className="bg-primary_btn hover:bg-[#002346bc] text-white py-2.5"
        >
          Submit
        </ButtonDashboard>
      </div>
    </div>
  );
};

export default AddClassDateAndTime;
