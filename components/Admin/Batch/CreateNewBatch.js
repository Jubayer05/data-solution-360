import { useEffect, useState } from 'react';
import Select from 'react-select';
import 'sweetalert2/dist/sweetalert2.css';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../../firebase';

import { Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useStateContext } from '../../../src/context/ContextProvider';
import { loadData } from '../../../src/hooks/loadData';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';

const db = firebase.firestore();

const CreateNewBatch = () => {
  const { courseData } = useStateContext();
  const [courseDataObj, setCourseDataObj] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [batchNumber, setBatchNumber] = useState(null);
  const uniqueId = uuidv4().split('-')[0];
  const [instructor, setInstructor] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState([]);

  useEffect(() => {
    loadData('instructors', setInstructor);
  }, []);

  useEffect(() => {
    setCourseDataObj(selectedCourse);
  }, [selectedCourse]);

  // NOTE: SELECT COURSE
  const selectCourse = courseData.map((item) => ({
    label: (
      <div className="flex items-center gap-4">
        <Image
          width={500}
          height={300}
          className="w-16 h-12"
          src={item.img}
          alt={item.profileName}
        />
        <div>
          <p className="text-lg m-0">
            <strong>{item.item_name}</strong>
          </p>
        </div>
      </div>
    ),
    value: { ...item },
  }));

  const handleChange = (record) => {
    setSelectedCourse(record.value);
  };

  // NOTE: SELECT INSTRUCTOR
  const selectInstructor = instructor.map((item) => ({
    label: (
      <div className="flex items-center gap-4">
        <Image
          width={500}
          height={300}
          className="w-10 h-10 rounded-full"
          src={item.photoUrl}
          alt={item.profileName}
        />
        <div>
          <p className="text-lg m-0 font-semibold">{item.profileName}</p>
          <p className="ml-1 text-sm m-0">{item.jobTitle}</p>
        </div>
      </div>
    ),
    value: { ...item },
  }));

  const handleRemoveInstructor = (record) => {
    const updatedInstructors = selectedInstructor.filter(
      (item) => item.id !== record.id,
    );
    setSelectedInstructor(updatedInstructors);
  };

  const handleChangeInstructor = (record) => {
    if (
      selectedInstructor?.findIndex((item) => item?.id === record.value.id) ===
      -1
    ) {
      setSelectedInstructor([...selectedInstructor, record.value]);
    }
  };

  // NOTE: HANDLE CREATE NEW BATCH BUTTON
  const handleCreateNewBatch = async () => {
    if (selectedCourse && batchNumber && selectedInstructor.length !== 0) {
      const updatedCourse = {
        ...courseDataObj,
        unique_batch_id: uniqueId,
      };

      const newBatch = {
        courseData: { ...updatedCourse },
        unique_batch_id: uniqueId,
        batchNumber: batchNumber,
        course_modules: courseDataObj.courseModule,
        enrolled_students: [],
        instructors: selectedInstructor,
      };

      try {
        const courseDocRef = db
          .collection('course_data')
          .doc(selectedCourse.key);
        const batchDocRef = db.collection('course_data_batch').doc();

        const batch = db.batch();
        batch.update(courseDocRef, updatedCourse);
        batch.set(batchDocRef, newBatch);

        await batch.commit();

        Swal.fire(
          'Batch created!',
          'Your batch has been created.',
          'success',
        ).then(() => {
          window.location.reload();
        });
      } catch (error) {
        Swal.fire(
          'Error!',
          `Failed to create the batch: ${error.message}`,
          'error',
        );
      }
    } else {
      Swal.fire(
        'Warning!',
        'Please select a course first, enter a batch number and at least one instructor.',
        'warning',
      );
    }
  };

  return (
    <div>
      <HeadingDashboard title="Create a new batch" />
      <div className="max-w-3xl mx-auto my-20">
        <Link href="/admin/course/all-batch">
          <ButtonDashboard className="bg-tertiary_btn hover:bg-tertiary_btn hover:opacity-80 text-white">
            Visit all batches
          </ButtonDashboard>
        </Link>

        <div className="border-1 p-5 rounded-lg bg-white mt-10">
          <h2 className="text-xl pb-4 text-[#231f40] font-medium font-dash_heading ">
            <span className="font-bold">Select a course</span>
          </h2>

          <Select
            className="w-full"
            styles={customStyles}
            options={selectCourse}
            onChange={handleChange}
          />

          <label
            htmlFor="batch_number"
            className="font-semibold mt-3 block text-[#17012e]"
          >
            Enter batch number
          </label>
          <input
            placeholder="Example - 2401"
            className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
            type="text"
            id="batch_number"
            onChange={(e) => setBatchNumber(e.target.value)}
          />
          <p className="text-lg font-bold font-dash_heading mt-3 block text-[#17012e]">
            Instructors for the entire course
          </p>
          <div className="grid grid-cols-4 gap-5 mt-5">
            {selectedInstructor?.map((item) => (
              <div
                key={item.key}
                className="border-1 relative cursor-pointer group"
              >
                <button
                  type="button"
                  onClick={() => handleRemoveInstructor(item)}
                  className="absolute -top-3 -right-3 z-50 w-[28px] h-[28px] bg-white hover:bg-[#ff5722] 
                    rounded-full flex justify-center items-center border hover:text-white opacity-0 group-hover:opacity-100"
                >
                  <Trash className="text-red-500 cursor-pointer" />
                </button>
                <div className="p-3 ">
                  <Image
                    width={500}
                    height={300}
                    className="w-[120px] rounded-full h-[120px] mx-auto shadow border "
                    src={item?.photoUrl}
                    alt=""
                  />
                  <p className="text-gray-700 text-center mt-3 font-heading text-lg font-medium">
                    <span className="font-bold">{item?.profileName}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="font-semibold mt-3 block text-[#17012e]">
            Select Instructors for this batch
          </p>
          <Select
            className="w-full"
            styles={customStyles}
            options={selectInstructor}
            onChange={handleChangeInstructor}
          />

          <div className="flex justify-center mt-10">
            <ButtonDashboard
              onClick={handleCreateNewBatch}
              className="bg-secondary_btn hover:bg-secondary_btn hover:opacity-80 text-white"
            >
              Create a new batch
            </ButtonDashboard>
          </div>
        </div>

        <div className="border border-gray-300 shadow-lg rounded-lg p-6 mt-20 bg-white">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">
            Rules for Creating a New Batch
          </h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>
              Students will only have access to the content from the batch they
              are enrolled in.
            </li>
            <li>
              Students enrolled in a specific batch will not receive updates or
              content from other batches.
            </li>
            <li>
              Once enrolled, students will not receive new content added to
              other batches unless they re-enroll in those batches.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default CreateNewBatch;

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    padding: 20,
  }),
  control: (_, {}) => ({
    display: 'flex',
    border: '1px solid #e5e5e5',
    padding: '5px 10px',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
  }),
};
