import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillSetting,AiOutlineFileAdd } from "react-icons/Ai";
import { MdLogout, MdOutlineSavings } from "react-icons/Md";
import { RiBillLine } from "react-icons/Ri";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";




const Menu = (props) => {


  return (
<section className="sticky top-0 left-0 hidden bg-white px-0 md:flex md:flex-col h-screen w-72 mx-2 md:mt-4 md:ml-4 shadow-xl">
  
      <div className=" md:block w-44 h-20 mt-0 ml-6">
          <img src="images/logo.png" ></img>
      </div>

      <Link to="/Menu">
      <button onClick={props.handleVisibility}></button></Link>
                       

      <div className="flex flex-col h-full w-full justify-between text-xl mt-10 ">
                  <div className="hidden md:block mt-5 md:w-full">


                        <div className="w-full">
                              <NavLink
                                    to="/Dashboard"
                                    className={({ isActive, isPending }) =>
                                      isPending
                                        ? ""
                                        : isActive
                                        ? "py-3 px-4 px-full flex text-sm bg-teal-700 border-teal-300 border-r-8 text-white md:max-w-sm items-center"
                                        : "p-5 flex text-sm bg-white text-teal-700 md:max-w-sm items-center rounded-md"
                                      }>
                                    <RxDashboard size={20} className="mr-4"/>
                                    Dashboard
                              </NavLink>
                        </div>


                          <div  className="w-full">
                                <NavLink  
                                      to="/Expenses"
                                      className={({ isActive, isPending }) =>
                                        isPending
                                          ? ""
                                          : isActive
                                          ? "py-3 px-4 px-full flex text-sm bg-teal-700 border-teal-300 border-r-8 text-white md:max-w-sm items-center"
                                          : "p-5 flex text-sm bg-white text-teal-700 md:max-w-sm items-center rounded-md"
                                        }>
                                      <RiBillLine size={20} className="mr-4" />
                                      Expenses
                                  </NavLink>
                          </div>



                          <div className="w-full">
                              <NavLink  
                                    to="/Incoming"
                                    className={({ isActive, isPending }) =>
                                      isPending
                                        ? ""
                                        : isActive
                                        ? "py-3 px-4 px-full flex text-sm bg-teal-700 border-teal-300 border-r-8 text-white md:max-w-sm items-center"
                                        : "p-5 flex text-sm bg-white text-teal-700 md:max-w-sm items-center rounded-md"
                                        }>
                                    <AiOutlineFileAdd size={20} className="mr-4" />
                                    Incomings
                            </NavLink> 
                          </div>




                            <div className="w-full">
                                  <NavLink  
                                      to="/Savings"
                                      className={({ isActive, isPending }) =>
                                        isPending
                                          ? ""
                                          : isActive
                                          ? "py-3 px-4 px-full flex text-sm bg-teal-700 border-teal-300 border-r-8 text-white md:max-w-sm items-center"
                                          : "p-5 flex text-sm bg-white text-teal-700 md:max-w-sm items-center rounded-md"
                                        }>
                                      <MdOutlineSavings size={20} className="mr-4" />
                                      Savings
                                 </NavLink>
                            </div>
                 </div>



          {/* Menu inferieur */}
                  <div className= " hidden md:block mb-16 max-w">
                      <div className="mb-4">
                            <NavLink  
                                    to="/Settings"
                                    className={({ isActive, isPending }) =>
                                      isPending
                                        ? ""
                                        : isActive
                                        ? "py-3 px-4 px-full flex text-sm bg-teal-700 border-teal-300 border-r-8 text-white md:max-w-sm items-center"
                                        : "p-5 flex text-sm bg-white text-teal-700 md:max-w-sm items-center rounded-md"
                                    }>
                                    <AiFillSetting size={20} className="mr-4"/>
                                    Settings
                              </NavLink>
                      </div>


                      <NavLink  
                            to="/Logout"
                            className={({ isActive, isPending }) =>
                              isPending
                                ? ""
                                : isActive
                                ? "py-3 px-4 px-full flex text-sm bg-teal-700 border-teal-300 border-r-8 text-white md:max-w-sm items-center"
                                : "p-5 flex text-sm bg-white text-teal-700 md:max-w-sm items-center rounded-md"
                              }
                          >
                            <MdLogout size={20} className="mr-4"/> Logout
                      </NavLink>
                  </div>
      </div>
    </section>
  );
};

export default Menu;

