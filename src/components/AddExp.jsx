import React from "react";
import Button from "./Button";
import { TfiClose } from "react-icons/tfi";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { useState, Fragment, useEffect } from "react";
import UploadComponent from "./UploadComponent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import supabase from "../../supabase/supabase";
import { useDispatch, useSelector } from "react-redux";

const schema = Yup.object().shape({
  item: Yup.string().required("Item is mandatory"),
  price: Yup.number().required("Price is mandatory"),
  payBy: Yup.string().required("Payment Method is mandatory"),
  category: Yup.string().required("Categoriy is mandatory"),
  dateValue: Yup.string().required("Date is mandatory"),
});

const Category = [
  { id: 1, name: "Food", unavailable: false },
  { id: 2, name: "Accomodation", unavailable: false },
  { id: 3, name: "Other", unavailable: false },
  { id: 4, name: "Transport", unavailable: true },
  { id: 5, name: "Sports", unavailable: false },
  { id: 6, name: "Clothes", unavailable: false },
  { id: 7, name: "Night Life", unavailable: false },
  { id: 8, name: "Tobbaco", unavailable: false },
  { id: 9, name: "Health", unavailable: false },
  { id: 10, name: "Pets", unavailable: false },
  { id: 11, name: "Bills", unavailable: false },
];

const methodPayment = [
  { id: 1, name: "Cash", unavailable: false },
  { id: 2, name: "Transferencia Bancaria", unavailable: false },
  { id: 3, name: "Twint", unavailable: false },
  { id: 4, name: "Credit Card", unavailable: true },
  { id: 4, name: "Crypto", unavailable: true },
];

const AddExp = ({ handleRegisterSuccess, onClose, insertData }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMethodPayment, setSelectedMethodPayment] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [UserUID, setUserUID] = useState(null);


  const userData = useSelector((state) => state.user);
  console.log("User ID from Redux store:", UserUID);

  const dispatch = useDispatch();

  // upload file -  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Faça a chamada à base de dados para obter UserUID quando o componente é montado
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (data.session !== null) {
          const user = data.session.user;
          setUserUID(user.id);
        } else {
          console.log("Não há sessão de usuário disponível.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData(); // Chame a função de busca ao montar o componente
  }, []); 

  const onSubmit = async (data) => {
    console.log("Data before upsert:", data);

    try {
      const dataToInsert = {
        "items/item": data.item,
        "items/price": parseFloat(data.price), // Make sure to convert to a number if needed
        "items/pay_by": data.payBy,
        "items/category": data.category,
        "items/dateValue": data.dateValue,
        "user_id": UserUID,
      };

      const { data: setExp, error } = await supabase
        .from("expense")
        .upsert([dataToInsert]);

      if (error) {
        throw error;
      }

      if (error) {
        console.error("Failed to submit form:", error);
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        toast.error("Error adding new Expense");
      } else {
        toast.success("New Expense added successfully");
        reset();
        onClose();
      }

    // Fechar o componente Register
    } catch (error) {
      console.error("Failed to submit form:", error);
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      toast.error("Error adding new Expense");
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    isOpen && (
      <div className="w-full md:w-2/6 h-90 md:h-110 top-24 px-4 md:px-4 mx-10 md:mx-10 fixed z-50 flex items-center mb-10 shadow-xxl rounded-xl">
        <div className="flex-1 h-full border-2 border-neutral-200  bg-zinc-100 p-2 md:p-4 relative rounded-xl">
          <div className="flex px-0">
            <div className="ml-auto mr-3 mt-4 pb-0 mb-0">
              <button onClick={handleClose}>
                <TfiClose
                  size={30}
                  className="text-red hover:text-red-500 transition-transform font-bold"
                ></TfiClose>
              </button>
            </div>
          </div>
          <div className="flex align-middle justify-center">
            <h1 className="text-sm md:text-xl mb-8 mt-2 text-teal-700 font-bold">
              Add Expense
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2 mx-4 md:mx-10 my-1 md:my-2">
              <div className="mb-2 md:mb-4 text-sm md:text-sm rounded-xl" >
                <Input
                  id="item"
                  register={register("item")}
                  type="text"
                  placeholder="item"
                  error={errors.item}
                  className="rounded-xl"
                />
                {errors.item && (
                  <span className="text-xs text-red mt-2">
                    {errors.item.message}
                  </span>
                )}
              </div>

              {/* category start */}

              <div className="flex gap-2 mb-0">
                <div className="mb-2 md:mb-4 grid w-full">
                  <Listbox
                    className={`${
                      open
                        ? "absolute z-100 mt-1 w-full bg-white py-1 text-xs md:text-sm rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none "
                        : "hidden"
                    }`}
                    style={{ zIndex: 9999 }}
                    value={selectedCategory}
                    onChange={(selectedOption) => {
                      setSelectedCategory(selectedOption);
                      setValue("category", selectedOption.name);
                    }}
                    id="category"
                    name="category"
                  >
                    {({ open }) => (
                      <>
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full rounded-xl text-xs md:text-sm cursor-default  bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">
                              {selectedCategory
                                ? selectedCategory.name
                                : "Category"}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 max-h-100 w-full rounded-xl bg-white py-1 text-xs md:text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs">
                              {Category.map((person, personIdx) => (
                                <Listbox.Option
                                  key={personIdx}
                                  className={({ active }) =>
                                    `relative cursor-default rounded-xl select-none py-2 md:pl-10 pl-3  pr-4 text-xs md:text-sm ${
                                      active
                                        ? "bg-teal-50 text-teal-700"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value={person}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {person.name}
                                      </span>
                                      {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                  {errors.category && (
                    <span className="text-xs text-red mt-2">
                      Category is mandatory
                    </span>
                  )}
                </div>

                {/* category end */}

                {/* PAID BY start */}

                <div className="w-full mb-2 md:mb-4">
                  <Listbox
                    value={selectedMethodPayment}
                    onChange={(selectedOption) => {
                      setSelectedMethodPayment(selectedOption);
                      setValue("payBy", selectedOption.name);
                    }}
                    id="payBy"
                    name="payBy"
                    className="rounded-xl"
                  >
                    {({ open }) => (
                      <>
                        <div className="relative mt-1 ">
                          <Listbox.Button className="relative rounded-xl w-full text-xs md:text-sm cursor-default bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">
                              {selectedMethodPayment
                                ? selectedMethodPayment.name
                                : "Paied by"}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options
                              static
                               className="absolute mt-1 max-h-100 w-full rounded-xl bg-white py-1 text-xs md:text-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs">
                              
                              {methodPayment.map((method, methodIdx) => (
                                <Listbox.Option
                                  key={methodIdx}
                                  className={({ active }) =>
                                    `relative cursor-default select-none rounded-xl py-2 md:pl-10 pl-3 pr-4 text-xs md:text-md ${
                                      active
                                        ? "bg-teal-50 text-teal-700"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value={method}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {method.name}
                                      </span>
                                      {selected && (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3  text-teal-600">
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      )}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                  {errors.payBy && (
                    <span className="text-xs text-red mt-2">
                      Payment Method is mandatory
                    </span>
                  )}
                </div>
              </div>

              {/* PAID BY end */}

              <div className="flex gap-2 rounded-xl">
                <div className="mb-4 w-full text-xs md:text-sm ">
                  <Input
                    id="price"
                    register={register("price")}
                    type="number"
                    placeholder="Price"
                    error={errors.price}
                    className="rounded-xl"
                  />
                </div>

                <div className="mb-4 w-full text-xs md:text-sm">
                  <Input
                    id="dateValue"
                    register={register("dateValue")}
                    type="date"
                    placeholder="Date"
                    error={errors.dateValue}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 mr-4 md:mr-10 rounded-xl">
              <Button AddNew="Add" type="submit" onChange={insertData} />
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddExp;
