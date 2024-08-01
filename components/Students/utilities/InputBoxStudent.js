import React from 'react';

const InputBoxStudent = ({ title, type, id, func, placeholder, value }) => {
  return (
    <div className="w-full mt-5">
      <label htmlFor={id} className="font-semibold mt-3 block text-[#17012e]">
        {title}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) =>
          func(title.toLowerCase().split(' ').join('_'), e.target.value)
        }
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-lg outline-[#ff440031] border-1 mt-2 rounded"
      />
    </div>
  );
};

export default InputBoxStudent;
