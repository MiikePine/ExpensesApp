import React, { useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../supabase/supabase";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


function RegisterSuccess() {
  const [isOpen, setIsOpen] = useState(true); // Define and set isOpen to true or false as needed
  const navigate = useNavigate(); // Get the navigate function from react-router-dom


  const handleOkClick = () => {
    // Navigate to the login page when "Ok" is clicked
    navigate("/");
  };


  return (
    isOpen && (
      <div className={`fixed inset-0 flex justify-center items-center ${isOpen ? "block" : "hidden"} z-50`}>
      <div className="w-screen md:w-1/4 h-1/4 bg-zinc-100 p-4 relative shadow-xxl">
        <span>Registation wih sucess. Please check your email to confirm</span>
        <button
            type="button" // Change type to "button" to prevent form submission
            className="w-1/3 py-3 mt-4 font-bold bg-teal-700 text-white border-2 bg-red border-red
             hover:bg-white hover:text-teal-700 hover:border-2 hover:border-teal-700 focus:outline-none focus:ring-2
              focus:ring-teal-700 focus:ring-opacity-50"
            onClick={handleOkClick}
          >
            Ok
          </button>
      </div>
    </div>
    )
  );
}

export default RegisterSuccess;
