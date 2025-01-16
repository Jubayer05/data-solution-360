import { CircleCheck, X } from 'lucide-react';
import React from 'react';

const QuizResult = ({ userAlreadyGiveQuiz }) => {
  const quizData = userAlreadyGiveQuiz?.quizDataUser;

  return (
    <div>
      {quizData?.map((quiz, index) => {
        return (
          <div key={index} className="mb-16">
            <p className="mb-2 text-gray-700 font-bold p-4">
              <span className="text-2xl">{index + 1}. </span>
              {quiz.question}
            </p>
            <div>
              {quiz.options.map((option, optionIndex) => {
                const isUserAnswer = quiz.user_answer === option.text;
                const isOptionCorrect = option.text === quiz.correct_answer;
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
                      {option.text}
                    </div>
                    <div>
                      {isOptionCorrect ? (
                        <div className="bg-[#d1fadf] rounded-full p-1.5">
                          <CircleCheck className="text-lg text-[#1fbc72]" />
                        </div>
                      ) : isUserAnswer && !isOptionCorrect ? (
                        <div className="bg-[#fee4ea] rounded-full  p-1">
                          <X className="text-2xl text-[#f1554a]" />
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
