import { Collapse } from 'antd';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  initialLessonState,
  initialModuleState,
  initialTopicState,
} from './initState';
import ModuleForm from './ModuleForm';
const { Panel } = Collapse;

const AddModule = ({ courseModule, setCourseModule }) => {
  const [module, setModule] = useState({ ...initialModuleState });
  const [moduleEdit, setModuleEdit] = useState(null);
  const [lesson, setLesson] = useState({ ...initialLessonState });
  const [topic, setTopic] = useState({ ...initialTopicState });
  const [editValue, setEditValue] = useState(null);
  const [editLesson, setEditLesson] = useState(null);
  const [editTopic, setEditTopic] = useState(null);
  const [addNewTopic, setAddNewTopic] = useState(false);
  const [addNewLesson, setAddNewLesson] = useState(false);

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

    // NOTE: BACK TO ORIGINAL STATE
    backOriginalState();
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

  const handleRemoveLesson = (item) => {
    const remainingLessons = editValue?.lessons.filter(
      (val) => val.id !== item.id,
    );

    // call the update module function
    const courseModuleCopy = [...courseModule];
    const updatedModule = { ...editValue, lessons: remainingLessons };
    const moduleIndex = courseModule.findIndex((x) => x.id === editValue.id);
    courseModuleCopy[moduleIndex] = updatedModule;
    setCourseModule(courseModuleCopy);

    // NOTE: BACK TO ORIGINAL STATE
    backOriginalState();
  };

  const handleAddNewLessonFunc = () => {
    const newLessons = [
      ...editValue?.lessons,
      { ...lesson, id: uuidv4().split('-')[0] },
    ];

    // call the update module function
    const courseModuleCopy = [...courseModule];
    const updatedModule = { ...editValue, lessons: newLessons };
    const moduleIndex = courseModule.findIndex((x) => x.id === editValue.id);
    courseModuleCopy[moduleIndex] = updatedModule;
    setCourseModule(courseModuleCopy);

    // NOTE: BACK TO ORIGINAL STATE
    backOriginalState();
  };

  // NOTE: EDIT TOPIC FUNCTION
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

  const handleRemoveTopic = (item) => {
    const updatedLesson = editValue?.lessons.find(
      (val) => val.id === editLesson.id,
    );
    const findUpdatedLessonIndex = editValue?.lessons.findIndex(
      (val) => val.id === editLesson.id,
    );

    const remainingTopics = updatedLesson.topics.filter(
      (val) => val.id !== item.id,
    );

    updatedLesson.topics = remainingTopics;
    editValue.lessons[findUpdatedLessonIndex] = updatedLesson;

    // call the update module function
    const courseModuleCopy = [...courseModule];
    const updatedModule = { ...editValue };
    const moduleIndex = courseModule.findIndex((x) => x.id === editValue.id);
    courseModuleCopy[moduleIndex] = updatedModule;
    setCourseModule(courseModuleCopy);

    // NOTE: BACK TO ORIGINAL STATE
    backOriginalState();
  };

  const handleAddNewTopicFunc = () => {
    const updatedLesson = editValue?.lessons.find(
      (val) => val.id === editLesson.id,
    );
    const findUpdatedLessonIndex = editValue?.lessons.findIndex(
      (val) => val.id === editLesson.id,
    );

    const newTopics = [
      ...updatedLesson.topics,
      { ...topic, id: uuidv4().split('-')[0] },
    ];
    updatedLesson.topics = newTopics;
    editValue.lessons[findUpdatedLessonIndex] = updatedLesson;

    // call the update module function
    const courseModuleCopy = [...courseModule];
    const updatedModule = { ...editValue };
    const moduleIndex = courseModule.findIndex((x) => x.id === editValue.id);
    courseModuleCopy[moduleIndex] = updatedModule;
    setCourseModule(courseModuleCopy);

    // NOTE: BACK TO ORIGINAL STATE
    backOriginalState();
  };

  const handleAddNewTopic = (item) => {
    setAddNewTopic(!addNewTopic);
  };

  const handleAddNewLesson = (item) => {
    setAddNewTopic(false);
    setAddNewLesson(!addNewLesson);
  };

  const handleEditLessonBtn = (item) => {
    setEditLesson(item);
    setEditTopic(null);
  };

  const backOriginalState = () => {
    setModuleEdit(null);
    setEditValue(null);
    setEditLesson(null);
    setEditTopic(null);
    setLesson({ ...initialLessonState });
    setModule({ ...initialModuleState });
    setTopic({ ...initialTopicState });
    setAddNewLesson(false);
    setAddNewTopic(false);
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
                          <div className="flex-1">
                            <Collapse
                              collapsible="header"
                              expandIconPosition="end"
                              defaultActiveKey={['1']}
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
                                        <>
                                          <button
                                            onClick={() => setEditTopic(topic)}
                                            className="px-2 py-1 ml-2 text-[12px] bg-[#03a9f4] text-white rounded-md font-normal"
                                          >
                                            Edit
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleRemoveTopic(topic)
                                            }
                                            className="px-2 py-1 ml-2 text-[12px] bg-[#ff416a] text-white rounded-md"
                                          >
                                            Delete
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  ))}
                                  {panelLesson.id === editLesson?.id && (
                                    <button
                                      onClick={() => handleAddNewTopic(topic)}
                                      className="px-2 py-1 ml-2 text-[12px] bg-[#ff416a] text-white rounded-md"
                                    >
                                      {addNewTopic ? 'Clear' : 'Add New Topics'}
                                    </button>
                                  )}
                                </div>
                              </Panel>
                            </Collapse>
                          </div>
                          {editValue?.id === item.id && (
                            <>
                              <button
                                onClick={() => handleEditLessonBtn(panelLesson)}
                                className="px-2 py-1 ml-2 text-[12px] bg-[#7b1fa2] text-white rounded-md"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleRemoveLesson(panelLesson)}
                                className="px-2 py-1 ml-2 text-[12px] bg-[#ff416a] text-white rounded-md"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      ))}
                      {editValue?.id === item.id && (
                        <button
                          onClick={() => handleAddNewLesson(topic)}
                          className="px-2 py-1 text-[14px] bg-[#6741ff] w-full text-white rounded-md"
                        >
                          {addNewLesson ? 'Clear' : 'Add New Lesson'}
                        </button>
                      )}
                    </div>
                  </Panel>
                </Collapse>
              </div>
              <button
                onClick={() => setEditValue(item)}
                className="px-2 py-1 ml-2 text-[12px] bg-[#01579b] text-white rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteModule(item)}
                className="px-2 py-1 ml-2 text-[12px] bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          ))
      )}
      <ModuleForm
        editValue={editValue}
        addNewLesson={addNewLesson}
        handleModuleChange={handleModuleChange}
        editLesson={editLesson}
        editTopic={editTopic}
        addNewTopic={addNewTopic}
        lesson={lesson}
        handleLessonChange={handleLessonChange}
        handleTopicChange={handleTopicChange}
        topic={topic}
        handleAddTopic={handleAddTopic}
        handleAddLesson={handleAddLesson}
      />
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
