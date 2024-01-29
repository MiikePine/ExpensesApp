import React, { useState, useEffect } from "react";
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
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'


 
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateTotalExpense = useSelector((state) => state.sumexp.totalExpense);
  const auth = supabase.auth;

  useEffect(() => {
    const auth = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        navigate("/Expenses");
      } else {
        navigate("/");
      }
    });

    
  }, [providers]);
    

  useEffect(() => {
    const googleAuthListener = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        navigate("/Expenses");
      }
    });
  
   
  }, []);




  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat backdrop-blur-sm"
      style={{ backgroundImage: `url(${auroras})` }}
    >
<div className="w-full md:w-1/3 bg-zinc-200 py-4 px-8 pt-10">

<div className="">
<img src={logo} alt="Logo" className="h-32 md:h-36 mt-[-30px] ml-[-10px]" />
<div className="text-teal-700 text-md md:text-2xl">Login</div>
</div>



<p className="text-gray-500 text-xs md:text-sm">Sign inwwwwwwww eefor your expenses</p>
<Auth
    supabaseClient={supabase}
    theme="default"
    providers={['google', 'linkedin', 'discord', 'github']}
    appearance={{
      theme: ThemeSupa,
      variables: {
        default: {
          colors: {
            brand: 'teal',
            brandAccent: 'teal',
            dividerBackground: 'teal',
            inputBackground: 'white',
            
          },
        },
      },
    }} 
    className="w-full md:w-1/2 text-xs md:text-xl"
    socialLayout="horizontal"
    // onFacebookClick={handleFacebookLogin}
/>
</div>

    </div>
  );
};

export default Login;



