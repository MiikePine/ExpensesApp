import React, { useEffect } from "react";
import { useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InfoFilter2 = ({ item }) => {
  return (
    <div>
      <div className="grid mt-2 md:mt-2 py-1 md:pl-32 w-full ">
        <div className="flex justify-between gap-44 text-zinc-500">
          {/* <div  className="text-base md:text-sm md:block py-8 md:py-0 basis-1/4 md:pl-16">{item.item}</div> */}
          <div className="text-base md:text-sm md:block py-2 md:py-0 basis-1/4">
            {item.category}{" "}
          </div>
          <div className="text-xl md:text-sm md:block py-8 md:py-0 basis-1/4 ">
            {item.payBy}
          </div>
          <div className="flex  md:text-base md:block py-4 md:py-0 basis-1/4">
            <div className="text-xl md:text-base md:block py-2 md:py-0 basis-1/4 ">
              {" "}
              {item.price}{" "}
            </div>
            <p className="text-xs ml-1 align-bottom ">CHF</p>
          </div>

          <div className="text-xl md:text-sm md:block py-4 md:py-0 basis-1/4">
            {item.dateValue}
          </div>
        </div>
      </div>
      <div className="border-b-2 border-neutral-300 pb-8 md:pb-1 md:mx-2"></div>
    </div>
  );
};

export default InfoFilter2;
