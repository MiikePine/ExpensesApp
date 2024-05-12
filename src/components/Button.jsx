import { TiTimes } from "react-icons/ti";

const Button = ({ trimestre, active, ...props }) => {
  return (
    <div>
      {props.loginRed && (
        <button className="w-full px-4 py-2 text-center text-white rounded-lg shadow-lg bg-red hover:bg-black">
          {props.loginRed}
        </button>
      )}
      {props.Paye && (
        <button className="py-3 m-2 text-center text-white rounded-lg shadow-lg px-7 bg-green hover:bg-black">
          {props.Paye}
        </button>
      )}
      {props.bills && (
        <button
          onClick={props.open}
          className="px-24 py-3 md:px-10 md:py-2 md:ml-2 md:mr-4 text-center text-white rounded-md shadow-lg bg-red hover:bg-black"
        >
          {props.bills}
        </button>
      )}

      {props.AddNew && (
        <button
          onClick={props.onClick}
          className="py-2 px-8 mb-4 flex items-center text-sm bg-teal-700 text-bg-white text-zinc-200 font-bold hover:text-teal-700 hover:bg-white hover:border border-teal-700 rounded-xl"
        >
          {" "}
          {props.AddNew}
        </button>
      )}

      {/* 
{props.AddNew && (
        <button onClick={props.onClick} className="bg-blue-400 text-white px-20 py-3 md:px-10 md:py-2 md:ml-2 md:mr-4 rounded-lg shadow-lg shadow-neutral-400 hover:bg-black">
          {props.AddNew}
        </button>
      )} */}

      {props.suprimer && (
        <button
          onClick={props.open}
          className="px-12 py-4 m-2 items-center  font-bold flex text-center text-sm bg-blue-200 text-zinc-500 rounded-md shadow-lg bg-red hover:bg-zinc-500 hover:text-blue-200"
        >
          {props.suprimer}
          {/* <TiTimes size={20} className="text-zinc-700 ml-4 "></TiTimes> */}
        </button>
      )}

      {props.actif && (
        <button
          onClick={props.open}
          className="px-6 py-2 m-2 w-1 items-center text-center text-white rounded-lg shadow-lg bg-green"
        >
          {props.actif}
        </button>
      )}
    </div>
  );
};

export default Button;
