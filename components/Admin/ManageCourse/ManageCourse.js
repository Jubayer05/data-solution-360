import { Checkbox, Switch, Table } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';
import RichTextEditorJodit from '../../utilities/RichTextEditor/RichTextEditor';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';
import AddInstructorCourse from '../Course/AddInstructorCourse';
import AddModule from '../Course/AddModule';
import CourseStatus from '../Course/CourseStatus';
import CourseReview from './CourseReview';
import EditCourseData from './EditCourseData';
import InputBoxManage from './InputBoxManage';

const db = firebase.firestore();

const ManageCourse = () => {
  const { courseData, userEmail } = useStateContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  useEffect(() => {
    setCourseDataObj(modalData);
    setCourseModule(modalData?.courseModule || []);
    setCourseShortData(modalData?.courseShortData);
    setInstructors(modalData?.instructors || []);
    setStudentReview(modalData?.studentReview || []);
    setCourseStatus(modalData?.status);
    setMainClassStart(modalData?.mainClassStartStatus || false);
  }, [modalData]);

  const plainOptions = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      background: '#fff',
      height: '700px',
      width: '1000px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 100,
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 500,
    },
  };

  const columns = [
    {
      title: 'SL Number',
      dataIndex: 'serialNumber',
      width: 80,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Blog Title',
      dataIndex: 'title',
      align: 'left',
      width: 350,
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <button
          className="bg-primary-bg text-white py-1 px-2 rounded"
          onClick={() => handleEditClick(record)}
        >
          Edit
        </button>
      ),
    },
    {
      title: 'Delete',
      dataIndex: '',
      key: 'x',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <button
          className="bg-red-600 text-white py-1 px-2 rounded"
          onClick={() => handleDelete(record)}
        >
          Delete
        </button>
      ),
    },
  ];

  const handleEditClick = (record) => {
    setModalData(record);
    setModalIsOpen(true);
  };

  const handleDelete = (record) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        db.collection('course_data')
          .doc(record.key)
          .delete()
          .then(() => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error!', 'Something went wrong.', 'error');
          });
      }
    });
  };

  const handleSubmitClick = () => {
    const updatedCourse = {
      ...courseDataObj,
      orientation_class: orientation ? courseDataObj?.orientation_class : '-',
      youtube_video: youtubeVideoReset
        ? ''
        : extractEmbedId(youtube_video)
        ? extractEmbedId(youtube_video)
        : courseDataObj?.youtube_video || '',
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

    db.collection('course_data')
      .doc(modalData.key)
      .update(updatedCourse)
      .then(() => {
        Swal.fire('Updated!', 'Your file has been updated.', 'success').then(
          () => {
            window.location.reload();
          },
        );
      })
      .catch((error) => {
        Swal.fire('Error!', 'Something went wrong.', 'error');
      });
  };

  const handleInputChange = (key, value) => {
    const updatedObject = {
      ...courseDataObj,
      [key]: value,
    };
    setCourseDataObj(updatedObject);
  };

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
              setCourseDataObj({ ...courseDataObj, img: url });
            });
        },
      );
    } else {
      alert('File Size must be under 1mb');
    }
  };

  return (
    <div>
      <HeadingDashboard title="Manage Courses" />
      {/* <EditCourseData item={courseData} /> */}
      <div className="max-w-3xl mx-auto my-20">
        <Table
          columns={columns}
          dataSource={[...courseData]}
          pagination={{
            pageSize: 50,
          }}
          scroll={{
            y: 400,
          }}
        />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="w-full">
          <div className="flex justify-between">
            <div />

            <h2 className="text-2xl font-heading font-bold text-center mb-8 ">
              Edit The Course
            </h2>
            <div>
              <ImCancelCircle
                onClick={() => closeModal()}
                className="text-2xl cursor-pointer"
              />
            </div>
          </div>
          <div className="mb-4">
            <p>
              Status{' '}
              <span className="ml-2 italic font-thin">
                (previous:
                <span className=" text-[orangered] ml-2">
                  {/* {modalData?.status ? 'On Going' : 'Upcoming'} */}
                  {modalData?.status || ''}
                </span>
                )
              </span>
            </p>
            <CourseStatus
              courseStatus={courseStatus}
              setCourseStatus={setCourseStatus}
            />
          </div>

          {/* NOTE: COURSE TITLE */}
          <InputBoxManage
            title="Title"
            id="courseTitle"
            func={handleInputChange}
            placeholder="Example - Beginner to advance power bi course"
            type="text"
            value={modalData?.title}
          />

          <label htmlFor="photoUrl" className="font-semibold mt-3 block">
            Course image
          </label>
          <span className="italic font-thin">previous:</span>
          <Image
            width={500}
            height={300}
            src={modalData?.img}
            className="w-80 my-4"
            alt=""
          />
          <input
            id="photoUrl"
            onChange={handleFileSubmit}
            type="file"
            className="w-full px-4 py-2 outline-none border-1 mt-3 "
          />

          {/* NOTE: YOUTUBE VIDEO */}
          <div className="flex items-end gap-2">
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
                      {modalData?.youtube_video}
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
            {modalData?.youtube_video && (
              <button
                onClick={() => setYoutubeVideoReset(true)}
                className=" w-1/3 px-4 py-4 bg-[#ff3d50] text-white rounded-md"
              >
                Reset Youtube Link
              </button>
            )}
          </div>

          {/* NOTE: SHORT DESCRIPTION */}
          <InputBoxManage
            title="Short Description"
            id="shortDescription"
            func={handleInputChange}
            placeholder="Example - This course is specially designed for..."
            type="text"
            value={modalData?.short_description}
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
              value={modalData?.module_number}
            />

            {/* NOTE: InputBox component for the Number of Live Class */}
            <InputBoxManage
              title="Live Class Number"
              id="live_class_number"
              placeholder="Example - 10"
              func={handleInputChange}
              type="number"
              value={modalData?.live_class_number}
            />

            {/* NOTE: InputBox component for the Number of Real World Project */}
            <InputBoxManage
              title="Project Number"
              id="project_number"
              placeholder="Example - 10"
              func={handleInputChange}
              type="number"
              value={modalData?.project_number}
            />

            {/* InputBox component for the course price */}
            <InputBoxManage
              title="Price"
              id="price"
              func={handleInputChange}
              placeholder="Example - 1500"
              type="number"
              value={modalData?.price}
            />

            {/* InputBox component for the discounted price */}
            <InputBoxManage
              title="Discounted price"
              id="discountedPrice"
              placeholder="Example - 1000"
              func={handleInputChange}
              type="number"
              value={modalData?.discounted_price}
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
              value={modalData?.total_seat_number}
            />

            {/* NOTE: InputBox component for the total seat number */}
            <InputBoxManage
              title="Remaining Seat Number"
              id="remainingSeatNumber"
              func={handleInputChange}
              placeholder="Example - 40"
              type="number"
              value={modalData?.remaining_seat_number}
            />

            {/* NOTE: InputBox component for the batch number */}
            <InputBoxManage
              title="Batch No"
              id="batchNumber"
              func={handleInputChange}
              placeholder="Example - 05"
              type="number"
              value={modalData?.batch_no}
            />

            {/* NOTE: InputBox component for the class time */}
            <InputBoxManage
              title="Class Time"
              id="classTime"
              placeholder="Example - 9pm - 11pm"
              func={handleInputChange}
              type="text"
              value={modalData?.class_time}
            />

            <div className="flex gap-4">
              <InputBoxManage
                title="Orientation Class"
                id="orientationClass"
                func={handleInputChange}
                type="date"
                value={modalData?.orientation_class}
              />
              <div className="mt-8">
                <Switch
                  onChange={(value) => setOrientation(value)}
                  checkedChildren="on"
                  unCheckedChildren="off"
                  defaultChecked={
                    modalData?.orientation_class === '-' ? false : true
                  }
                />
              </div>
            </div>
            <div className="flex gap-4">
              <InputBoxManage
                title="Main class starting date"
                id="mainClassStartingDate"
                func={handleInputChange}
                type="date"
                value={modalData?.main_class_starting_date}
              />
              <div className="mt-8">
                <Switch
                  onChange={(value) => setMainClassStart(value)}
                  checkedChildren="Running"
                  unCheckedChildren="Future"
                  defaultChecked={
                    modalData?.mainClassStartStatus ? true : false
                  }
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
                    {modalData?.class_days?.map((item) => (
                      <span key={item}>{item} &nbsp;</span>
                    ))}
                  </span>
                  )
                </span>
              </label>
              <div>
                <Checkbox.Group
                  options={plainOptions}
                  onChange={(e) => handleInputChange('class_days', e)}
                />
              </div>
            </div>
            {/* NOTE: InputBox component for the Extra support */}
            <InputBoxManage
              title="Extra Support"
              id="extraSupport"
              placeholder="Extra 5 months support after course finished."
              func={handleInputChange}
              type="text"
              value={modalData?.extra_support}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 pb-8">
            <RichTextEditorJodit
              onDataChange={setCourseFor}
              title="Who is the course for"
              value={modalData?.who_is_the_course_for}
            />

            <RichTextEditorJodit
              onDataChange={setCourseBenefit}
              title="After Course Benefit"
              value={modalData?.after_course_benefit}
            />
            <RichTextEditorJodit
              onDataChange={setCourseDetails}
              title="Course Description"
              value={modalData?.details}
            />
          </div>

          <InputBoxManage
            title="Drive Link"
            id="driveLink"
            placeholder="https://drive.google.com/file/xyz"
            func={handleInputChange}
            type="text"
            value={modalData?.drive_link}
          />

          <InputBoxManage
            title="Join Link"
            id="joinLink"
            placeholder="https://facebook.com/file/xyz"
            func={handleInputChange}
            type="text"
            value={modalData?.join_link}
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
          <AddInstructorCourse
            instructors={instructors}
            setInstructors={setInstructors}
          />

          <CourseReview
            studentReview={studentReview}
            setStudentReview={setStudentReview}
          />

          <div className="w-full text-center pt-5 pb-16">
            <button
              onClick={handleSubmitClick}
              className="px-4 py-3 bg-blue-500 text-white rounded-md"
            >
              Submit Content
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageCourse;

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
