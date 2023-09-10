import React from "react";
import Input from "../components/Input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import supabase from "../../supabase/supabase";
import auroras from "../../Images/pineWebp.webp";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is mandatory"),
});

const ForgotPw = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForgotPassword = async (data) => {
    try {
      const { email } = data;
      const response = await supabase.auth.api.resetPasswordForEmail(email);
      if (response.error) {
        throw new Error(response.error.message);
      }
      console.log("Password recovery email sent successfully");
    } catch (error) {
      console.error("Error sending password recovery email:", error.message);
    }
  };

  return (
    <div
    className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat backdrop-blur-sm"
    style={{ backgroundImage: `url(${auroras})` }}
  >
    <div className="absolute  bg-white opacity-20 overflow-y-auto "></div>
      
      <div className="mt-8 w-full px-4 md:px-0 md:max-w-md">
        <div className="bg-zinc-100 shadow px-2">
          <form
            onSubmit={handleForgotPassword}
            className="bg-zinc-100 rounded mb-2 p-2 pb-6 pt-6 w-[100%]"
          >
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
              <h2 className="text-2xl md:text-2xl mb-10 text-black">
                Forgot Your Password?
              </h2>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Enter your email
              </label>
              <div className="mt-3 mb-6">
                <Input
                  id="email"
                  register={register("email")}
                  type="email"
                  placeholder="Your@email.com"
                  error={errors.email}
                />
                {errors.email && (
                  <span className="text-xs text-red">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 mt-4 font-bold bg-teal-700 text-white border-2 bg-red border-red
         hover:bg-white hover:text-teal-700 hover:border-2 hover:border-teal-700 focus:outline-none focus:ring-2
          focus:ring-teal-700 focus:ring-opacity-50"
              >
                Reset your password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPw;
