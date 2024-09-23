import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { colors } from '../../../../../src/data/data';
import ButtonDashboard from '../../../../utilities/dashboard/ButtonDashboard';
import InputBox from '../../../Course/InputBox';
import AddQuiz from './AddQuiz';
import AddResourceRecording from './AddResourceRecording';
import LessonDetails from './LessonDetails';

const AddLiveClass = ({
  moduleData,
  setModuleData,
  updateModuleInFirestore,
}) => {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [indexLesson, setIndexLesson] = useState(0);
  const [liveClassLink, setLiveClassLink] = useState('');

  useEffect(() => {
    if (liveClassLink === '') {
      setCurrentLesson({
        ...moduleData.lessons[indexLesson],
      });
    } else {
      setCurrentLesson({
        ...moduleData.lessons[indexLesson],
        liveClassLink: liveClassLink,
      });
    }
  }, [moduleData, indexLesson, liveClassLink]);

  const handleLessonClick = (item, index) => {
    setCurrentLesson(item);
    setIndexLesson(index);
  };

  const handleAddLiveClass = () => {
    if (liveClassLink !== '') {
      const updatedModuleData = {
        ...moduleData,
        lessons: moduleData.lessons.map((lesson) =>
          lesson.id === currentLesson.id ? currentLesson : lesson,
        ),
      };
      setModuleData(updatedModuleData);
      updateModuleInFirestore(updatedModuleData);
      setLiveClassLink('');
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Please enter a valid live class link.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  };

  const handleFinishClass = () => {
    const updatedModuleData = {
      ...moduleData,
      lessons: moduleData.lessons.map((lesson) =>
        lesson.id === currentLesson.id
          ? {
              ...currentLesson,
              classFinished: lesson?.classFinished === true ? false : true,
            }
          : lesson,
      ),
    };
    setModuleData(updatedModuleData);
    updateModuleInFirestore(updatedModuleData);
  };

  const handleResetLiveClass = () => {
    const updatedModuleData = {
      ...moduleData,
      lessons: moduleData.lessons.map((lesson) =>
        lesson.id === currentLesson.id
          ? {
              ...currentLesson,
              liveClassLink: '',
              classFinished: false,
            }
          : lesson,
      ),
    };
    setModuleData(updatedModuleData);
    updateModuleInFirestore(updatedModuleData);
    setLiveClassLink('');
  };

  return (
    <div>
      {/* NOTE: LESSONS LIST */}
      <div className="flex-1 border-1 p-5 rounded-lg bg-white mt-10">
        <h2 className="text-xl pb-4 text-[#231f40] font-medium font-dash_heading ">
          All lessons
        </h2>

        <div className="grid grid-cols-5 gap-3">
          {moduleData?.lessons?.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleLessonClick(item, index)}
              className="shadow border rounded-md px-3 py-3 flex justify-center 
              items-center flex-col cursor-pointer"
            >
              <span
                style={{ backgroundColor: colors[index] }}
                className={`text-lg
                  w-[30px] h-[30px] flex justify-center items-center 
                  rounded-full font-semibold text-white`}
              >
                {index + 1}
              </span>
              <p className="text-center text-sm my-2">
                {item.title.replace(/^Session \d+:\s*/, '')}
              </p>

              {item?.liveClassLink && item?.classFinished ? (
                <span className="bg-green-50 border border-green-500 px-2 text-xs rounded-full font-semibold text-[#48bb78]">
                  Finished
                </span>
              ) : item?.liveClassLink && !item?.classFinished ? (
                <span className="bg-blue-100 border border-blue-500 px-2 text-xs rounded-full font-semibold text-[#4299e1]">
                  Running
                </span>
              ) : !item?.liveClassLink && !item?.classFinished ? (
                <span className="bg-purple-100 border border-purple-500 px-2 text-xs rounded-full font-semibold text-[#6b46c1]">
                  Upcoming
                </span>
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex justify-center gap-5 pb-20">
        {/* NOTE: Update Lessons */}
        <div className="flex-[60%] mt-10">
          <div className="bg-white border-1 p-5 rounded-lg">
            <h2 className="text-xl text-center pb-4 text-[#231f40] font-medium font-dash_heading ">
              Lesson Update: <br />
              <span className="text-primary text-base flex justify-center items-center gap-2">
                {' '}
                <span
                  style={{ backgroundColor: colors[indexLesson] }}
                  className={`text-lg
                  w-[30px] h-[30px] flex justify-center items-center 
                  rounded-full font-semibold text-white`}
                >
                  {indexLesson + 1}
                </span>
                {currentLesson?.title?.replace(/^Session \d+:\s*/, '')}
              </span>
            </h2>

            {/* NOTE: LIVE CLASS FORM */}
            <div className="mt-5">
              <h2 className="text-lg pb-2 text-[#25ce7f] text-center font-medium font-dash_heading ">
                Live Class
              </h2>
              <div className="flex gap-3 items-end">
                <InputBox
                  className="py-1"
                  title="Enter Live Class Link"
                  disabled={currentLesson?.classFinished ? true : false}
                  value={liveClassLink}
                  func={(e) => setLiveClassLink(e.target.value)}
                />
                <ButtonDashboard
                  // disabled={currentLesson?.classFinished ? true : false}
                  onClick={handleAddLiveClass}
                  className="bg-primary_btn hover:bg-[#002346bc] text-white py-2.5"
                >
                  Submit
                </ButtonDashboard>
              </div>

              {/* NOTE: Class finish button */}
              <div className="">
                <h2 className="text-lg pt-5 pb-2 text-[#231f40] font-medium font-dash_heading text-center">
                  {currentLesson?.classFinished
                    ? 'Class has finished. Click reset button to back upcoming state.'
                    : 'After finished the live class click this button.'}
                </h2>
                <div className="flex justify-between">
                  <ButtonDashboard
                    onClick={handleResetLiveClass}
                    className="bg-primary_btn hover:bg-[#002346bc] text-white py-2.5"
                  >
                    Reset Live Class
                  </ButtonDashboard>
                  <ButtonDashboard
                    disabled={
                      (currentLesson?.liveClassLink &&
                        currentLesson?.classFinished) ||
                      !currentLesson?.liveClassLink
                        ? true
                        : false
                    }
                    onClick={handleFinishClass}
                    className="bg-secondary_btn hover:bg-[#3d9970bc] text-white py-2.5"
                  >
                    {currentLesson?.classFinished
                      ? 'Class finished'
                      : 'Click to finish the live class'}
                  </ButtonDashboard>
                </div>
              </div>
            </div>
          </div>

          <AddResourceRecording
            moduleData={moduleData}
            setModuleData={setModuleData}
            updateModuleInFirestore={updateModuleInFirestore}
            indexLesson={indexLesson}
            currentLesson={currentLesson}
            setCurrentLesson={setCurrentLesson}
          />

          <AddQuiz
            moduleData={moduleData}
            setModuleData={setModuleData}
            updateModuleInFirestore={updateModuleInFirestore}
            indexLesson={indexLesson}
            currentLesson={currentLesson}
            setCurrentLesson={setCurrentLesson}
          />
        </div>

        {/* NOTE: LESSONS DETAILS */}
        <LessonDetails
          moduleData={moduleData}
          setModuleData={setModuleData}
          updateModuleInFirestore={updateModuleInFirestore}
          indexLesson={indexLesson}
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
        />
      </div>
    </div>
  );
};

export default AddLiveClass;
