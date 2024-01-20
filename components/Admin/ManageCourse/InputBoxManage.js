import React from 'react';

const InputBoxManage = ({ title, type, id, func, placeholder, value }) => {
  return (
    <div className="w-full mt-5">
      <label htmlFor={id} className="font-semibold mt-3 block text-[#17012e]">
        {title}{' '}
        <span className="ml-2 italic font-thin">
          (previous:
          <span className=" text-[orangered] ml-2">{value}</span>)
        </span>
      </label>
      <input
        id={id}
        onChange={(e) =>
          func(title.toLowerCase().split(' ').join('_'), e.target.value)
        }
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
      />
    </div>
  );
};

export default InputBoxManage;
