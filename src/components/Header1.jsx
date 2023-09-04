import React, { useEffect, useState } from "react";
import { BiHomeAlt, BiSolidUser } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import Search from "./Search";
import Months from "./Months";
import supabase from "../../supabase/supabase";
import { useSelector } from "react-redux";

function Header1({ handleSelectMonth, selectedMonth }) {
  const [userEmail, setUserEmail] = useState(""); // Initialize userEmail state
  const [UserUID, setUserUID] = useState(null);

  const fetchUserDataInc = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (data.session !== null) {
      const user = data.session.user;
      setUserUID(user.email);

      // Fetch user's email
      const userEmail = user.email; // Get the user's email
      setUserEmail(userEmail); // Set the userEmail state
      console.log("LOG 4 - User UID set: incoming", user.id);
      console.log("User Email: incoming", userEmail); // Log the user's email

      fetchIncoming();
    } else {
      console.log("error 3 - No user session available. incoming");
    }
  };

  useEffect(() => {
    fetchUserDataInc();
  }, []); // Fetch user data when the component mounts

  return (
    <div className="text-zinc-600 pt-2 pb-6 w-full px-10 mt-4">
      <div className="flex justify-between items-center w-full">
        <div className="gap-2 h-1 items-center flex w-500 z-50">
          <Months
            className="cursor-pointer"
            onMonthChange={handleSelectMonth}
            selectedMonth={selectedMonth}
          />
        </div>
        <div>
          <Search />
        </div>
        <div className="flex gap-2">
          <span className="flex text-sm items-center">{userEmail}</span> {/* Display user email */}
          <BiSolidUser size={20} />
        </div>
      </div>
    </div>
  );
}

export default Header1;
