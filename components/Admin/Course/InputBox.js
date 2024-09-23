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
            (previous: <span className="text-[orangered] ml-2">{editVal}</span>)
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
        className="w-full px-4 py-2.5 text-base outline-none border-1 mt-1.5 rounded"
      />
    </div>
  );
};

export default InputBox;
