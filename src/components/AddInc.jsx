
import React from "react";
import Button from "./Button";
import { TfiClose } from "react-icons/tfi";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { useState, Fragment } from "react";
import UploadComponent from "./UploadComponent";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'



const schema = Yup.object().shape({
  item: Yup.string().required('Item is mandatory'),
  price: Yup.number().required('Price is mandatory'),
  payBy: Yup.string().required('Payment Method is mandatory'),
  category: Yup.string().required('Categoriy is mandatory'),
  dateValue: Yup.string().required('Date is mandatory'),
});



const Category = [
  { id: 1, name: 'Salary', unavailable: false },
  { id: 2, name: 'Tips', unavailable: false },
  { id: 3, name: 'Rent', unavailable: false },
  { id: 4, name: 'Other', unavailable: true },
]



const methodPayment = [
  { id: 1, name: 'Cash', unavailable: false },
  { id: 2, name: 'Bank Transfer', unavailable: false },
  { id: 3, name: 'Twint', unavailable: false },
  { id: 4, name: 'Credit Card', unavailable: true },
]

const AddInc = ({ onRegisterSuccess , onClose}) => {
  const [selectedCategory, setSelectedCategory] = useState(Category[0]);
  const [selectedMethodPayment, setSelectedMethodPayment] = useState(methodPayment[0]);
  


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

 

  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [isOpen, setIsOpen] = useState(true);


  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/posts", data);
      console.log(response.data);
      onRegisterSuccess(response.data);
      toast.success("New Income add succefully");
      reset();
      onClose(); 
    } catch (error) {
      console.error("Failed to submit form:", error);
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      toast.error("Error adding new Income");
    }
  };

  const handleClose = () => {
    console.log("handleClose is called")
    onClose(); 
  };

  return (
    isOpen && (
      <div className="w-screen md:w-2/6 h-110 top-24 ml-10 fixed z-50 flex items-center overflow-y-auto mb-10 shadow-xxl">
        <div className="flex-1 h-full border-2 border-neutral-200 overflow-y-auto bg-zinc-100 p-4 relative">
          <div className="flex px-0">
            <div className="ml-auto mr-3 mt-4 pb-0 mb-0">
              <button onClick={handleClose}>
                <TfiClose size={30} className="text-red hover:text-red-500 transition-transform font-bold"></TfiClose>
              </button>
            </div>
          </div>
          <div className="flex align-middle justify-center">
            <h1 className="text-sm mb-8 mt-2">Add new Income</h1>
          </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2 mx-10 my-2">                  
                  
                <div className="mb-4">
                  <Input
                    id="item"
                    register={register("item")}
                    type="text"
                    placeholder="item"
                    error={errors.item}
                    className="focus:border-green-500" // Add this class
                  />
                  {errors.item && (
                    <span className="text-xs text-red mt-2">{errors.item.message}</span>
                  )}
                </div>


                        <div className="flex gap-2">
                                {/* category start */}
                          
                         <div className="mb-4 grid w-full">              
                          <Listbox
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
                                <div className="relative mt-1 z-10 ">
                                  <Listbox.Button className="relative w-full cursor-default bg-white py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-teal-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">
                                      {selectedCategory ? selectedCategory.name : "Categoria"}
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
                                      className="absolute mt-1 max-h-60 w-full overflow-auto  bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                    >
                                      {Category.map((person, personIdx) => (
                                        <Listbox.Option
                                          key={personIdx}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                              active ? 'bg-teal-50 text-teal-700' : 'text-gray-900'
                                            }`
                                          }
                                          value={person}
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected ? 'font-medium' : 'font-normal'
                                                }`}
                                              >
                                                {person.name}
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-700">
                                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
                            <span className="text-xs text-red mt-2">Category is Mandatory</span>
                          )}
                        </div>

                        {/* category end */}



                        {/* PAID BY start */}

                        <div className="mb-4 w-full">
                          <Listbox value={selectedMethodPayment}   onChange={(selectedOption) => {
                              setSelectedMethodPayment(selectedOption);  
                              setValue("payBy", selectedOption.name);    
                            }} id="payBy" name="payBy" >
                            {({ open }) => (
                              <>
                                <div className="relative mt-1">
                                  <Listbox.Button className="relative w-full cursor-default bg-white py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">
                                      {selectedMethodPayment ? selectedMethodPayment.name : "Método de pagamento..."}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                                      className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                    >
                                      {methodPayment.map((method, methodIdx) => (
                                        <Listbox.Option
                                          key={methodIdx}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                              active ? 'bg-teal-50 text-teal-700' : 'text-gray-900'
                                            }`
                                          }
                                          value={method}
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected ? 'font-medium' : 'font-normal'
                                                }`}
                                              >
                                                {method.name}
                                              </span>
                                              {selected && (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-700">
                                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
                            <span className="text-xs text-red mt-2">Payment Method is mandatory</span>
                          )}
                        </div>
                        {/* PAID BY end */}

                        </div>

                        <div className="flex gap-2">
                              <div className="mb-4">
                                <Input
                                  id="price"
                                  register={register("price")}
                                  type="number"
                                  placeholder="CHF"
                                  error={errors.price}
                                />
                              </div>
                          

                            
                              <div className="mb-4">
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
                            <Button AddNew="Add" type="submit" />
                        </div>

                    </form>
                    
                  </div>
                </div>
              )
            );
          };

export default AddInc;






