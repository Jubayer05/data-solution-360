import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import ButtonDashboard from '../../../../utilities/dashboard/ButtonDashboard';
import InputBox from '../../../Course/InputBox';

const AddResourceRecording = ({
  moduleData,
  setModuleData,
  updateModuleInFirestore,
  indexLesson,
  currentLesson,
  setCurrentLesson,
}) => {
  const [resourceLink, setResourceLink] = useState('');
  const [recordingLink, setRecordingLink] = useState('');

  useEffect(() => {
    if (resourceLink === '') {
      setCurrentLesson({
        ...moduleData.lessons[indexLesson],
      });
    } else {
      setCurrentLesson({
        ...moduleData.lessons[indexLesson],
        resourceLink: resourceLink,
      });
    }
  }, [moduleData, indexLesson, resourceLink, setCurrentLesson]);

  useEffect(() => {
    if (recordingLink === '') {
      setCurrentLesson({
        ...moduleData.lessons[indexLesson],
      });
    } else {
      setCurrentLesson({
        ...moduleData.lessons[indexLesson],
        recordingLink: recordingLink,
      });
    }
  }, [moduleData, indexLesson, recordingLink, setCurrentLesson]);

  const handleAddResource = () => {
    if (resourceLink !== '') {
      const updatedModuleData = {
        ...moduleData,
        lessons: moduleData.lessons.map((lesson) =>
          lesson.id === currentLesson.id ? currentLesson : lesson,
        ),
      };
      setModuleData(updatedModuleData);
      updateModuleInFirestore(updatedModuleData);
      setResourceLink('');
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Please enter a valid resource link.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  };

  const handleAddRecording = () => {
    if (recordingLink !== '') {
      const updatedModuleData = {
        ...moduleData,
        lessons: moduleData.lessons.map((lesson) =>
          lesson.id === currentLesson.id ? currentLesson : lesson,
        ),
      };
      setModuleData(updatedModuleData);
      updateModuleInFirestore(updatedModuleData);
      setRecordingLink('');
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Please enter a valid resource link.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  };

  return (
    <div>
      <div className="bg-white border-1 p-5 rounded-lg mt-5">
        <h2 className="text-lg pb-2 text-[#d35400] text-center font-medium font-dash_heading ">
          Resources / Course Materials
        </h2>
        <div className="flex gap-3 items-end">
          <InputBox
            className="py-1"
            title="Enter Resources Google Drive Link"
            value={resourceLink}
            func={(e) => setResourceLink(e.target.value)}
          />
          <ButtonDashboard
            onClick={handleAddResource}
            className="bg-primary_btn hover:bg-[#002346bc] text-white py-2.5"
          >
            Submit
          </ButtonDashboard>
        </div>
      </div>

      <div className="bg-white border-1 p-5 rounded-lg mt-5">
        <h2 className="text-lg pb-2 text-[#3498db] text-center font-medium font-dash_heading ">
          Class Recording
        </h2>
        <div className="flex gap-3 items-end">
          <InputBox
            className="py-1"
            title="Enter class recording link"
            value={recordingLink}
            func={(e) => setRecordingLink(e.target.value)}
          />
          <ButtonDashboard
            onClick={handleAddRecording}
            className="bg-primary_btn hover:bg-[#002346bc] text-white py-2.5"
          >
            Submit
          </ButtonDashboard>
        </div>
      </div>
    </div>
  );
};

export default AddResourceRecording;
