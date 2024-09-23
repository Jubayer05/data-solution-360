import React from 'react';
import InputBox from '../InputBox';

const ModuleForm = ({
  editValue,
  addNewLesson,
  handleModuleChange,
  editLesson,
  editTopic,
  addNewTopic,
  lesson,
  handleLessonChange,
  handleTopicChange,
  topic,
  handleAddTopic,
  handleAddLesson,
}) => {
  return (
    <div className="grid gap-4 grid-cols-5 mt-10">
      <div className="col-span-1">
        <InputBox
          editVal={editValue?.moduleNumber}
          disabled={addNewLesson ? true : false}
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
          disabled={addNewLesson ? true : false}
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
          disabled={addNewLesson ? true : false}
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
          disabled={addNewLesson ? true : false}
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
            disabled={(editTopic && editLesson) || addNewTopic ? true : false}
            value={lesson?.title}
            title="Lesson Name"
            name="title"
            id="lessonName"
            type="text"
            func={handleLessonChange}
          />
        </div>
        <div className="flex-1">
          {!addNewTopic ? (
            <InputBox
              value={topic?.name}
              disabled={editLesson && !editTopic ? true : false}
              title="Topic Name"
              name="topicName"
              id="topicName"
              type="text"
              func={handleTopicChange}
            />
          ) : (
            <InputBox
              value={topic?.name}
              title="Topic Name"
              name="topicName"
              id="topicName"
              type="text"
              func={handleTopicChange}
            />
          )}
        </div>

        {addNewTopic ? (
          <button
            onClick={handleAddNewTopicFunc}
            className="px-4 py-[15px] bg-[#001f3f] text-white rounded-md"
          >
            Add New Topic
          </button>
        ) : (
          <button
            disabled={editLesson && !editTopic ? true : false}
            onClick={editTopic ? handleEditTopic : handleAddTopic}
            className="px-4 py-[15px] bg-[#001f3f] text-white rounded-md"
          >
            {editTopic ? 'Update' : 'Add Topic'}
          </button>
        )}

        {/* NOTE: BUTTON FOR ADD NEW LESSONS AND EDIT LESSONS */}
        {addNewLesson ? (
          <button
            onClick={handleAddNewLessonFunc}
            className="px-4 py-[15px] bg-[#3d9970] text-white rounded-md"
          >
            Add New Lesson
          </button>
        ) : (
          <button
            disabled={editTopic ? true : false}
            onClick={editLesson ? handleEditLesson : handleAddLesson}
            className="px-4 py-[15px] bg-[#3d9970] text-white rounded-md"
          >
            {editLesson ? 'Update' : 'Add Lesson'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ModuleForm;
