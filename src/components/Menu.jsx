import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillSetting, AiOutlineFileAdd } from "react-icons/ai";
import { MdLogout, MdOutlineSavings } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import logo from "../../Images/logo2.png";
import supabase from "../../supabase/supabase"; 

const Menu = (props) => {
const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut(); // Chame o método signOut do supabase
      if (error) {
        throw error;
      } else {
        navigate("/"); // Redirecione para a página inicial após o logout
      }
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };





  return (
    <section className="sticky top-0 left-0 hidden bg-white px-0 md:flex md:flex-col h-screen w-72 mx-2 md:mt-4 md:ml-4 shadow-xl rounded-xl">
      <div className=" md:block w-44 h-20 mt-0 ml-6">
      <img src={logo} alt="Logo" className="h-30 md:h-56 mt-[-30px] ml-[-10px]" />
      </div>

      <Link to="/Menu">
        <button onClick={props.handleVisibility}></button>
      </Link>

      <div className="flex flex-col h-full w-full justify-between text-xl mt-10 ">
        <div className="hidden md:block mt-5 md:w-full">
          <div className="w-full group-hover:scale-105">
            <NavLink
              to="/Dashboard"
              className={({ isActive }) => clsx(
                'py-3 px-4 flex text-sm border-e-3 group',
                {
                  'py-3 px-4 my-1 px-full flex text-sm bg-teal-700 border-teal-300 border-r-8 text-white md:max-w-sm items-center ': isActive,
                  'py-3 px-4 my-1 flex text-sm bg-white hover:bg-zinc-100 hover:border-teal-500 hover:border-r-8 text-teal-700 md:max-w-sm items-center': !isActive
                }
              )}>
              <RxDashboard size={20} className="mr-4 group-hover:scale-105 " />
              <span className="transition-transform group-hover:scale-105">
              Dashboard
              </span>
            </NavLink>
          </div>

          <div className="w-full group-hover:scale-110">
            <NavLink
              to="/Expenses"
              className={({ isActive }) => clsx(
                'py-3 px-4 flex text-sm border-e-3 group',
                {
                  'py-3 px-4 my-1 px-full flex text-sm bg-teal-700 border-teal-300 border-r-8 text-white md:max-w-sm items-center ': isActive,
                  'py-3 px-4 my-1 flex text-sm bg-white hover:bg-zinc-100 hover:border-teal-500 hover:border-r-8 text-teal-700 md:max-w-sm items-center': !isActive
                }
              )}>
               <AiOutlineFileAdd size={20} className="mr-4 group-hover:scale-105 " />
              <span className="transition-transform group-hover:scale-105">
              Expenses
              </span>
            </NavLink>
          </div>

          <div className="w-full">
            <NavLink
              to="/Incoming"
              className={({ isActive }) => clsx(
                'py-3 px-4 flex text-sm border-e-3 group',
                {
                  'py-3 px-4 my-1 px-full flex text-sm bg-teal-700 border-teal-300 border-r-8 text-white md:max-w-sm items-center ': isActive,
                  'py-3 px-4 my-1 flex text-sm bg-white hover:bg-zinc-100 hover:border-teal-500 hover:border-r-8 text-teal-700 md:max-w-sm items-center': !isActive
                }
              )}>
              <AiOutlineFileAdd size={20} className="mr-4 group-hover:scale-105 " />
              <span className="transition-transform group-hover:scale-105">
              Incomings
              </span>
            </NavLink>
          </div>

          <div className="w-full">
            <NavLink
              to="/Savings"
              className={({ isActive }) => clsx(
                'py-3 px-4 flex text-sm border-e-3 group',
                {
                  'py-3 px-4 my-1 px-full flex text-sm bg-teal-700 border-teal-300 border-r-8 text-white md:max-w-sm items-center ': isActive,
                  'py-3 px-4 my-1 flex text-sm bg-white hover:bg-zinc-100 hover:border-teal-500 hover:border-r-8 text-teal-700 md:max-w-sm items-center': !isActive
                }
              )}>
              <AiOutlineFileAdd size={20} className="mr-4 group-hover:scale-105 " />
              <span className="transition-transform group-hover:scale-105">
              Savings
              </span>            </NavLink>
          </div>
          <div className="w-full">
            <NavLink
              to="/Banking"
              className={({ isActive }) => clsx(
                'py-3 px-4 flex text-sm border-e-3 group',
                {
                  'py-3 px-4 my-1 px-full flex text-sm bg-teal-700 border-teal-300 border-r-8 text-white md:max-w-sm items-center ': isActive,
                  'py-3 px-4 my-1 flex text-sm bg-white hover:bg-zinc-100 hover:border-teal-500 hover:border-r-8 text-teal-700 md:max-w-sm items-center': !isActive
                }
              )}>
              <AiOutlineFileAdd size={20} className="mr-4 group-hover:scale-105 " />
              <span className="transition-transform group-hover:scale-105">
              Banking
              </span>
            </NavLink>
          </div>




        </div>

        {/* Menu inferieur */}
        <div className=" hidden md:block mb-16 max-w">
        <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? ""
                  : isActive
                  ? "py-3 px-4 my-1 px-full flex text-sm bg-teal-700 border-teal-300 border-r-8 text-white md:max-w-sm items-center transform scale-100 hover:scale-100 transition-transform "
                  : "py-3 px-4 my-1 flex text-sm bg-white hover:bg-zinc-100 hover:border-teal-500 hover:border-r-8 text-teal-700 md:max-w-sm items-center scale-100 hover:scale-105 transition-transform"
              }
              onClick={handleLogout} // Adicione a função de logout ao evento onClick
            >
              <MdLogout size={20} className="mr-4" /> Logout
            </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Menu;
