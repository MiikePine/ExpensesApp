import React, {useEffect} from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from 'react-redux'
import  ChartInc  from "../components/ChartInc";
import  ChartExp  from "../components/ChartExp";
import Months from "../components/Months";
import { setSelectedMonth } from '../store/slices/monthSlice';
import { updateTotalIncome } from "../store/slices/sumincSlice"


const Dashboard = ({ item, UserUID }) => {
  const selectedMonth = useSelector((state) => state.month.value); 
  // const userData = useSelector((state) => state.user.id);
  const totalIncome = useSelector((state) => state.suminc.totalIncome); // Access total income from Redux store

  const dispatch = useDispatch();



  const pathName = location.pathname.slice(1);
    console.log("useruID  - dashboard", UserUID)

  return (
      <Layout  items={item} UserUID={UserUID}>


    <div>
      <div className="flex  justify-between w-full py-2  border-neutral-300 rounded-xl ">
    </div>



    <div className="flex">
             <div className="w-full h-96 bg-white rounded-lg pb-16 pt-4 mr-4 shadow-lg">
                <p className="flex justify-center pb-4 text-zinc-500">Incoming</p>
                <ChartInc selectedMonth={selectedMonth}/>
             </div>

             <div className="w-full h-96 bg-white rounded-lg pb-16 pt-4 ml-2 shadow-lg">
                <p className="flex justify-center pb-4 text-zinc-500">Expense</p>
                  <ChartExp selectedMonth={selectedMonth}/>
            </div>
    </div>



</div>

      </Layout>  

  );
};
  
export default Dashboard;




