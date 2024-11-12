import React, { useEffect, useRef } from 'react';

const InputBoxManage = ({
  title,
  type,
  id,
  func,
  placeholder,
  keyName,
  value,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (type === 'number') {
      const handleWheel = (event) => event.preventDefault();
      const inputElement = inputRef.current;
      if (inputElement) {
        inputElement.addEventListener('wheel', handleWheel);
      }
      // Cleanup to remove the event listener when component unmounts
      return () => {
        if (inputElement) {
          inputElement.removeEventListener('wheel', handleWheel);
        }
      };
    }
  }, [type]);

  return (
    <div className="w-full mt-3">
      <label
        htmlFor={id}
        className={`${
          value ? '' : 'font-bold animate-bounce text-lg'
        } font-semibold mt-3 block text-[#17012e]`}
      >
        {title}{' '}
        {value ? (
          <span className="ml-2 italic font-thin">
            (previous:
            <span className=" text-[orangered] ml-2">{value}</span>)
          </span>
        ) : (
          <span className="ml-2 italic text-red-600 font-semibold">
            (Not Provide)
          </span>
        )}
      </label>
      <input
        ref={inputRef}
        id={id}
        onChange={(e) =>
          func(keyName.toLowerCase().split(' ').join('_'), e.target.value)
        }
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
      />
    </div>
  );
};

export default InputBoxManage;
