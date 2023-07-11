import React from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from 'react-redux'
import  ChartInc  from "../components/ChartInc";
import  ChartExp  from "../components/ChartExp";





const Dashboard = (item) => {

  // const users = useSelector((state) => state.user.value)
  // const dispatch = useDispatch()
  const pathName = location.pathname.slice(1);


  return (
      <Layout  items={item} >


<div>
<div className="flex  justify-between w-full py-2  border-neutral-300 rounded-xl ">
    
    </div>



    <div className="flex ">
             <div className="w-full h-96 bg-white rounded-lg pb-16 pt-4 mr-8 shadow-lg">
                <p className="flex justify-center pb-4 text-zinc-500">Incoming</p>
                  <ChartInc/>
             </div>


             <div className="w-full h-96 bg-white rounded-lg pb-16 pt-4 ml-8 shadow-lg">
                <p className="flex justify-center pb-4 text-zinc-500">Expense</p>
                  <ChartExp/>
            </div>
    </div>



</div>

      </Layout>  

  );
};
  
export default Dashboard;




