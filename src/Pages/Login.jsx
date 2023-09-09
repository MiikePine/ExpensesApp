import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../components/Input";
import auroras from "../../Images/pineWebp.webp";
import logo from "../../Images/logo4.png";
import supabase from "../../supabase/supabase"
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { updateTotalExpense } from "../store/slices/sumexpSlice"





const schema = Yup.object().shape({
  email: Yup.string().email('Enter your email').required('Email is mandatory'),
  password: Yup.string().required('Password needed'),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const updateTotalExpense = useSelector(state => state.sumexp.totalExpense); 


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
      console.log('user Information:', response.data)
      navigate('/Dashboard', { state: { userId: response.data.user.id } });
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
    <div className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat backdrop-blur-sm" style={{ backgroundImage: `url(${auroras})` }}>
      <div className="absolute inset-0 bg-white opacity-40 overflow-y-auto "></div>


        <form  
          onSubmit={handleSubmit(onSubmit)}
          className="bg-zinc-100 shadow-lg mb-2 p-8 md:w-[33%] relative z-10 flex flex-col justify-center h-[520px]"
          >

        {/* <div className="absolute top-0 left-0 mt-8 ml-8">
          <img src={logo} alt="Logo" className="h-20" />
        </div> */}
          <div className="items-center">
         

            <div className="text-center">
              <span className="text-2xl text-teal-700 font-bold md:text-3xl text-red">Login</span>
              <span className="text-2xl text-black md:text-3xl"> to continue.</span>
            </div>

      </div>
      <div className="flex flex-col mt-6">
        <label htmlFor="email" className="mt-4 mb-2 font-medium">
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
          <span className="mt-2 text-xs text-red">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col mt-6">
        <label htmlFor="password" className="mt-2 mb-2 font-medium">
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
      
          <Link to="/ForgotPw"
            className="float-right mt-1 mb-10 text-sm text-black focus:text-red-500 hover:text-red hover:underline"
              >Forgot password?
          </Link>
      <button
        type="submit"
        className="w-full px-4 py-3 mt-4 font-bold bg-teal-700 text-white border-2 bg-red border-red
         hover:bg-white hover:text-teal-700 hover:border-2 hover:border-teal-700 focus:outline-none focus:ring-2
          focus:ring-teal-700 focus:ring-opacity-50"
      >
        Login
      </button>
       <Link to="/Register"
            className="float-right mt-1 mb-10 text-sm text-black focus:text-red-500 hover:text-red hover:underline"
              >Register
          </Link>
    </form>
   
</div>

  );
};

export default Login