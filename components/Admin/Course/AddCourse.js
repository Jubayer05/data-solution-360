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
import { useStateContext } from '../../../src/context/ContextProvider';
import HeadingDashboard from '../../utilities/HeadingDashboard';
import AddInstructorCourse from './AddInstructorCourse';
import AddModule from './AddModule';
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

  console.log(courseModule);

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
    if (
      convertContent !== null &&
      courseShortData?.filter((item) => item.value !== '').length >= 7 &&
      courseData.title != '' &&
      courseData.img != '' &&
      courseData.short_description != '' &&
      courseData.price != '' &&
      courseData.discounted_price != '' &&
      courseData.total_seat_number != '' &&
      courseData.batch_no != '' &&
      courseData.class_time != '' &&
      courseData.orientation_class != '' &&
      courseData.main_class_starting_date != '' &&
      courseData.who_is_the_course_for != '' &&
      courseData.after_course_benefit != ''
    ) {
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
        })
        .then(() => {
          alert('Course Data was successfully uploaded.');
          setCourseData(initialCourseState);
          window.location.reload();
        })
        .catch((error) => {
          alert(error.message + '' + 'Something went wrong');
        });
    } else {
      console.log(courseData);
      console.log(courseShortData);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <HeadingDashboard title="Add a new course" />
      <div className="w-3/4 shadow-lg p-10">
        {/* NOTE: InputBox component for the course title */}
        <InputBox
          title="Title"
          id="courseTitle"
          func={handleInputChange}
          placeholder="Example - Beginner to advance power bi course"
          type="text"
        />

        {/* NOTE: InputBox component for the course image */}
        <div className="mt-4">
          <label htmlFor className="font-semibold block text-[#17012e]">
            Course Image
          </label>
          <input
            id="photoUrl"
            onChange={handleFileSubmit}
            type="file"
            className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
          />
        </div>

        {/* NOTE: InputBox component for the short description */}
        <InputBox
          title="Short Description"
          id="shortDescription"
          func={handleInputChange}
          placeholder="Example - This course is specially designed for..."
          type="text"
        />

        {/* NOTE: PRICE BOX */}
        <div className="grid gap-4 grid-cols-2">
          {/* NOTE: InputBox component for the course price */}
          <InputBox
            title="Price"
            id="price"
            func={handleInputChange}
            placeholder="Example - 1500"
            type="number"
          />

          {/* NOTE: InputBox component for the discounted price */}
          <InputBox
            title="Discounted price"
            id="discountedPrice"
            placeholder="Example - 1000"
            func={handleInputChange}
            type="number"
          />
        </div>

        <div className="grid gap-4 grid-cols-3">
          {/* NOTE: InputBox component for the total seat number */}
          <InputBox
            title="Total Seat Number"
            id="totalSeatNumber"
            func={handleInputChange}
            placeholder="Example - 40"
            type="number"
          />

          {/* NOTE: InputBox component for the batch number */}
          <InputBox
            title="Batch No"
            id="batchNumber"
            func={handleInputChange}
            placeholder="Example - 05"
            type="number"
          />

          {/* NOTE: InputBox component for the class time */}
          <InputBox
            title="Class Time"
            id="classTime"
            placeholder="Example - 9pm - 11pm"
            func={handleInputChange}
            type="text"
          />
        </div>

        <div className="grid gap-4 grid-cols-3">
          {/* NOTE: InputBox component for the orientation class */}
          <InputBox
            title="Orientation Class"
            id="orientationClass"
            func={handleInputChange}
            type="date"
          />

          {/* NOTE: InputBox component for the main class starting date */}
          <InputBox
            title="Main class starting date"
            id="mainClassStartingDate"
            func={handleInputChange}
            type="date"
          />

          {/* NOTE: Checkbox component for selecting class days */}
          <div>
            <label className="font-semibold mt-8 block">Class Day</label>
            <div>
              <Checkbox.Group
                options={plainOptions}
                onChange={(e) => handleInputChange('class_days', e)}
              />
            </div>
          </div>
        </div>

        {/* NOTE: InputBox component for the course target audience */}
        <InputBox
          title="Who is the course for"
          id="classTime"
          placeholder="Example - for all students who want to learn power bi"
          func={handleInputChange}
          type="text"
        />

        {/* NOTE: InputBox component for the after-course benefit */}
        <InputBox
          title="After Course Benefit"
          id="classTime"
          placeholder="Example - scope of internships"
          func={handleInputChange}
          type="text"
        />

        {/* NOTE: INSTRUCTORS */}
        <AddInstructorCourse
          instructors={instructors}
          setInstructors={setInstructors}
        />

        {/* NOTE: Course Description */}
        <p className="font-semibold mt-6">Course Description</p>
        <div className="w-full border-1 p-3 bg-white">
          <Editor
            editorState={editorState}
            editorStyle={{ minHeight: '140px' }}
            toolbarClassName="toolbarClassName"
            wrapperClassName="demoWrapper"
            editorClassName="editorClassName"
            onEditorStateChange={handleEditorChange}
          />
        </div>

        {/* NOTE: InputBox component for the Course Details */}
        <InputBox
          title="Drive Link"
          id="driveLink"
          placeholder="https://drive.google.com/file/xyz"
          func={handleInputChange}
          type="text"
        />

        <InputBox
          title="Join Link"
          id="joinLink"
          placeholder="https://facebook.com/file/xyz"
          func={handleInputChange}
          type="text"
        />

        <AddModule
          courseModule={courseModule}
          setCourseModule={setCourseModule}
        />

        {/* NOTE: Minimum 7 short point for course details */}
        <div className="border-1 mt-5 py-6 px-3 rounded-lg bg-[#f0f0f0]">
          <p className="text-lg font-semibold text-[#17012e]">
            Add minimum 7 course details in point{' '}
            <span className="italic text-[orangered]">(required)</span>
          </p>
          <div className="grid gap-4 grid-cols-3">
            {/* NOTE: InputBox component for the point wise course details */}
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
                  className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full text-center pt-5 pb-16">
          {/* NOTE: Submit button */}
          <button
            onClick={handleSubmit}
            className="px-4 py-3 bg-blue-500 text-white rounded-md"
          >
            Submit Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
