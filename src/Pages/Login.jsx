import React, { useState } from "react";
import auroras from "../../Images/pineWebp.webp";
import logo from "../../Images/logo2.png";
import supabase from "../../supabase/supabase";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    try {
      const { user, session, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        console.log("Usuário logado:", user.email);
        // Redireciona para "/Dashboard" após o login bem-sucedido
        navigate('/Dashboard');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      setError(error.message);
    }
  };

  const handleAuthStateChange = async (event, session) => {
    console.log("Evento de mudança de autenticação:", event);
    if (event === "SIGNED_IN") {
      const returnUrl = localStorage.getItem('returnUrl');
      if (returnUrl) {
        console.log("Redirecionando para:", returnUrl);
        navigate(returnUrl);
        localStorage.removeItem('returnUrl');
      } else {
        console.log("Redirecionando para: /Dashboard");
        navigate("/Dashboard");
      }
    } else {
      console.log("Redirecionando para: /");
      navigate("/");
    }
  }; 

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
        <p className="text-gray-500 text-xs md:text-sm">Sign in for your expenses</p>
        <Auth
          supabaseClient={supabase}
          providers={['google']}
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
          onLogin={(credentials) => handleLogin(credentials)}
          onAuthStateChange={handleAuthStateChange} // Adiciona o tratamento do estado de autenticação
        />
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
