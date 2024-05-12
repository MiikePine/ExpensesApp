import { React, useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedYear } from "../store/slices/yearSlice";

export const years = [

  "2022",
  "2023",
  "2024",
];

function Year({onYearChange}) {
  const [isListOpen, setIsListOpen] = useState(false);
  // const [selectedYear, setSelectedYear] = useState("2023");


  const dispatch = useDispatch();
  const selectedYear = useSelector((state) => state.year.value);



  const handleSelectYear = (newYear) => {
    dispatch(setSelectedYear(newYear)); // Dispatch with a string
    setIsListOpen(false);
  
    // Call the onYearChange prop
    if (onYearChange) {
      onYearChange(newYear);
    }
  };

 

  return (
    <div className="w-32 h-8 z-50 rounded-xl">
      <Listbox className="text-zinc-500" value={selectedYear} onChange={handleSelectYear}>
        <div className="relative">
          <Listbox.Button
            onClick={() => setIsListOpen(!isListOpen)}
            className="relative w-full bg-white py-2 pl-3 pr-10 text-left text-xs shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm rounded-xl"
          >
            <span className="block truncate">{selectedYear}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {years.map((year, yearIdx) => (
              <Listbox.Option
                key={yearIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-green-100 text-green-900" : "text-zinc-500"
                  }`
                }
                value={year}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {year}
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

export default Year;
