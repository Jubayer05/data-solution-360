import Link from 'next/link';
import React from 'react';
import { MdCancel } from 'react-icons/md';
import { colors } from '../../../../../src/data/data';

const LessonDetails = ({
  currentLesson,
  indexLesson,
  moduleData,
  setModuleData,
  updateModuleInFirestore,
  setCurrentLesson,
}) => {
  console.log(currentLesson);

  const handleRemoveQuiz = (item) => {
    const updatedModuleData = {
      ...moduleData,
      lessons: moduleData.lessons.map((lesson) =>
        lesson.id === currentLesson.id
          ? {
              ...lesson,
              quizData: Array.isArray(lesson.quizData)
                ? lesson.quizData.filter((quiz) => quiz.id !== item.id)
                : [],
            }
          : lesson,
      ),
    };
    setModuleData(updatedModuleData);
    updateModuleInFirestore(updatedModuleData);
  };

  return (
    <div className="flex-[40%] border-1 p-5 rounded-lg bg-white mt-10">
      <h2 className="text-xl text-center pb-4 text-[#231f40] font-medium font-dash_heading ">
        Lesson Details:
        <br />
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

      <div className="">
        <h2 className="text-base pb-1 text-[#231f40] font-medium font-dash_heading ">
          Topics in this lesson:
        </h2>
        {currentLesson?.topics?.map((item, index) => (
          <div key={item.id}>
            <p className="text-xs">
              <strong>{index + 1}.</strong> {item.name}
            </p>
          </div>
        ))}

        <h2 className="text-base pb-1 mt-5 text-[#231f40] font-medium font-dash_heading ">
          Live Class
        </h2>
        <p className="text-sm">{currentLesson?.liveClassLink}</p>
        <div>
          {currentLesson?.liveClassLink && currentLesson?.classFinished ? (
            <span className="bg-green-50 border border-green-500 px-2 text-xs rounded-full font-semibold text-[#48bb78]">
              Finished
            </span>
          ) : currentLesson?.liveClassLink && !currentLesson?.classFinished ? (
            <span className="bg-blue-100 border border-blue-500 px-2 text-xs rounded-full font-semibold text-[#4299e1]">
              Running
            </span>
          ) : !currentLesson?.liveClassLink && !currentLesson?.classFinished ? (
            <span className="bg-purple-100 border border-purple-500 px-2 text-xs rounded-full font-semibold text-[#6b46c1]">
              Upcoming
            </span>
          ) : (
            ''
          )}
        </div>

        <h2 className="text-base pb-1 mt-5 text-[#231f40] font-medium font-dash_heading ">
          Resource Link
        </h2>
        {currentLesson?.resourceLink ? (
          <Link
            href={currentLesson?.resourceLink}
            target="_blank"
            className="text-blue-600 visited:text-blue-600"
          >
            {currentLesson?.resourceLink}
          </Link>
        ) : (
          <p className="text-sm">No Link Provided</p>
        )}

        <h2 className="text-base pb-1 mt-5 text-[#231f40] font-medium font-dash_heading ">
          Class Recording Link
        </h2>
        {currentLesson?.recordingLink ? (
          <Link
            href={currentLesson?.recordingLink}
            target="_blank"
            className="text-blue-600 visited:text-blue-600"
          >
            {currentLesson?.recordingLink}
          </Link>
        ) : (
          <p className="text-sm">No Link Provided</p>
        )}

        <h2 className="text-base pb-1 mt-5 text-[#231f40] font-medium font-dash_heading ">
          Quiz Data
        </h2>

        {currentLesson?.quizData?.map((item, index) => (
          <div key={item.id} className="mb-3 flex justify-between group">
            <div>
              <p className="text-sm">
                <strong>
                  {index + 1}. {item.question}
                </strong>
              </p>
              <div className="grid grid-cols-2">
                {item.options.map((option, optionIndex) => (
                  <div key={option.id}>
                    <p className="text-xs">
                      <span className="text-gray-600">Option {option.id}:</span>{' '}
                      {option.text}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-sm">
                correct answer:{' '}
                <strong className="text-primary">{item.correct_answer}</strong>
              </p>
            </div>
            <div className="">
              <MdCancel
                onClick={() => handleRemoveQuiz(item)}
                className="text-xl text-red-500 cursor-pointer hidden group-hover:block"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonDetails;
