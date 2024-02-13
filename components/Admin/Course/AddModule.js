import { Collapse } from 'antd';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const { Panel } = Collapse;

const initialModuleState = {
  moduleName: '',
  moduleNumber: '',
  liveClassNumber: '',
  projectNumber: '',
  lessons: [],
};

const initialLessonState = {
  id: '',
  title: '',
  topics: [],
};

const initialTopicState = {
  id: '',
  name: '',
};

const AddModule = ({ courseModule, setCourseModule }) => {
  const [module, setModule] = useState({ ...initialModuleState });
  const [moduleEdit, setModuleEdit] = useState(null);
  const [lesson, setLesson] = useState({ ...initialLessonState });
  const [topic, setTopic] = useState({ ...initialTopicState });
  const [editValue, setEditValue] = useState(null);
  const [editLesson, setEditLesson] = useState(null);
  const [editTopic, setEditTopic] = useState(null);

  console.log(courseModule);

  const handleAddLesson = () => {
    setModule({
      ...module,
      lessons: [...module.lessons, { ...lesson, id: uuidv4().split('-')[0] }],
    });
    setLesson({ ...initialLessonState });
  };

  const handleAddTopic = () => {
    setLesson({
      ...lesson,
      topics: [...lesson.topics, { ...topic, id: uuidv4().split('-')[0] }],
    });
    setTopic({ ...initialTopicState });
  };

  const handleAddModule = () => {
    if (
      module.moduleName !== '' &&
      module.lessons.length > 0 &&
      module.moduleNumber !== ''
    ) {
      setCourseModule([
        ...courseModule,
        { ...module, id: uuidv4().split('-')[0] },
      ]);

      setModule({ ...initialModuleState });
    } else {
      alert('Please provide a valid information!');
    }
  };

  const handleLessonChange = (e) => {
    setLesson({ ...lesson, title: e.target.value });
  };
  const handleTopicChange = (e) => {
    setTopic({ ...topic, name: e.target.value });
  };
  const handleModuleChange = (e) => {
    setModule({ ...module, [e.target.name]: e.target.value });
    setModuleEdit({ ...moduleEdit, [e.target.name]: e.target.value });
  };

  const handleDeleteModule = (item) => {
    setCourseModule(courseModule.filter((x) => x.id !== item.id));
  };

  const handleEditModule = () => {
    const courseModuleCopy = [...courseModule];
    const updatedModule = { ...editValue, ...moduleEdit };
    const moduleIndex = courseModule.findIndex((x) => x.id === editValue.id);
    courseModuleCopy[moduleIndex] = updatedModule;
    setCourseModule(courseModuleCopy);

    // NOTE: back to original state
    setModuleEdit(null);
    setEditValue(null);
    setEditLesson(null);
    setEditTopic(null);
    setLesson({ ...initialLessonState });
    setModule({ ...initialModuleState });
    setTopic({ ...initialTopicState });
  };

  const handleEditLesson = () => {
    const updatedLesson = editValue?.lessons.find(
      (val) => val.id === editLesson.id,
    );
    const findUpdatedLessonIndex = editValue?.lessons.findIndex(
      (val) => val.id === editLesson.id,
    );
    updatedLesson.title = lesson.title;
    editValue.lessons[findUpdatedLessonIndex] = updatedLesson;

    // call the update module function
    handleEditModule();
  };

  const handleEditTopic = () => {
    const updatedLesson = editValue?.lessons.find(
      (val) => val.id === editLesson.id,
    );
    const findUpdatedLessonIndex = editValue?.lessons.findIndex(
      (val) => val.id === editLesson.id,
    );

    // Find updated topic
    const updatedTopic = updatedLesson.topics.find(
      (val) => val.id === editTopic.id,
    );

    const updatedTopicIndex = updatedLesson.topics.findIndex(
      (val) => val.id === editTopic.id,
    );

    updatedTopic.name = topic.name;

    updatedLesson.topics[updatedTopicIndex] = updatedTopic;
    editValue.lessons[findUpdatedLessonIndex] = updatedLesson;

    // call the update module function
    handleEditModule();
  };

  const handleEditLessonBtn = (item) => {
    setEditLesson(item);
    setEditTopic(null);
  };

  return (
    <div className="bg-[#f0f0f0] shadow-lg rounded-lg border-dashed px-6 py-3 mt-5">
      <h2 className="text-xl text text-center my-4 font-bold">
        Study Plan In Details
      </h2>
      {courseModule?.length === 0 ? (
        <p className="text-base">No modules were added!</p>
      ) : (
        courseModule
          ?.sort((a, b) => a.moduleNumber - b.moduleNumber)
          .map((item) => (
            <div key={item.id} className="my-2 flex items-center">
              <div className="flex-1">
                <Collapse
                  collapsible="header"
                  expandIconPosition="end"
                  defaultActiveKey={['1']}
                >
                  <Panel
                    className="text-lg font-semibold"
                    header={`Module -  ${item.moduleNumber} : ${item.moduleName}`}
                    key={item.id}
                  >
                    <div className="text-base font-normal">
                      <p className="text-center text-base">
                        Live class number:{item.liveClassNumber}
                      </p>
                      <p className="text-center text-base">
                        Project number:{item.projectNumber}
                      </p>
                      {item.lessons.map((panelLesson) => (
                        <div key={panelLesson.id} className="flex items-center">
                          <Collapse
                            collapsible="header"
                            expandIconPosition="end"
                            defaultActiveKey={['1']}
                            className="flex-1"
                          >
                            <Panel
                              className="text-lg font-semibold mb-2"
                              header={
                                <p className="text-base mb-0 font-normal">
                                  {panelLesson.title}
                                </p>
                              }
                            >
                              <div className="flex flex-col justify-between">
                                {panelLesson?.topics?.map((topic) => (
                                  <div
                                    key={topic.id}
                                    className="flex items-center"
                                  >
                                    <p className="flex-1">{topic.name}</p>
                                    {panelLesson.id === editLesson?.id && (
                                      <button
                                        onClick={() => setEditTopic(topic)}
                                        className="px-2 py-1 ml-2 bg-[#03a9f4] text-white rounded-md text-sm font-normal"
                                      >
                                        Edit Topic
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </Panel>
                          </Collapse>
                          {editValue?.id === item.id && (
                            <button
                              onClick={() => handleEditLessonBtn(panelLesson)}
                              className="px-2 py-1 ml-2 bg-[#7b1fa2] text-white rounded-md"
                            >
                              Edit Lesson
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </Panel>
                </Collapse>
              </div>
              <button
                onClick={() => setEditValue(item)}
                className="px-2 py-1 ml-2 bg-[#01579b] text-white rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteModule(item)}
                className="px-2 py-1 ml-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          ))
      )}
      <div className="grid gap-4 grid-cols-5 mt-10">
        <div className="col-span-1">
          <InputBox
            editVal={editValue?.moduleNumber}
            value={module.moduleNumber}
            title="Module Number"
            name="moduleNumber"
            id="moduleNumber"
            type="number"
            func={handleModuleChange}
          />
        </div>
        <div className="col-span-2">
          <InputBox
            editVal={editValue?.moduleName}
            value={module.moduleName}
            title="Module Name"
            name="moduleName"
            id="moduleName"
            type="text"
            func={handleModuleChange}
          />
        </div>
        <div className="col-span-1">
          <InputBox
            editVal={editValue?.liveClassNumber}
            value={module.liveClassNumber}
            title="Live Class Number"
            name="liveClassNumber"
            id="liveClassNumber"
            type="number"
            func={handleModuleChange}
          />
        </div>
        <div className="col-span-1">
          <InputBox
            editVal={editValue?.projectNumber}
            value={module.projectNumber}
            title="Project Number"
            name="projectNumber"
            id="projectNumber"
            type="number"
            func={handleModuleChange}
          />
        </div>
        <div className="col-span-5 flex items-end gap-4">
          <div className="flex-1">
            <InputBox
              editVal={editLesson?.title}
              disabled={editTopic && editLesson ? true : false}
              value={lesson.title}
              title="Lesson Name"
              name="title"
              id="lessonName"
              type="text"
              func={handleLessonChange}
            />
          </div>
          <div className="flex-1">
            <InputBox
              value={topic.name}
              disabled={editLesson && !editTopic ? true : false}
              title="Topic Name"
              name="topicName"
              id="topicName"
              type="text"
              func={handleTopicChange}
            />
          </div>

          <button
            disabled={editLesson && !editTopic ? true : false}
            onClick={editTopic ? handleEditTopic : handleAddTopic}
            className="px-4 py-[15px] bg-[#001f3f] text-white rounded-md"
          >
            {editTopic ? 'Update' : 'Add Topic'}
          </button>
          <button
            disabled={editTopic ? true : false}
            onClick={editLesson ? handleEditLesson : handleAddLesson}
            className="px-4 py-[15px] bg-[#3d9970] text-white rounded-md"
          >
            {editLesson ? 'Update' : 'Add Lesson'}
          </button>
        </div>
      </div>
      <div className="w-full text-center pt-5 pb-4">
        <button
          onClick={editValue ? handleEditModule : handleAddModule}
          className="px-4 py-3 bg-[#85144b] text-white rounded-md"
        >
          {editValue ? 'Update Module' : 'Submit New Module'}
        </button>
      </div>
    </div>
  );
};

export default AddModule;

const InputBox = ({
  title,
  type,
  id,
  func,
  placeholder,
  name,
  value,
  editVal,
  disabled,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="font-semibold block text-[#17012e]">
        {title} <br />
        {editVal ? (
          <span className="ml-2 italic font-thin">
            (previous:
            <span className=" text-[orangered] ml-2">{editVal}</span>)
          </span>
        ) : (
          ''
        )}
      </label>
      <input
        disabled={disabled}
        value={value}
        id={id}
        onChange={func}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
      />
    </div>
  );
};
