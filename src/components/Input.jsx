import React from "react";

const Input = ({ id, register, error, type, placeholder }) => {
  return (
    <div>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`border px-3 py-2 bg-white focus:outline-none shadow-md w-full rounded-xl focus:ring-2 focus:ring-opacity-40 focus:ring-teal-700 ${
          error ? "border-red" : "border-gray"
        }`}
        {...register}
      />
    </div>
  );
};

export default Input;
