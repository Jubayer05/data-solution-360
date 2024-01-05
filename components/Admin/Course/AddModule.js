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
  title: '',
  id: '',
};

const AddModule = ({ courseModule, setCourseModule }) => {
  const [module, setModule] = useState({ ...initialModuleState });
  const [lesson, setLesson] = useState({ ...initialLessonState });

  const handleAddLesson = () => {
    setModule({
      ...module,
      lessons: [...module.lessons, { ...lesson, id: uuidv4().split('-')[0] }],
    });
    setLesson({ ...initialLessonState });
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
  const handleModuleChange = (e) => {
    setModule({ ...module, [e.target.name]: e.target.value });
  };

  const handleDeleteModule = (item) => {
    setCourseModule(courseModule.filter((x) => x.id !== item.id));
    // console.log(item);
  };

  return (
    <div className="bg-white border-dashed px-6 py-3 mt-5">
      <h2 className="text-xl text text-center my-4 font-bold">
        Study Plan In Details
      </h2>
      {courseModule.length === 0 ? (
        <p className="text-base">No modules were added!</p>
      ) : (
        courseModule
          .sort((a, b) => a.moduleNumber - b.moduleNumber)
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
                        <p key={panelLesson.id}>{panelLesson.title}</p>
                      ))}
                    </div>
                  </Panel>
                </Collapse>
              </div>
              <button
                onClick={() => handleDeleteModule(item)}
                className="px-4 py-3 mx-4 bg-red-500 text-white rounded-md"
              >
                Delete Module
              </button>
            </div>
          ))
      )}
      <div className="grid gap-4 grid-cols-4 mt-10">
        <div className="col-span-1">
          <InputBox
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
            value={module.projectNumber}
            title="Project Number"
            name="projectNumber"
            id="projectNumber"
            type="number"
            func={handleModuleChange}
          />
        </div>
        <div className="col-span-3 flex items-end">
          <div className="flex-1">
            <InputBox
              value={lesson.title}
              title="Lesson Name"
              name="title"
              id="lessonName"
              type="text"
              func={handleLessonChange}
            />
          </div>

          <button
            onClick={handleAddLesson}
            className="px-4 py-4 mx-2 bg-blue-500 text-white rounded-md"
          >
            Add Lessons
          </button>
        </div>
      </div>
      <div className="w-full text-center pt-5 pb-4">
        <button
          onClick={handleAddModule}
          className="px-4 py-3 bg-blue-500 text-white rounded-md"
        >
          Submit Module
        </button>
      </div>
    </div>
  );
};

export default AddModule;

const InputBox = ({ title, type, id, func, placeholder, name, value }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="font-semibold block text-[#17012e]">
        {title}
      </label>
      <input
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
