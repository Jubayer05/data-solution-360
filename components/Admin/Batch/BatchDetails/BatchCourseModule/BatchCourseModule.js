import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import firebase from '../../../../../firebase';
import AddLiveClass from './AddLiveClass';

// Initialize Firestore
const db = firebase.firestore();

const options = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'running', label: 'Running' },
  { value: 'finished', label: 'Finished' },
];

const BatchCourseModule = () => {
  const router = useRouter();
  const { batchId, moduleId } = router.query; // Get query params from the URL
  const [moduleData, setModuleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState();

  useEffect(() => {
    if (batchId) {
      // Fetch course data by batchId
      const fetchCourseData = async () => {
        try {
          const courseRef = db.collection('course_data_batch').doc(batchId);
          const courseSnapshot = await courseRef.get();

          if (courseSnapshot.exists) {
            const courseData = courseSnapshot.data();
            const foundModule = courseData.course_modules.find(
              (module) => module.id === moduleId,
            );

            if (foundModule) {
              setModuleData(foundModule);
            } else {
              setErrorMessage('Module not found');
            }
          } else {
            setErrorMessage('Course not found');
          }
        } catch (error) {
          setErrorMessage('Error fetching course data: ' + error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchCourseData();
    }
  }, [batchId, moduleId]); // Re-run effect when batchId or moduleId changes

  const updateModuleInFirestore = async (updatedModuleData) => {
    try {
      // Reference to the Firestore document
      const courseRef = db.collection('course_data_batch').doc(batchId);
      const courseSnapshot = await courseRef.get();

      if (courseSnapshot.exists) {
        const courseData = courseSnapshot.data();

        // Find the module you want to update
        const updatedModules = courseData.course_modules.map((module) => {
          if (module.id === moduleId) {
            // Update the specific module (e.g., updating lessonsData)
            return {
              ...module,
              ...updatedModuleData, // Merge in the updated data for the module
            };
          }
          return module; // Return the unchanged modules
        });

        // Update the document with the modified modules array
        await courseRef.update({
          course_modules: updatedModules,
        });

        // Success alert
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Lessons updated successfully!',
        });
      } else {
        // Error alert for missing course
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Course not found.',
        });
      }
    } catch (error) {
      // Error alert for Firestore update failure
      Swal.fire({
        icon: 'error',
        title: 'Error updating module',
        text: error.message,
      });
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedStatus(selectedOption);
    const updatedModuleData = {
      ...moduleData,
      moduleStatus: selectedOption.value,
    };
    setModuleData(updatedModuleData);
    updateModuleInFirestore(updatedModuleData);
    // console.log(updatedModuleData);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return (
      <div className="max-w-5xl mx-auto my-20 p-4 bg-red-100 border border-red-400 text-red-700">
        <p>{errorMessage}</p>
      </div>
    );
  }

  console.log(moduleData);

  return (
    <div>
      <div className="max-w-6xl mx-auto my-20">
        <div className="flex-1 border-1 p-5 rounded-lg bg-white flex justify-between items-center">
          <div>
            <h2 className="text-xl text-[#231f40] font-medium font-dash_heading ">
              Module Name:{' '}
              <span className="text-primary">{moduleData?.moduleName}</span>
            </h2>
            <span>
              {moduleData?.moduleStatus === 'finished' ? (
                <span className="bg-green-50 border border-green-500 px-2 text-xs rounded-full font-semibold text-[#48bb78]">
                  Finished
                </span>
              ) : moduleData?.moduleStatus === 'running' ? (
                <span className="bg-blue-100 border border-blue-500 px-2 text-xs rounded-full font-semibold text-[#4299e1]">
                  Running
                </span>
              ) : moduleData?.moduleStatus === 'upcoming' ? (
                <span className="bg-purple-100 border border-purple-500 px-2 text-xs rounded-full font-semibold text-[#6b46c1]">
                  Upcoming
                </span>
              ) : (
                <span className="bg-purple-100 border border-purple-500 px-2 text-xs rounded-full font-semibold text-[#6b46c1]">
                  Upcoming
                </span>
              )}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-primary mb-2">
              Change module status
            </p>
            <Select
              id="status-select"
              value={selectedStatus}
              onChange={handleChange}
              options={options}
              placeholder="Running"
            />
          </div>
        </div>
        <AddLiveClass
          moduleData={moduleData}
          setModuleData={setModuleData}
          updateModuleInFirestore={updateModuleInFirestore}
        />
        {/* TODO: Add quiz segment */}

        {/* TODO: Add Live Class Each Lessons
         * Also update current live class
         * If live class is finished then show end live class
         */}
        {/* TODO: Add resource segment */}
        {/* TODO: Add class Recording segment */}
      </div>
    </div>
  );
};

export default BatchCourseModule;
