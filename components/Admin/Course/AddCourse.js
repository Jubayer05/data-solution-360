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
  name_of_the_instructor: '',
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
  const [progressData, setProgressData] = useState(null);

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
    console.log(key + ': ' + value);
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
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          setProgressData(progress);
        },
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
    // console.log(fileSize);
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
      courseData.after_course_benefit != '' &&
      courseData.name_of_the_instructor != ''
    ) {
      firebase
        .firestore()
        .collection('course_data')
        .add({
          ...courseData,
          id: uuidv4().split('-')[0],
          details: convertContent,
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
      // console.log(courseData);
    } else {
      // const isFieldsFulfilled =
      //   ;
      console.log(courseData);
      console.log(courseShortData);
      // alert("Please fill up all the required fields!");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <HeadingDashboard title="Add a new course" />
      <div className="w-3/4">
        {/* InputBox component for the course title */}
        <InputBox
          title="Title"
          id="courseTitle"
          func={handleInputChange}
          placeholder="Example - Beginner to advance power bi course"
          type="text"
        />

        {/* InputBox component for the course image */}
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

        {/* InputBox component for the short description */}
        <InputBox
          title="Short Description"
          id="shortDescription"
          func={handleInputChange}
          placeholder="Example - This course is specially designed for..."
          type="text"
        />

        <div className="grid gap-4 grid-cols-2">
          {/* InputBox component for the course price */}
          <InputBox
            title="Price"
            id="price"
            func={handleInputChange}
            placeholder="Example - 1500"
            type="number"
          />

          {/* InputBox component for the discounted price */}
          <InputBox
            title="Discounted price"
            id="discountedPrice"
            placeholder="Example - 1000"
            func={handleInputChange}
            type="number"
          />
        </div>

        <div className="grid gap-4 grid-cols-3">
          {/* InputBox component for the total seat number */}
          <InputBox
            title="Total Seat Number"
            id="totalSeatNumber"
            func={handleInputChange}
            placeholder="Example - 40"
            type="number"
          />

          {/* InputBox component for the batch number */}
          <InputBox
            title="Batch No"
            id="batchNumber"
            func={handleInputChange}
            placeholder="Example - 05"
            type="number"
          />

          {/* InputBox component for the class time */}
          <InputBox
            title="Class Time"
            id="classTime"
            placeholder="Example - 9pm - 11pm"
            func={handleInputChange}
            type="text"
          />
        </div>

        <div className="grid gap-4 grid-cols-3">
          {/* InputBox component for the orientation class */}
          <InputBox
            title="Orientation Class"
            id="orientationClass"
            func={handleInputChange}
            type="date"
          />

          {/* InputBox component for the main class starting date */}
          <InputBox
            title="Main class starting date"
            id="batchNumber"
            func={handleInputChange}
            type="date"
          />

          {/* Checkbox component for selecting class days */}
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

        {/* InputBox component for the course target audience */}
        <InputBox
          title="Who is the course for"
          id="classTime"
          placeholder="Example - for all students who want to learn power bi"
          func={handleInputChange}
          type="text"
        />

        {/* InputBox component for the after-course benefit */}
        <InputBox
          title="After Course Benefit"
          id="classTime"
          placeholder="Example - scope of internships"
          func={handleInputChange}
          type="text"
        />

        {/* InputBox component for the instructor name */}
        <InputBox
          title="Name of the instructor"
          id="classTime"
          placeholder="Example - Sakib Tarafder"
          func={handleInputChange}
          type="text"
        />

        {/* Course Description */}
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

        {/* Minimum 7 short point for course details */}
        <div className="border-1 mt-5 py-6 px-3 rounded-lg bg-[#f0f0f0]">
          <p className="text-lg font-semibold text-[#17012e]">
            Add minimum 7 course details in point{' '}
            <span className="italic text-[orangered]">(required)</span>
          </p>
          <div className="grid gap-4 grid-cols-3">
            {/* InputBox component for the point wise course details */}
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
          {/* InputBox component for the batch number */}
        </div>

        <div className="w-full text-center pt-5 pb-16">
          {/* Submit button */}
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

const InputBox = ({ title, type, id, func, placeholder }) => {
  return (
    <div className="w-full mt-5">
      <label htmlFor={id} className="font-semibold mt-3 block text-[#17012e]">
        {title}
      </label>
      <input
        id={id}
        onChange={(e) =>
          func(title.toLowerCase().split(' ').join('_'), e.target.value)
        }
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
      />
    </div>
  );
};
