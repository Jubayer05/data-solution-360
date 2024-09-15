import { useEffect, useState } from 'react';
import Select from 'react-select';
import 'sweetalert2/dist/sweetalert2.css';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../../firebase';

import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useStateContext } from '../../../src/context/ContextProvider';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';

const db = firebase.firestore();

const CreateNewBatch = () => {
  const { courseData, userEmail } = useStateContext();
  const [courseDataObj, setCourseDataObj] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [batchNumber, setBatchNumber] = useState(null);

  const uniqueId = uuidv4().split('-')[0];

  useEffect(() => {
    setCourseDataObj(selectedCourse);
  }, [selectedCourse]);

  // console.log(courseDataObj);

  const selectInstructor = courseData.map((item) => ({
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
            <strong>{item.title}</strong>
          </p>
          <p>{item.unique_batch_id}</p>
        </div>
      </div>
    ),
    value: { ...item },
  }));

  const handleChange = (record) => {
    setSelectedCourse(record.value);
  };

  const handleCreateNewBatch = () => {
    if (selectedCourse && batchNumber) {
      const updatedCourse = {
        ...courseDataObj,
        unique_batch_id: uniqueId,
      };

      const newBatch = {
        courseData: { ...courseDataObj },
        unique_batch_id: uniqueId,
        batchNumber: batchNumber,
        course_modules: courseDataObj.courseModule,
        enrolled_students: [],
      };

      db.collection('course_data')
        .doc(selectedCourse.key)
        .update(updatedCourse);
      db.collection('course_data_batch')
        .add(newBatch)
        .then(() => {
          Swal.fire(
            'Batch created!',
            'Your batch has been created.',
            'success',
          ).then(() => {
            window.location.reload();
          });
        });
    } else {
      Swal.fire('Warning!', 'Please select a course first.', 'warning');
    }
  };

  return (
    <div>
      <HeadingDashboard title="Create a new batch" />
      <div className="max-w-3xl mx-auto my-20">
        <Link href="/admin/course/all-batch">
          <ButtonDashboard className="bg-tertiary_btn hover:bg-tertiary_btn hover:opacity-80 text-white">
            {/* <FaArrowLeft /> */}
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
            options={selectInstructor}
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

          <div className="flex justify-center mt-10">
            <ButtonDashboard
              onClick={handleCreateNewBatch}
              className="bg-secondary_btn hover:bg-secondary_btn hover:opacity-80 text-white"
            >
              {/* <FaArrowLeft /> */}
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
