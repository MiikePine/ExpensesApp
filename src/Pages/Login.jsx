// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import auroras from "../../Images/pineWebp.webp";
// import logo from "../../Images/logo2.png";
// import supabase from "../../supabase/supabase";
// import { Auth } from '@supabase/auth-ui-react'
// import { ThemeSupa } from '@supabase/auth-ui-shared'

// const Login = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     const authListener = supabase.auth.onAuthStateChange(async (event, session) => {
//       if (event === "SIGNED_IN") {
//         const returnUrl = localStorage.getItem('returnUrl');
//         if (returnUrl) {
//           navigate(returnUrl);
//           localStorage.removeItem('returnUrl');
//         } else {
//           navigate("/Dashboard");
//         }
//       } else {
//         navigate("/");
//       }
//     });    

//     // Retorna uma função de limpeza para desinscrever o ouvinte ao desmontar o componente
//     return () => {
//       authListener.data.unsubscribe(); // Desinscreve o ouvinte de autenticação
//     };
//   }, []);

//   const handleLoginClick = () => {
//     localStorage.setItem('returnUrl', window.location.pathname);
//     navigate("/Login");
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat backdrop-blur-sm"
//       style={{ backgroundImage: `url(${auroras})` }}
//     >
//       <div className="w-full md:w-1/3 bg-zinc-200 py-4 px-8 pt-10">
//         <div className="">
//           <img src={logo} alt="Logo" className="h-32 md:h-36 mt-[-30px] ml-[-10px]" />
//           <div className="text-teal-700 text-md md:text-2xl">Login</div>
//         </div>
//         <p className="text-gray-500 text-xs md:text-sm">Sign in for your expenses</p>
//         <Auth
//           supabaseClient={supabase}
//           theme="default"
//           providers={['google', 'linkedin', 'discord', 'github']}
//           appearance={{
//             theme: ThemeSupa,
//             variables: {
//               default: {
//                 colors: {
//                   brand: 'teal',
//                   brandAccent: 'teal',
//                   dividerBackground: 'teal',
//                   inputBackground: 'white',
//                 },
//               },
//             },
//           }} 
//           className="w-full md:w-1/2 text-xs md:text-xl"
//           socialLayout="horizontal"
//           onLogin={() => handleLoginClick()}
//         />
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auroras from "../../Images/pineWebp.webp";
import logo from "../../Images/logo2.png";
import supabase from "../../supabase/supabase";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [authListener, setAuthListener] = useState(null);
  
  useEffect(() => {
    const listener = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        const returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
          navigate(returnUrl);
          localStorage.removeItem('returnUrl');
        } else {
          navigate("/Dashboard");
        }
      } else {
        navigate("/");
      }
    });

    setAuthListener(listener);

    // Retorna uma função de limpeza para desinscrever o ouvinte ao desmontar o componente
    return () => {
      if (authListener) {
        authListener.data.unsubscribe(); // Desinscreve o ouvinte de autenticação
      }
    };
  }, []);

  const handleLoginClick = () => {
    localStorage.setItem('returnUrl', '/Dashboard');
    navigate("/");
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
    </div>
  );
};

export default Login;
