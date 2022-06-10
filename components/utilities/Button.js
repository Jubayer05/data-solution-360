import React from "react";

const Button = ({ color, bgColor, text, size, borderRadius }) => {
  return (
    <button
      type="button"
      style={{
        backgroundColor: bgColor,
        borderRadius,
        color,
      }}
      className={`text-${size} px-3 py-2 hover:drop-shadow-xl `}
      onClick={() => {}}
    >
      {text}
    </button>
  );
};

export default Button;
