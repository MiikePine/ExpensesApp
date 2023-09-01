import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Images/logo4.png";



const RegisterSuccess = () => {
    return (
          <div className="w-screen md:w-2/6 h-110 top-24 ml-10 fixed z-50 flex items-center overflow-y-auto mb-10 shadow-xxl">
    
    
            <div className="flex-1 h-full border-2 b-green-700 border-neutral-200 overflow-y-auto bg-zinc-100 p-4 relative">
            
    
                 <div className="flex justify-end mt-4 mr-8">
                  <Button AddNew="Add" type="submit" onChange={insertData} />
                </div>
    
        </div>
              
            </div>
       
        
      );
    };
    

export default RegisterSuccess;

















