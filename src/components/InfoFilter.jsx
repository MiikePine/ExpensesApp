import React, { useEffect } from "react";
import InfoFilter2 from "./InfoFilter2";
import { useState } from "react";
import {BsFillArrowUpCircleFill} from "react-icons/Bs";
import {BsFillArrowDownCircleFill} from "react-icons/Bs";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const InfoFilter = ({user, onDeletingUser}) => {
  const [isVisible, setIsVisible] = useState(false);

  function handleVisibility() {
    setIsVisible(!isVisible);
  }

  function closeFilter() {
    setIsVisible(false);
  }

  const deleteUser = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(`http://localhost:3000/posts/${user.id}`, requestOptions);
    if (response.ok) {  
      console.log("Delete was successful");
      onDeletingUser(user);
      toast.error("membre supprimé avec succès");
    } else {
      console.log("HTTP-Error: " + response.status);
    }
  }


  return (
        
        
    <div>
    <div className="flex md:flex md:text-left justify-start items-center text-zinc-500 py-4">
      <div className="text-base md:text-sm md:block basis-1/4 md:pl-16">{user.item}</div>
      <div className="text-base md:text-sm md:block basis-1/4 md:pl-16">{user.category}</div>
      <div className="text-xl md:text-sm md:block basis-1/4 md:pl-16">{user.payBy}</div>
      <div className="flex">
        <div className="text-xl md:text-base md:block py-0 md:py-0 basis-1/4 md:pl-20">{user.price}</div>
        <p className="text-xs align-bottom">CHF</p>
      </div>
      <div className="text-xl md:text-sm md:block py-0 md:py-0 basis-1/4 md:pl-32">
        {user.dateValue}
      </div>
    </div>
    <div className="border-b-2 border-neutral-300 pb-2 md:pb-0 md:mx-2"></div>
  </div>
  );
};

export default InfoFilter;

