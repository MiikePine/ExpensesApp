import React, { useState } from "react";
import {Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import  Input from "./Input";

const schema = Yup.object().shape({
  email: Yup.string().email('Veuillez entrer un email valide').required('Email est requis'),
  password: Yup.string().required('Password requis'),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex items-center justify-center h-screen " >
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded mb-2 p-8 w-[35%]"
    >
      <div className="text-center">
        <span className="text-2xl font-bold md:text-3xl text-red">Login</span>
        <span className="text-2xl text-black md:text-3xl"> to continue.</span>
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
          >Forgot password?</Link>
      <button
        type="submit"
        className="w-full px-4 py-2 mt-10 text-white border-2 rounded-lg bg-red border-red hover:bg-white hover:text-red hover:border-2 hover:border-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-opacity-50"
      >
        Login
      </button>
    </form>


    </div>
  );
};

export default Form;
