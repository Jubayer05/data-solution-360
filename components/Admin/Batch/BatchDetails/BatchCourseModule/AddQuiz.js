import React, { useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import ButtonDashboard from '../../../../utilities/dashboard/ButtonDashboard';
import InputBox from '../../../Course/InputBox';

const initQuizState = {
  id: '1', // You can dynamically set this as needed
  question: '',
  options: [
    { id: 'a', text: '' },
    { id: 'b', text: '' },
    { id: 'c', text: '' },
    { id: 'd', text: '' },
  ],
  correct_answer: '', // Will be set by react-select
};

const AddQuiz = ({
  moduleData,
  setModuleData,
  updateModuleInFirestore,
  currentLesson,
  setCurrentLesson,
}) => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(initQuizState);
  const [numberOfQuiz, setNumberOfQuiz] = useState(1);

  // Options for react-select (mapped from current options)
  const selectOptions = currentQuiz.options.map((option) => ({
    value: option.text,
    label: option.text || `Option ${option.id.toUpperCase()}`,
  }));

  const handleAddQuiz = () => {
    // Check if the question is filled
    if (!numberOfQuiz) {
      Swal.fire(
        'Warning',
        'Please enter how many question do you want to add.',
        'warning',
      );
      return;
    }

    // Check if the question is filled
    if (!currentQuiz.question.trim()) {
      Swal.fire('Warning', 'Please enter the quiz question.', 'warning');
      return;
    }

    // Check if all options are filled
    const isOptionsFilled = currentQuiz.options.every((option) =>
      option.text.trim(),
    );
    if (!isOptionsFilled) {
      Swal.fire('Warning', 'Please fill in all the options.', 'warning');
      return;
    }

    // Check if the correct answer is selected
    if (!currentQuiz.correct_answer) {
      Swal.fire('Warning', 'Please select the correct answer.', 'warning');
      return;
  }

    const updatedModuleData = {
      ...moduleData,
      additionalInfo: {
        ...moduleData?.additionalInfo,
        totalQuizNum: (moduleData?.additionalInfo?.totalQuizNum || 0) + 1,
      },
      lessons: moduleData.lessons.map((lesson) =>
        lesson.id === currentLesson.id
          ? {
              ...currentLesson,
              quizData: [
                ...(currentLesson.quizData || []),
                {
                  ...currentQuiz,
                  id: uuidv4().split('-')[0], // Generate unique ID for the quiz
                  correct_answer: currentQuiz.correct_answer.trim(), //
                },
              ],
            }
          : lesson,
      ),
    };
    setModuleData(updatedModuleData);
    updateModuleInFirestore(updatedModuleData);

    // Reset the quiz form
    setCurrentQuiz(initQuizState);
  };

  const handleSubmitQuiz = () => {};

  return (
    <div className="bg-white border-1 p-5 rounded-lg mt-5">
      <h2 className="text-lg pb-2 text-[#fc3376] text-center font-medium font-dash_heading ">
        Add Quiz
      </h2>

      <div className="relative">
        {/* Quiz Question */}
        <div className="flex gap-3 items-end mt-3">
          <InputBox
            className="py-1"
            title="Enter your quiz question"
            placeholder="Which of the following is a programming language?"
            value={currentQuiz.question}
            func={(id, value) =>
              setCurrentQuiz({
                ...currentQuiz,
                question: value,
              })
            }
          />
        </div>

        {/* Quiz Options */}
        <div className="grid grid-cols-2 gap-3 items-end my-3">
          <InputBox
            className="py-1"
            title="Option A"
            placeholder="HTML"
            value={currentQuiz.options[0].text}
            func={(id, value) =>
              setCurrentQuiz({
                ...currentQuiz,
                options: currentQuiz.options.map((option) =>
                  option.id === 'a' ? { ...option, text: value } : option,
                ),
              })
            }
          />
          <InputBox
            className="py-1"
            title="Option B"
            placeholder="Python"
            value={currentQuiz.options[1].text}
            func={(id, value) =>
              setCurrentQuiz({
                ...currentQuiz,
                options: currentQuiz.options.map((option) =>
                  option.id === 'b' ? { ...option, text: value } : option,
                ),
              })
            }
          />
          <InputBox
            className="py-1"
            title="Option C"
            placeholder="SQL"
            value={currentQuiz.options[2].text}
            func={(id, value) =>
              setCurrentQuiz({
                ...currentQuiz,
                options: currentQuiz.options.map((option) =>
                  option.id === 'c' ? { ...option, text: value } : option,
                ),
              })
            }
          />
          <InputBox
            className="py-1"
            title="Option D"
            placeholder="CSS"
            value={currentQuiz.options[3].text}
            func={(id, value) =>
              setCurrentQuiz({
                ...currentQuiz,
                options: currentQuiz.options.map((option) =>
                  option.id === 'd' ? { ...option, text: value } : option,
                ),
              })
            }
          />
        </div>

        {/* React-Select for selecting correct answer */}
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Correct Answer
          </label>
          <Select
            options={selectOptions}
            onChange={(selectedOption) =>
              setCurrentQuiz({
                ...currentQuiz,
                correct_answer: selectedOption.value, // Update the correct answer
              })
            }
            className="py-2"
            value={
              currentQuiz.correct_answer
                ? selectOptions.find(
                    (option) => option.value === currentQuiz.correct_answer,
                  )
                : null // Show placeholder if no answer is selected
            }
            placeholder="Select the correct answer"
          />
        </div>

        <div className="flex justify-center">
          <ButtonDashboard
            onClick={handleAddQuiz}
            className="bg-primary_btn hover:bg-[#002346bc] text-white py-2.5 w-2/5"
          >
            Add Quiz
          </ButtonDashboard>
        </div>
      </div>
    </div>
  );
};

export default AddQuiz;
