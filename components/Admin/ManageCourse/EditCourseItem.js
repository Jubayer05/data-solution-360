import { Switch } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';
import useFetchDocById from '../../../src/hooks/manageDataById/useLoadDocumentById';
import useUpdateDocumentById from '../../../src/hooks/manageDataById/useUpdateDocumentById';
import RichTextEditorJodit from '../../utilities/RichTextEditor/RichTextEditor';
import InputBoxManage from './InputBoxManage';

const db = firebase.firestore();

const EditCourseItem = () => {
  const { courseData, userEmail } = useStateContext();
  const [courseDataObj, setCourseDataObj] = useState({});
  const [modalData, setModalData] = useState(null);
  const [orientation, setOrientation] = useState(true);
  const [mainClassStart, setMainClassStart] = useState(null);
  const [courseStatus, setCourseStatus] = useState(false);
  const [courseModule, setCourseModule] = useState([]);
  const [courseShortData, setCourseShortData] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [studentReview, setStudentReview] = useState([]);
  const [courseBenefit, setCourseBenefit] = useState('');
  const [courseDetails, setCourseDetails] = useState('');
  const [courseFor, setCourseFor] = useState('');
  const [youtube_video, setYoutube_video] = useState('');
  const [youtubeVideoReset, setYoutubeVideoReset] = useState(false);
  const router = useRouter();
  const { courseId } = router?.query;

  const { data, loading, error } = useFetchDocById('course_data', courseId);
  const { updateDocument, loadingUpdate, errorUpdate, success } =
    useUpdateDocumentById('course_data', courseId);

  useEffect(() => {
    setCourseDataObj(data);
    setCourseModule(data?.courseModule || []);
    setCourseShortData(data?.courseShortData);
    setInstructors(data?.instructors || []);
    setStudentReview(data?.studentReview || []);
    setCourseStatus(data?.status);
    setMainClassStart(data?.mainClassStartStatus || false);
  }, [data]);

  const handleSubmitClick = () => {
    const updatedCourse = {
      ...courseDataObj,
      orientation_class: orientation ? courseDataObj?.orientation_class : '-',
      // youtube_video: youtubeVideoReset
      //   ? ''
      //   : extractEmbedId(youtube_video)
      //   ? extractEmbedId(youtube_video)
      //   : courseDataObj?.youtube_video || '',
      main_class_starting_date: mainClassStart
        ? 'running'
        : courseDataObj?.main_class_starting_date,
      mainClassStartStatus: mainClassStart,
      courseModule,
      instructors,
      studentReview,
      courseShortData,
      after_course_benefit: !isContentEmpty(courseBenefit)
        ? courseBenefit
        : courseDataObj?.after_course_benefit,
      details: !isContentEmpty(courseDetails)
        ? courseDetails
        : courseDataObj?.details,
      who_is_the_course_for: !isContentEmpty(courseFor)
        ? courseFor
        : courseDataObj?.who_is_the_course_for,
      status: courseStatus,
    };

    // console.log(updatedCourse);
    updateDocument(updatedCourse);
  };
  useEffect(() => {
    if (success) {
      Swal.fire('Updated!', 'Your file has been updated.', 'success').then(
        () => {
          window.location.reload();
        },
      );
    }
  }, [success]);

  const handleInputChange = (key, value) => {
    const updatedObject = {
      ...courseDataObj,
      [key]: value,
    };
    setCourseDataObj(updatedObject);
  };

  if (loading || loadingUpdate) {
    return <p>Loading...</p>;
  }

  if (error || errorUpdate) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto my-5 bg-white border rounded-lg px-6 ">
      {' '}
      <div className="w-full bg-white">
        <h2 className="text-2xl font-heading font-bold text-center mb-8 pt-10">
          Edit The Course
        </h2>

        <div className="mb-4">
          <p>
            Status{' '}
            <span className="ml-2 italic font-thin">
              (previous:
              <span className=" text-[orangered] ml-2">
                {/* {data?.status ? 'On Going' : 'Upcoming'} */}
                {data?.status || ''}
              </span>
              )
            </span>
          </p>
          {/* <CourseStatus
            courseStatus={courseStatus}
            setCourseStatus={setCourseStatus}
          /> */}
        </div>

        <div>
          {/* NOTE: COURSE TITLE */}
          <InputBoxManage
            title="Title"
            id="courseTitle"
            func={handleInputChange}
            placeholder="Example - Beginner to advance power bi course"
            type="text"
            value={data?.title}
          />

          {/* TODO: MAKE A DIFFERENT COMPONENT TO MANAGE FILES */}
          {/* <label htmlFor="photoUrl" className="font-semibold mt-3 block">
          Course image
        </label>
        <span className="italic font-thin">previous:</span>
        <Image
          width={500}
          height={300}
          src={data?.img}
          className="w-80 my-4"
          alt=""
          />
          <input
          id="photoUrl"
          onChange={handleFileSubmit}
          type="file"
          className="w-full px-4 py-2 outline-none border-1 mt-3 "
        /> */}

          {/* TODO: DIFFERENT COMPONENT FOR YOUTUBE VIDEO */}
          {/* <div className="flex items-end gap-2">
          <div className="w-full mt-5 ">
            <label
              htmlFor="youtubeVideo"
              className="font-semibold mt-3 block text-[#17012e]"
              >
              Youtube Video
              <span className="ml-2 italic font-thin">
              (previous:
              {!youtubeVideoReset && (
                <span className=" text-[orangered] ml-2">
                    {data?.youtube_video}
                  </span>
                )}
                )
              </span>
            </label>
            <input
              id="youtubeVideo"
              onChange={(e) => setYoutube_video(e.target.value)}
              type="text"
              placeholder="Example - https://youtu.be/-kfyvQkQoXw?si=TVEztoxsZmtFfRnd"
              className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
            />
          </div>
          {data?.youtube_video && (
            <button
              onClick={() => setYoutubeVideoReset(true)}
              className=" w-1/3 px-4 py-4 bg-[#ff3d50] text-white rounded-md"
            >
            Reset Youtube Link
            </button>
          )}
        </div> */}
        </div>
        {/* NOTE: SHORT DESCRIPTION */}
        <InputBoxManage
          title="Short Description"
          id="shortDescription"
          func={handleInputChange}
          placeholder="Example - This course is specially designed for..."
          type="text"
          value={data?.short_description}
        />

        {/* NOTE: PRICE BOX */}
        <div className="grid gap-x-4 grid-cols-2">
          {/* NOTE: InputBox component for the Number of Modules */}
          <InputBoxManage
            title="Module Number"
            id="module_number"
            placeholder="Example - 8"
            func={handleInputChange}
            type="number"
            value={data?.module_number}
          />

          {/* NOTE: InputBox component for the Number of Live Class */}
          <InputBoxManage
            title="Live Class Number"
            id="live_class_number"
            placeholder="Example - 10"
            func={handleInputChange}
            type="number"
            value={data?.live_class_number}
          />

          {/* NOTE: InputBox component for the Number of Real World Project */}
          <InputBoxManage
            title="Project Number"
            id="project_number"
            placeholder="Example - 10"
            func={handleInputChange}
            type="number"
            value={data?.project_number}
          />

          {/* InputBox component for the course price */}
          <InputBoxManage
            title="Price"
            id="price"
            func={handleInputChange}
            placeholder="Example - 1500"
            type="number"
            value={data?.price}
          />

          {/* InputBox component for the discounted price */}
          <InputBoxManage
            title="Discounted price"
            id="discountedPrice"
            placeholder="Example - 1000"
            func={handleInputChange}
            type="number"
            value={data?.discounted_price}
          />
        </div>

        <div className="grid gap-4 grid-cols-2">
          {/* NOTE: InputBox component for the total seat number */}
          <InputBoxManage
            title="Total Seat Number"
            id="totalSeatNumber"
            func={handleInputChange}
            placeholder="Example - 40"
            type="number"
            value={data?.total_seat_number}
          />

          {/* NOTE: InputBox component for the total seat number */}
          <InputBoxManage
            title="Remaining Seat Number"
            id="remainingSeatNumber"
            func={handleInputChange}
            placeholder="Example - 40"
            type="number"
            value={data?.remaining_seat_number}
          />

          {/* NOTE: InputBox component for the batch number */}
          <InputBoxManage
            title="Batch No"
            id="batchNumber"
            func={handleInputChange}
            placeholder="Example - 05"
            type="number"
            value={data?.batch_no}
          />

          {/* NOTE: InputBox component for the class time */}
          <InputBoxManage
            title="Class Time"
            id="classTime"
            placeholder="Example - 9pm - 11pm"
            func={handleInputChange}
            type="text"
            value={data?.class_time}
          />

          <div className="flex gap-4">
            <InputBoxManage
              title="Orientation Class"
              id="orientationClass"
              func={handleInputChange}
              type="date"
              value={data?.orientation_class}
            />
            <div className="mt-8">
              <Switch
                onChange={(value) => setOrientation(value)}
                checkedChildren="on"
                unCheckedChildren="off"
                defaultChecked={data?.orientation_class === '-' ? false : true}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <InputBoxManage
              title="Main class starting date"
              id="mainClassStartingDate"
              func={handleInputChange}
              type="date"
              value={data?.main_class_starting_date}
            />
            <div className="mt-8">
              <Switch
                onChange={(value) => setMainClassStart(value)}
                checkedChildren="Running"
                unCheckedChildren="Future"
                defaultChecked={data?.mainClassStartStatus ? true : false}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          {/* NOTE: Checkbox component for selecting class days */}
          <div>
            <label className="font-semibold mt-8 block">
              Class Day{' '}
              <span className="ml-2 italic font-thin">
                (previous:
                <span className=" text-[orangered] ml-2">
                  {data?.class_days?.map((item) => (
                    <span key={item}>{item} &nbsp;</span>
                  ))}
                </span>
                )
              </span>
            </label>

            {/* TODO: HANDLE CHECKBOX */}
            {/* <div>
              <Checkbox.Group
                options={plainOptions}
                onChange={(e) => handleInputChange('class_days', e)}
              />
            </div> */}
          </div>
          {/* NOTE: InputBox component for the Extra support */}
          <InputBoxManage
            title="Extra Support"
            id="extraSupport"
            placeholder="Extra 5 months support after course finished."
            func={handleInputChange}
            type="text"
            value={data?.extra_support}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 pb-8">
          <RichTextEditorJodit
            onDataChange={setCourseFor}
            title="Who is the course for"
            value={data?.who_is_the_course_for}
          />

          <RichTextEditorJodit
            onDataChange={setCourseBenefit}
            title="After Course Benefit"
            value={data?.after_course_benefit}
          />
          <RichTextEditorJodit
            onDataChange={setCourseDetails}
            title="Course Description"
            value={data?.details}
          />
        </div>

        <InputBoxManage
          title="Drive Link"
          id="driveLink"
          placeholder="https://drive.google.com/file/xyz"
          func={handleInputChange}
          type="text"
          value={data?.drive_link}
        />

        <InputBoxManage
          title="Join Link"
          id="joinLink"
          placeholder="https://facebook.com/file/xyz"
          func={handleInputChange}
          type="text"
          value={data?.join_link}
        />

        {/* <AddModule
          courseModule={courseModule}
          setCourseModule={setCourseModule}
        /> */}

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
                  {item.name} <br />
                  <span className="italic font-thin">
                    previous:
                    <span className=" text-[orangered] ml-2 text-xs">
                      {item.value}
                    </span>
                  </span>
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

        {/* NOTE: INSTRUCTORS */}
        {/* <AddInstructorCourse
          instructors={instructors}
          setInstructors={setInstructors}
        />

        <CourseReview
          studentReview={studentReview}
          setStudentReview={setStudentReview}
        /> */}

        <div className="w-full text-center pt-5 pb-16">
          <button
            onClick={handleSubmitClick}
            className="px-4 py-3 bg-blue-500 text-white rounded-md"
          >
            Submit Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCourseItem;

const isContentEmpty = (content) => {
  // Use a regular expression to check if the content contains only whitespace or line breaks
  const isEmpty = /^(<div><br><\/div>\s*)*$/.test(content);
  return isEmpty;
};

function extractEmbedId(url) {
  let match;

  // Check for the "https://www.youtube.com/watch?v=VIDEO_ID" format
  match = url?.match(/[?&]v=([^&]+)/);
  if (match) {
    return match[1];
  }

  // Check for the "https://youtu.be/VIDEO_ID" format
  match = url?.match(/youtu\.be\/([^?]+)/);
  if (match) {
    return match[1];
  }

  return '';
}
