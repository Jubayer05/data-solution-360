import { Checkbox } from 'antd';
import { convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../../firebase';

// Dynamic import of the Editor component from react-draft-wysiwyg
const Editor = dynamic(
  () => {
    return import('react-draft-wysiwyg').then((mod) => mod.Editor);
  },
  { ssr: false },
);

// CSS styles for the Editor component
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Swal from 'sweetalert2';
import { useStateContext } from '../../../src/context/ContextProvider';
import AddInstructorCourse from './AddInstructorCourse';
import InputBox from './InputBox';

// Initial state for the course data
const initialCourseState = {
  title: '',
  img: '',
  short_description: '',
  price: '',
  discounted_price: '',
  total_seat_number: '',
  batch_no: '',
  class_time: '',
  orientation_class: '',
  main_class_starting_date: '',
  who_is_the_course_for: '',
  after_course_benefit: '',
  join_link: '',
};

// Date options for formatting
const options = { year: 'numeric', month: 'long', day: 'numeric' };

const AddCourse = () => {
  const { userEmail } = useStateContext();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [convertContent, setConvertedContent] = useState(null);
  const [courseData, setCourseData] = useState(initialCourseState);
  const [courseModule, setCourseModule] = useState([]);
  const [instructors, setInstructors] = useState([]);

  // Handler for changes in the editor content
  const handleEditorChange = (state) => {
    setEditorState(state);

    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  // Plain options for checkboxes
  const plainOptions = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  // Handler for input changes
  const handleInputChange = (key, value) => {
    const updatedObject = {
      ...courseData,
      [key]: value,
    };
    setCourseData(updatedObject);
  };

  // Course short point description data
  const courseShortData = [
    { name: 'Point No - 1', value: '' },
    { name: 'Point No - 2', value: '' },
    { name: 'Point No - 3', value: '' },
    { name: 'Point No - 4', value: '' },
    { name: 'Point No - 5', value: '' },
    { name: 'Point No - 6', value: '' },
    { name: 'Point No - 7', value: '' },
    { name: 'Point No - 8', value: '' },
    { name: 'Point No - 9', value: '' },
  ];

  // Handler for file submission
  const handleFileSubmit = (e) => {
    const fileSize = document.getElementById('photoUrl').files[0].size;
    const courseImg = e.target.files[0];

    if (fileSize < 1024000) {
      const uploadTask = firebase
        .storage()
        .ref(`courseImage/${userEmail}/${courseImg?.name}`)
        .put(courseImg);
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          alert(error.message + '' + 'Something went wrong');
        },
        () => {
          firebase
            .storage()
            .ref('courseImage')
            .child(userEmail)
            .child(courseImg?.name)
            .getDownloadURL()
            .then((url) => {
              // NOTE: use this url
              setCourseData({ ...courseData, img: url });
            });
        },
      );
    } else {
      alert('File Size must be under 1mb');
    }
  };

  // Handler for form submission
  const handleSubmit = () => {
    console.log(courseData, userEmail);

    if (courseData.title != '') {
      firebase
        .firestore()
        .collection('course_data')
        .add({
          ...courseData,
          id: uuidv4().split('-')[0],
          details: convertContent,
          courseModule,
          instructors,
          courseShortData,
          createdAt: new Date().toLocaleDateString(undefined, options),
          status: false,
        })
        .then(() => {
          Swal.fire(
            'Success!',
            'Your course is added successfully.',
            'success',
          ).then(() => {
            setCourseData(initialCourseState);
            window.location.reload();
          });
        })
        .catch((error) => {
          Swal.fire('Error!', 'Something went wrong.', 'error');
        });
    } else {
      Swal.fire('Warning!', 'A Title and a image is required!', 'warning');
    }
  };

  return (
    <div className="flex justify-center items-center flex-col my-10">
      <div className="w-3/4 bg-white shadow-lg border-1 p-10 rounded-lg">
        <h2 className="text-2xl pb-2 text-[#2ecc71] text-center font-medium font-dash_heading">
          Add a New Course
        </h2>
        {/* Title Input */}
        <InputBox
          title="Title"
          id="title"
          func={handleInputChange}
          placeholder="Example - Beginner to advanced power bi course"
          type="text"
        />

        {/* Image Upload */}
        <div className="mt-4">
          <label
            htmlFor="photoUrl"
            className="font-semibold block text-[#17012e]"
          >
            Course Image
          </label>
          <input
            id="photoUrl"
            onChange={handleFileSubmit}
            type="file"
            className="w-full px-4 py-2 text-lg outline-none border mt-1.5 rounded"
          />
        </div>

        {/* Short Description */}
        <InputBox
          title="Short Description"
          id="shortDescription"
          func={handleInputChange}
          placeholder="Example - This course is specially designed for..."
          type="text"
        />

        {/* Pricing Section */}
        <div className="grid gap-4 grid-cols-2 mt-4">
          <InputBox
            title="Price"
            id="price"
            func={handleInputChange}
            placeholder="Example - 1500"
            type="number"
          />
          <InputBox
            title="Discounted price"
            id="discountedPrice"
            placeholder="Example - 1000"
            func={handleInputChange}
            type="number"
          />
        </div>

        {/* Class Details */}
        <div className="grid gap-4 grid-cols-3 mt-4">
          <InputBox
            title="Total Seat Number"
            id="totalSeatNumber"
            func={handleInputChange}
            placeholder="Example - 40"
            type="number"
          />
          <InputBox
            title="Batch No"
            id="batchNumber"
            func={handleInputChange}
            placeholder="Example - 05"
            type="number"
          />
          <InputBox
            title="Class Time"
            id="classTime"
            placeholder="Example - 9pm - 11pm"
            func={handleInputChange}
            type="text"
          />
        </div>

        <div className="grid gap-4 grid-cols-3 mt-4">
          <InputBox
            title="Orientation Class"
            id="orientationClass"
            func={handleInputChange}
            type="date"
          />
          <InputBox
            title="Main class starting date"
            id="mainClassStartingDate"
            func={handleInputChange}
            type="date"
          />
          <div>
            <label className="font-semibold mt-8 block">Class Day</label>
            <Checkbox.Group
              options={plainOptions}
              onChange={(e) => handleInputChange('class_days', e)}
            />
          </div>
        </div>

        <InputBox
          title="Who is the course for"
          id="classTime"
          placeholder="Example - for all students who want to learn power bi"
          func={handleInputChange}
          type="text"
          className="mt-4"
        />

        <InputBox
          title="After Course Benefit"
          id="classTime"
          placeholder="Example - scope of internships"
          func={handleInputChange}
          type="text"
          className="mt-4"
        />

        <AddInstructorCourse
          instructors={instructors}
          setInstructors={setInstructors}
          className="mt-6"
        />

        {/* Course Description */}
        <p className="font-semibold mt-6">Course Description</p>
        <div className="w-full border-1 p-3 bg-white rounded mt-2">
          <Editor
            editorState={editorState}
            editorStyle={{ minHeight: '140px' }}
            toolbarClassName="toolbarClassName"
            wrapperClassName="demoWrapper"
            editorClassName="editorClassName"
            onEditorStateChange={handleEditorChange}
          />
        </div>

        <InputBox
          title="Drive Link"
          id="driveLink"
          placeholder="https://drive.google.com/file/xyz"
          func={handleInputChange}
          type="text"
          className="mt-4"
        />

        <InputBox
          title="Join Link"
          id="joinLink"
          placeholder="https://facebook.com/file/xyz"
          func={handleInputChange}
          type="text"
          className="mt-4"
        />

        {/* <AddModule
          courseModule={courseModule}
          setCourseModule={setCourseModule}
          className="mt-6"
        /> */}

        <div className="border-1 mt-5 py-6 px-3 rounded-lg bg-[#f0f0f0]">
          <p className="text-lg font-semibold text-[#17012e]">
            Add minimum 7 course details in point{' '}
            <span className="italic text-[orangered]">(required)</span>
          </p>
          <div className="grid gap-4 grid-cols-3">
            {courseShortData?.map((item) => (
              <div key={item.name}>
                <label
                  htmlFor={item.name}
                  className="font-semibold block text-[#17012e]"
                >
                  {item.name}
                </label>
                <input
                  key={item.name}
                  id={item.name}
                  onChange={(e) => (item.value = e.target.value)}
                  type="text"
                  className="w-full px-4 py-2 text-lg outline-none border-1 mt-1.5 rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full text-center pt-5 pb-8">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
