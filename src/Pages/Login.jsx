import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auroras from "../../Images/pineWebp.webp";
import logo from "../../Images/logo2.png";
import supabase from "../../supabase/supabase";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
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

    supabase.auth.onAuthStateChange(handleAuthStateChange);
  
  }, [navigate]);

  const handleLoginClick = async () => {
    console.log("Clicou no botão de login do Google");
    const { user, session, error } = await supabase.auth.signIn(
      { provider: 'google' },
      { redirectTo: 'https://pinetree.pedrosantos.ch/Dashboard' }
    );
    console.log("Resultado da tentativa de login:", { user, session, error });
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat backdrop-blur-sm relative"
      style={{ backgroundImage: `url(${auroras})` }}
    >
      <div className="w-full md:w-1/3 bg-zinc-100 py-4 px-8 pt-10 rounded-xl">
        <div className="">
          <img src={logo} alt="Logo" className="h-32 md:h-36 mt-[-30px] ml-[-10px]" />
          <div className="text-teal-700 text-md md:text-2xl">Login</div>
        </div>
        <p className="text-gray-500 text-xs md:text-sm">Sign in for your expenses</p>
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
          onLogin={() => handleLoginClick()}
        />
      </div>
      <div className="absolute bottom-16 right-10 bg-zinc-100 shadow-lg mb-4 rounded-xl p-4">
        <p className="text-md text-teal-700 font-bold mb-2">Login for test:</p>
        <div className="">
          <p className="text-sm text-gray-500">Email: test@test.com</p>
          <p className="text-sm text-gray-500">Password: 123456789</p>
        </div>
      </div>
    </div>
  );
};

export default Login
