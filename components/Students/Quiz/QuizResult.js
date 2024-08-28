import React from 'react';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { MdOutlineCancel } from 'react-icons/md';

const QuizResult = ({ quizData, selectedAnswers }) => {
  return (
    <div>
      {quizData.map((question, index) => {
        const userAnswer = selectedAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;

        return (
          <div key={index} className="mb-16">
            <p className="mb-2 text-gray-700 font-bold p-4">
              <span className="text-2xl">{index + 1}. </span>
              {question.question}
            </p>
            <div>
              {question.options.map((option, optionIndex) => {
                const isUserAnswer = userAnswer === option;
                const isOptionCorrect = option === question.correctAnswer;
                let bgColor = '';
                if (isUserAnswer) {
                  bgColor = isOptionCorrect
                    ? 'bg-[#f6fef9] border-2 border-[rgba(18,183,106)]'
                    : 'bg-[#fffbfa] border-2 border-[rgba(240,68,56)]';
                }

                return (
                  <div
                    key={optionIndex}
                    className={`cursor-pointer p-4 mb-4 rounded-lg border flex items-center 
                      justify-between ${bgColor} gap-2`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex items-center justify-center w-7 h-7 ${
                          isUserAnswer
                            ? 'bg-[#101828] text-white'
                            : 'bg-[#eaecf0]'
                        } rounded-full font-bold`}
                      >
                        {optionIndex + 1}
                      </div>
                      {option}
                    </div>
                    <div>
                      {isOptionCorrect ? (
                        <div className="bg-[#d1fadf] rounded-full p-1.5">
                          <FaRegCircleCheck className="text-lg text-[#1fbc72]" />
                        </div>
                      ) : isUserAnswer && !isOptionCorrect ? (
                        <div className="bg-[#fee4ea] rounded-full  p-1">
                          <MdOutlineCancel className="text-2xl text-[#f1554a]" />
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <hr className="mt-5 " />
          </div>
        );
      })}
    </div>
  );
};

export default QuizResult;
