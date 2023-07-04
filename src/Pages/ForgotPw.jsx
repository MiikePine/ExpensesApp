import React from "react";
import Input from "../components/Input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = Yup.object().shape({
  email: Yup.string().email('Veuillez entrer un email valide').required('Email est requis'),
});

const ForgotPw = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-screen bg-gray-100 flex flex-col justify-center w-[45%] sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h2 className="text-2xl md:text-3xl text-black">
            Récupérer le mot de passe
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white shadow sm:rounded-lg sm:px-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded mb-2 p-2 pb-6 pt-6 w-[100%]"
            >

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Votre Email
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
              <span className="text-xs">
                *Veuillez entrer votre adresse e-mail. Vous recevrez un lien à
                travers lequel vous pourrez créer un nouveau mot de passe.
              </span>

              <div>
                <button
                  type="submit"
                  className="w-full mt-10 bg-red text-white border-2 border-red rounded-lg py-2 px-4 hover:bg-white hover:text-red hover:border-2 hover:border-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-opacity-50"
                >
                  Envoyer le lien de réinitialisation
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPw;