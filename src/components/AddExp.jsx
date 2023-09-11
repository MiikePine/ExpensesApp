import React from "react";
import Button from "./Button";
import { TfiClose } from "react-icons/tfi";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { useState, Fragment } from "react";
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
  item: Yup.string().required("Item is mandatoryo"),
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

  const userData = useSelector((state) => state.user);
  console.log("User ID from Redux store:", userData);
  const [UserUID, setUserUID] = useState(null);

  const dispatch = useDispatch();

  // upload file -  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const onSubmit = async (data) => {
    console.log("Data before upsert:", data);

    try {
      const dataToInsert = {
        "items/item": data.item,
        "items/price": parseFloat(data.price), // Make sure to convert to a number if needed
        "items/pay_by": data.payBy,
        "items/category": data.category,
        "items/dateValue": data.dateValue,
        user_id: userData,
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

      toast.success("New Expense add succefully");
      reset();
      onClose(); // Fechar o componente Register
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
      <div className="w-full md:w-2/6 h-2/4 md:h-110 top-24 ml-10 fixed z-10 px-4 mr-10 md:mr-0 flex items-center mb-10 shadow-xxl">
        <div className="flex-1 h-full border-2 border-neutral-200 overflow-y-auto bg-zinc-100 p-4 relative">
          <div className="flex px-0">
            <div className="ml-auto mb-4 mr-3 mt-4 pb-0 md:mb-0">
           
              <button onClick={handleClose}>
                <TfiClose
                  size={24}
                  className="text-red hover:text-red-500 transition-transform font-bold "
                ></TfiClose>
              </button>
            </div>
          </div>
          <div className="flex align-middle justify-center mt-2">
            <h1 className="text-xl mb-4 md:mb-4s  mt-2 text-teal-700 font-bold">
              Add Expense
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2 mx-4 md:mx-10 my-2">
              <div className="mb-4">
                <Input
                  id="item"
                  register={register("item")}
                  type="text"
                  placeholder="item"
                  error={errors.item}
                />
                {errors.item && (
                  <span className="text-xs text-red mt-2">
                    {errors.item.message}
                  </span>
                )}
              </div>

              {/* category start */}

              <div className="flex gap-2 ">
                <div className="mb-4 grid w-full">
<Listbox
  className={`${
    open
      ? "absolute z-99 mt-1 w-full overflow-auto  bg-white py-1  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      : "hidden"
  }`}

            
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
                          <Listbox.Button className="relative w-full cursor-default  bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
                              <Listbox.Options
                                static
                                className="absolute mt-1 w-full max-h-[200px] overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[50]"
                              >
                              {Category.map((person, personIdx) => (
                                <Listbox.Option
                                  key={personIdx}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
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

                <div className="mb-4 w-full">
                  <Listbox
                    value={selectedMethodPayment}
                    onChange={(selectedOption) => {
                      setSelectedMethodPayment(selectedOption);
                      setValue("payBy", selectedOption.name);
                    }}
                    id="payBy"
                    name="payBy"
                  >
                    {({ open }) => (
                      <>
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full cursor-default bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
                              className="absolute mt-1 w-full max-h-[200px] overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[50]"
                              >
                              {methodPayment.map((method, methodIdx) => (
                                <Listbox.Option
                                  key={methodIdx}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
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

              <div className="flex gap-2">
                <div className="mb-4 w-full text-sm">
                  <Input
                    id="price"
                    register={register("price")}
                    type="number"
                    placeholder="Price"
                    error={errors.price}
                  />
                </div>

                <div className="mb-4 w-full text-sm">
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

            <div className="flex justify-end mt-4 mr-8">
              <Button AddNew="Add" type="submit" onChange={insertData} />
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddExp;
