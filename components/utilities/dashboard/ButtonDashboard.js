const ButtonDashboard = ({
  children,
  onClick,
  type = 'button',
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-5 py-2 bg-[#001f3f0e] rounded flex items-center font-semibold
            justify-center hover:bg-[#001f3f27] transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonDashboard;
