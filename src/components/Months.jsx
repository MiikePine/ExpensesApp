import {React, useState} from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMonth } from '../store/slices/monthSlice';


export const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function Months({ }) {

 

  const [isListOpen, setIsListOpen] = useState(false);

  const dispatch = useDispatch();
  const selectedMonth = useSelector((state) => state.month.value);

  const handleSelectMonth = (newMonth) => {
    console.log("Calling handleSelectMonth in Months:", newMonth);
    dispatch(setSelectedMonth(newMonth));
    setIsListOpen(false); 
  };

  return (
    <div className="w-32">
      <Listbox value={selectedMonth} onChange={handleSelectMonth}>
  <div className="relative">
    <Listbox.Button
      onClick={() => setIsListOpen(!isListOpen)}
      className="relative w-full bg-white py-3 pl-3 pr-10 text-left text-xs shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
    >
      <span className="block truncate">{selectedMonth}</span>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
    </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {months.map((month, monthIdx) => (
              <Listbox.Option
                key={monthIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-green-100 text-green-900' : 'text-gray-900'
                  }`
                }
                value={month}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {month}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}




export default Months;
