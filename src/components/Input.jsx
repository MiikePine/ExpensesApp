import React from "react";


const Input = ({ id, register, error, type, placeholder }) => {
  return (
    <div>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`border px-3 py-2 rounded-lg bg-[#E9E9E9] focus:outline-none w-full focus:ring-2 focus:ring-opacity-40 focus:ring-red ${
        error ? "border-red" : "border-gray"
      }`}
      {...register}
    />
    </div>
  );
};

export default Input;
