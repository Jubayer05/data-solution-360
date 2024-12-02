import { useEffect, useState } from 'react';
import Select from 'react-select';
import 'sweetalert2/dist/sweetalert2.css';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../../firebase';

import { serverTimestamp } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useStateContext } from '../../../src/context/ContextProvider';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';
import RichTextEditorJodit from '../../utilities/RichTextEditor/RichTextEditor';

const db = firebase.firestore();

const NewForm = () => {
  const { courseData } = useStateContext();
  const [courseDataObj, setCourseDataObj] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [whatsappGroupLink, setWhatsappGroupLink] = useState(null);
  const uniqueId = uuidv4().split('-')[0];
  const [formDetails, setFormDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  // NOTE: HANDLE CREATE NEW BATCH BUTTON
  const handleCreateNewBatch = () => {
    if (selectedCourse && whatsappGroupLink && formDetails) {
      setIsLoading(true); // Set loading state to true
      const newForm = {
        courseData: courseDataObj?.item_name,
        unique_form_id: uniqueId,
        whatsappGroupLink: whatsappGroupLink,
        formDetails: formDetails,
        form_status: 'active',
        total_students_registered: 0,
        subscribed_students: [],
        createdAt: serverTimestamp(),
      };

      db.collection('form_data')
        .add(newForm)
        .then(() => {
          setIsLoading(false); // Set loading state to false
          Swal.fire(
            'Form created!',
            'Your form has been created.',
            'success',
          ).then(() => {
            window.location.reload();
          });
        })
        .catch(() => {
          setIsLoading(false); // Set loading state to false
          Swal.fire(
            'Error!',
            'An error occurred while creating the form.',
            'error',
          );
        });
    } else {
      Swal.fire(
        'Warning!',
        'Please select a course, enter a WhatsApp group link, and provide form details.',
        'warning',
      );
    }
  };

  return (
    <div>
      <HeadingDashboard title="Create a new form" />
      <div className="max-w-3xl mx-auto my-20">
        <Link href="/admin/forms/form-data">
          <ButtonDashboard className="bg-tertiary_btn hover:bg-tertiary_btn hover:opacity-80 text-white">
            Visit all forms
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
            Enter WhatsApp group link
          </label>
          <input
            placeholder="Example - https://chat.whatsapp.com/invite..."
            className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
            type="text"
            id="batch_number"
            onChange={(e) => setWhatsappGroupLink(e.target.value)}
          />

          <RichTextEditorJodit
            onDataChange={setFormDetails}
            title="Form Description"
            // value={formDetails}
          />

          <div className="flex justify-center mt-10">
            <ButtonDashboard
              onClick={handleCreateNewBatch}
              className={`bg-secondary_btn text-white ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Create a new form'}
            </ButtonDashboard>
          </div>
        </div>

        <div className="border border-gray-300 shadow-lg rounded-lg p-6 mt-20 bg-white">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">
            Rules for Creating a New Form
          </h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>
              Select the course for which this form is being created to ensure
              students receive the correct content.
            </li>
            <li>
              You must provide a WhatsApp group link to ensure students can join
              for further updates and communication.
            </li>

            <li>
              Include detailed information about the purpose of the form, its
              requirements, and any specific instructions for students.
            </li>
            <li>
              Make sure the form is accessible only to students enrolled in the
              relevant batch.
            </li>
            <li>
              Students will not receive updates from other batches unless they
              re-enroll in those batches.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default NewForm;

const customStyles = {
  menu: (provided) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    padding: 20,
  }),
  control: () => ({
    display: 'flex',
    border: '1px solid #e5e5e5',
    padding: '5px 10px',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
  }),
};
