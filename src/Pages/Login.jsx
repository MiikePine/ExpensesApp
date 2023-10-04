import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../components/Input";
import auroras from "../../Images/pineWebp.webp";
import logo from "../../Images/logo2.png";
import supabase from "../../supabase/supabase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { updateTotalExpense } from "../store/slices/sumexpSlice";

const schema = Yup.object().shape({
  email: Yup.string().email("Enter your email").required("Email is mandatory"),
  password: Yup.string().required("Password needed"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateTotalExpense = useSelector((state) => state.sumexp.totalExpense);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (response.error) {
        console.error("Login error:", response.error);
        console.error("Supabase error:", response.error.message);
        setError(response.error.message);
      } else if (response.data) {
        dispatch(setUser(response.data.user));
        console.log("user Information:", response.data);
        navigate("/Dashboard", { state: { userId: response.data.user.id } });
      }
    } catch (error) {
      console.error("Login error:", error);
      console.error("Supabase error:", error.response.data);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat backdrop-blur-sm"
      style={{ backgroundImage: `url(${auroras})` }}
    >
      <div className="absolute inset-0 bg-white opacity-20 overflow-y-auto "></div>
     
      <div className="fixed md:hidden top-0 left-0 mb-6 md:mt-0 ml-2">
          <img src={logo} alt="Logo" className="h-32 md:h-36 mt-[-30px] ml-[-10px]" />
        </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-zinc-100 shadow-lg mb-2 md:mb-0 p-4 md:px-8 md:py-2 w-3/4 mx-4 md:w-[33%] relative z-10 flex flex-col justify-center h-[520px]"
      >
        <div className="hidden md:flex absolute  top-0  left-0 md:mt-0 ml-2">
          <img src={logo} alt="Logo" className="h-12 md:h-36 mt-[-30px] ml-[-14px]" />
        </div>
         
        <div className="items-center mt-10">
          <div className="text-center">
            <span className="text-2xl text-teal-700 font-bold md:text-3xl text-red">
              Login
            </span>
            <span className="text-2xl text-black md:text-3xl">
              {" "}
              to continue.
            </span>
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="email" 
            className="mt-2 mb-2 text-sm md:text-base">
            Email
          </label>

          <Input
            id="email"
            register={register("email")}
            type="email"
            placeholder="Your@email.com"
            error={errors.email}
          />

          {errors.email && (
            <span className="mt-2 text-xs text-red">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col mt-6">
          <label
            htmlFor="password"
            className="mt-2 mb-2 text-sm md:text-base"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="***********"
            register={register("password")}
            error={errors.password}
          />
          {errors.password && (
            <span className="mt-2 text-xs text-red ">
              {errors.password.message}
            </span>
          )}
        </div>

        <Link
          to="/ForgotPw"
          className="items-end mt-1 mb-6 text-xs text-black focus:text-red-500 hover:text-red hover:underline"
        >
          Forgot password?
        </Link>
        <button
          type="submit"
          className="w-full px-4 py-3 mt-4 font-bold bg-teal-700 text-white border-2 bg-red border-red
         hover:bg-white hover:text-teal-700 hover:border-2 hover:border-teal-700 focus:outline-none focus:ring-2
          focus:ring-teal-700 focus:ring-opacity-50"
        >
          Login
        </button>
        <Link
          to="/Register"
          className="float-right mt-1  text-sm text-black focus:text-red-500 hover:text-red hover:underline"
        >
          Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
