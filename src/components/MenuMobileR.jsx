// import { NavLink } from "react-router-dom";
// import { AiFillSetting } from "react-icons/ai";
// import { MdLogout } from "react-icons/md";
// import { RiBillLine } from "react-icons/ri";
// import { TbUsers } from "react-icons/tb";
// import React, { useState, useRef, useEffect } from "react";
// import { RxDashboard } from "react-icons/rx";
// import { AiOutlineFileAdd } from "react-icons/ai";
// import { useSelector, useDispatch } from "react-redux";
// import { BiSolidUser } from "react-icons/bi";

// const pathName = location.pathname.slice(1);

// const MenuMobileR = (props) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const userEmail = useSelector((state) => state.user?.email);

//   const dispatch = useDispatch(); // Obtenha a função dispatch

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isOpen]);

//   return (
//     <div>
//       {isOpen && (
//         <div
//           className={`fixed top-0 bottom-0 left-0 right-0 z-5 bg-black opacity-70 ${
//             isOpen ? "no-scroll" : ""
//           }`}
//         ></div>
//       )}

//       <section
//         className={`${
//           isOpen ? "fixed top-0 bottom-0 right-0" : "relative"
//         } "md:hidden bg-neutral-100 flex-col py-4 w-3/5 px-4 pb-10 z-10`}
//       >
//         <div className="flex gap-2">
//           <span className="flex text-sm items-center">{userEmail}</span>
//           <BiSolidUser size={20} />
//         </div>

//         <div className="mt-[100px] flex flex-col h-full justify-between text-xl mb-68">
//           <div className="block md:hidden  mt-5">
//             <div className="w-full">
//               <NavLink
//                 to="/Dashboard"
//                 className={({ isActive, isPending }) =>
//                   isPending
//                     ? ""
//                     : isActive
//                     ? "py-3 px-4 my-1 px-full flex text-sm bg-teal-700 border-teal-300 border-r-8 text-white md:max-w-sm items-center"
//                     : "py-3 px-4 my-1 flex text-sm bg-white hover:bg-zinc-100 hover:border-teal-500 hover:border-r-8 text-teal-700 md:max-w-sm items-center"
//                 }
//               >
//                 <RxDashboard size={20} className="mr-4" />
//                 Dashboard
//               </NavLink>
//             </div>

//             <div className="w-full">
//               <NavLink
//                 to="/Expenses"
//                 className={({ isActive, isPending }) =>
//                   isPending
//                     ? ""
//                     : isActive
//                     ? "py-3 px-4 my-1 px-full flex text-sm bg-teal-700 border-teal-300 border-r-8 text-white md:max-w-sm items-center"
//                     : "py-3 px-4 my-1 flex text-sm bg-white hover:bg-zinc-100 hover:border-teal-500 hover:border-r-8 text-teal-700 md:max-w-sm items-center"
//                 }
//               >
//                 <RiBillLine size={20} className="mr-4" />
//                 Expenses
//               </NavLink>
//             </div>

//             <div className="w-full">
//               <NavLink
//                 to="/Incoming"
//                 className={({ isActive, isPending }) =>
//                   isPending
//                     ? ""
//                     : isActive
//                     ? "py-3 px-4 my-1 px-full flex text-sm bg-teal-700 border-teal-300 border-r-8 text-white md:max-w-sm items-center"
//                     : "py-3 px-4 my-1 flex text-sm bg-white hover:bg-zinc-100 hover:border-teal-500 hover:border-r-8 text-teal-700 md:max-w-sm items-center"
//                 }
//               >
//                 <AiOutlineFileAdd size={20} className="mr-4" />
//                 Incomings
//               </NavLink>
//             </div>
//           </div>

//           {/* Menu inferieur */}
//           <div className="block md:hidden ">
//             <NavLink
//               to="/"
//               className={({ isActive, isPending }) =>
//                 isPending
//                   ? ""
//                   : isActive
//                   ? "py-3 px-4 px-full flex text-sm bg-teal-700 border-teal-300 border-r-8 text-white md:max-w-sm items-center"
//                   : "py-3 px-4 my-1 flex text-sm bg-white hover:bg-zinc-100 hover:border-teal-500 hover:border-r-8 text-teal-700 md:max-w-sm items-center"
//               }
//             >
//               <MdLogout size={20} className="mr-4" /> Logout
//             </NavLink>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default MenuMobileR;


import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { RiBillLine } from "react-icons/ri";
import { AiOutlineFileAdd } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { useSelector } from "react-redux";
import { BiSolidUser } from "react-icons/bi";

const MenuMobileR = () => {
  // const [isOpen, setIsOpen] = useState(true);
  const userEmail = useSelector((state) => state.user?.email);

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [isOpen]);

  return (
    // <div>
    //   {isOpen && (
    //     <div
    //       className={`fixed top-0 bottom-0 left-0 right-0 z-5 bg-black opacity-70 ${
    //         isOpen ? "no-scroll" : ""
    //       }`}
    //     ></div>
    //   )}

      <section
        className=
          "fixed bottom-0 left-0 right-0 md:hidden bg-neutral-100 flex-col w-full z-10"
      >
    
    <div className="flex justify-between items-center">
          <NavLink
            to="/Dashboard"
            className={({ isActive, isPending }) =>
              isPending
                ? ""
                : isActive
                ? "py-3 px-4 flex-1 text-sm bg-teal-700 text-white"
                : "py-3 px-4 flex-1 text-sm bg-white hover:bg-zinc-100 text-teal-700"
            }
          >
                                              <div className="flex flex-col items-center">

            <RxDashboard size={20} className="items-center justify-center" />
            </div>

          </NavLink>

          <NavLink
            to="/Expenses"
            className={({ isActive, isPending }) =>
              isPending
                ? ""
                : isActive
                ? "py-3 px-4 flex-1 text-sm bg-teal-700 text-white"
                : "py-3 px-4 flex-1 text-sm bg-white hover:bg-zinc-100 text-teal-700"
            }
          >
                                  <div className="flex flex-col items-center">

            <RiBillLine size={20} className="items-center justify-center" />
            </div>

          </NavLink>

          <NavLink
            to="/Incoming"
            className={({ isActive, isPending }) =>
              isPending
                ? ""
                : isActive
                ? "py-3 px-4 flex-1 text-sm bg-teal-700 text-white"
                : "py-3 px-4 flex-1 text-sm bg-white hover:bg-zinc-100 text-teal-700"
            }
          >
                      <div className="flex flex-col items-center">
            <AiOutlineFileAdd size={20} className="" />
            </div>
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending
                ? ""
                : isActive
                ? "py-3 px-4 flex-1 text-sm bg-teal-700 text-white"
                : "py-3 px-4 flex-1 text-sm bg-white hover:bg-zinc-100 text-teal-700"
            }
          >
          <div className="flex flex-col items-center">
            <MdLogout size={20} className="items-center justify-center" /> 
            </div>
          </NavLink>
        </div>
      </section>
    // </div>
  );
};

export default MenuMobileR;



