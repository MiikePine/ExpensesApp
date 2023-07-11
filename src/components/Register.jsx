

import React from "react";
import Button from "./Button";
import { TfiClose } from "react-icons/Tfi";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { useState } from "react";
import UploadComponent from "./UploadComponent";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  item: Yup.string().required('Item é obrigatório'),
  price: Yup.number().required('Preço é obrigatório'),
  payBy: Yup.string().required('Método de pagamento é obrigatório'),
  category: Yup.string().required('Categoria é obrigatória'),
  dateValue: Yup.string().required('Data é obrigatória'),
});

const Register = ({ onRegisterSuccess, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [acceptedFiles, setAcceptedFiles] = useState([]);

  const onSubmit = async (data) => {
    if (acceptedFiles.length > 0) {
      const postData = {
        id: user.item,
        price: user.price,
        payBy: user.payBy,
        category: user.category,
        dateValue: user.dateValue,
      };

      try {
        const response = await axios.post("http://localhost:3000/", postData);
        console.log(response.data);
        onRegisterSuccess(response.data);
        toast.success("Nova despesa adicionada com sucesso");
        reset();
      } catch (error) {
        console.error("Failed to submit form:", error);
        toast.error("Erro ao adicionar nova despesa");
      }
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="w-screen md:w-2/6 h-96 top-48 ml-10 fixed rounded-md z-50 flex items-center overflow-y-auto mb-10 shadow-xxl" >
      <div className="flex-1 h-full border-2 border-neutral-200 overflow-y-auto bg-white p-4 relative">
        <div className="flex px-0">
          <div className="ml-auto mr-3 mt-4 pb-0 mb-0">
            <button onClick={handleClose}>
              <TfiClose size={30} className="text-red"></TfiClose>
            </button>
          </div>
        </div>
        <div className="">
          <h1 className="text-sm mb-8 mt-2">Adiciona nova Despesa</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-around mx-0 md:ml-0 md:mr-0 md:flex-row my-2">
            <div className="mb-4 w-full">
              <Input
                id="item"
                register={register("item")}
                type="text"
                placeholder="item"
                error={errors.user}
              />
              {errors.user && (
                <span className="text-xs text-red mt-2">{errors.user.message}</span>
              )}
            </div>
            <div className="mb-4 w-full">
              <Input
                id="category"
                register={register("category")}
                type="text"
                placeholder="Choose a Catergory"
                error={errors.category}
              />
              {errors.category && (
                <span className="text-xs text-red mt-2">{errors.category.message}</span>
              )}
            </div>
          </div>

          <div className="flex justify-around mx-0 md:ml-0 md:mr-0 md:flex-row my-4">
            <div className="mb-4">
              <Input
                id="price"
                register={register("price")}
                type="number"
                placeholder="price"
                error={errors.price}
              />
              {errors.price && (
                <span className="text-xs text-red mt-2">{errors.price.message}</span>
              )}
            </div>
            <div className="mb-4">
              <Input
                id="payBy"
                register={register("payBy")}
                type="text"
                placeholder="Choose a Payment method.."
                error={errors.payBy}
              />
              {errors.payBy && (
                <span className="text-xs text-red mt-2">{errors.payBy.message}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col ml-8 mr-8 md:ml-0 md:mr-0 md:mb-12 md:flex-row gap-2 my-4">
            <div className="w-full md:w-1/2">
              <Input
                id="dateValue"
                register={register("dateValue")}
                type="date"
                placeholder="Data"
                error={errors.dateValue}
              />
              {errors.dateValue && (
                <span className="text-xs text-red mt-2">{errors.dateValue.message}</span>
              )}
            </div>
          </div>

          <div className="mt-8 ml-8 mr-8 md:ml-0 md:mr-0 my-8">
            <Button AddNew="AddNew" className="text-lg " type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
