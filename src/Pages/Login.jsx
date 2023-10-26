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
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'


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

  const onLoginSuccess = () => {
    navigate('/Dashboard'); // Use a função navigate para redirecionar para "/Dashboard"
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat backdrop-blur-sm"
      style={{ backgroundImage: `url(${auroras})` }}
    >
  

    
<Auth
    supabaseClient={supabase}
    providers={['google', 'twitter']}
    appearance={{ theme: ThemeSupa }}
    onSuccess={onLoginSuccess} // Chame onLoginSuccess após o login bem-sucedido


  />


      <div className="fixed bottom-10 bg-zinc-50 py-5 px-4 rounded-md right-10 mb-4 ml-4">
        <div className="text-center flex flex-col justify-center items-center">
          <p className="font-bold items mb-4 text-teal-700">Test Version</p>
          </div>
          <div className="flex">
            <p className="font-bold mr-2 text-teal-700">User: </p>
            <p>indiabalcony@gmail.com</p>
          </div>
          <div className="flex">
            <p className="font-bold mr-2 text-teal-700">Password: </p>
            <p>123456</p>
          </div>
        </div>
    </div>
  );
};

export default Login;
