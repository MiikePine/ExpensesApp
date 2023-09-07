import React, { useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../supabase/supabase";
import { useDispatch, useSelector } from 'react-redux';

function RegisterSuccess() {
  const [isOpen, setIsOpen] = useState(true); // Define and set isOpen to true or false as needed

  return (
    isOpen && (
      <div className={`fixed inset-0 flex justify-center items-center ${isOpen ? "block" : "hidden"} z-50`}>
      <div className="w-screen md:w-2/6 h-110 bg-zinc-100 p-4 relative shadow-xxl">
        <span>hello</span>
      </div>
    </div>
    )
  );
}

export default RegisterSuccess;
