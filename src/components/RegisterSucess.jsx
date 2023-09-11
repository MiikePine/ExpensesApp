import React, { useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../supabase/supabase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../Images/logo2.png";


function RegisterSuccess() {
  const [isOpen, setIsOpen] = useState(true); // Define and set isOpen to true or false as needed
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleOkClick = () => {
    // Navigate to the login page when "Ok" is clicked
    navigate("/");
  };

  return (
    isOpen && (
      <div
        className={`fixed inset-0 flex justify-center items-center ${
          isOpen ? "block" : "hidden"
        } z-50`}
      >
        
        <div className="w-screen md:w-1/3 h-2/5 bg-zinc-100 p-4 relative shadow-xxl">
        <div className="hidden md:flex absolute  top-0  left-0 md:mt-0 ml-2">
          <img src={logo} alt="Logo" className="h-12 md:h-36 mt-[-30px] ml-[-14px]" />
        </div>
         
          <div className="flex flex-col items-center justify-center h-full mt-8">
            <div className="grid px-10 text-center ">
              <span className="text-xl text-black md:text-2xl mb-4">
                Registration successful.
              </span>
              <span className="">
                Please check your email to confirm
              </span>
            </div>
            <div className=" justify-center items-center mt-10">
              <button
                type="button" 
                className=" py-3 px-10 justify-center font-bold bg-teal-700 text-white border-2 bg-red border-red
                 hover:bg-white hover:text-teal-700 hover:border-2 hover:border-teal-700 focus:outline-none focus:ring-2
                  focus:ring-teal-700 focus:ring-opacity-50"
                onClick={handleOkClick}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default RegisterSuccess;
