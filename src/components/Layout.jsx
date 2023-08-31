import React from "react";
import Header from "./Header";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import Header1 from "./Header1";
import { useSelector } from 'react-redux'


const Layout = ({ children, users, totalPrice, item, pathName, getMonthFromDate, selectedMonth, UserUID }) => {
    const userData = useSelector((state) => state.user.id);
    const totalIncome = useSelector((state) => state.suminc.totalIncome);
    const totalExpense = useSelector((state) => state.sumexp.totalExpense);


 
    return (
     <main className="relative block md:flex md:h-full bg-gray-100">
            <Menu className="shadow-lg"/> 
            <div>   
                <MenuMobile  />
            </div>


                <div className="w-full">
                    <div>
                        <Header1/>
                    </div>

                    <div className="mx-10">
                        <Header users={users} totalPrice={totalPrice} item={item} pathName={pathName} getMonthFromDate={getMonthFromDate} selectedMonth={selectedMonth} UserUID={UserUID} totalIncome={totalIncome} totalExpense={totalExpense}/>
                    {children} 
                    </div>
                </div>
        </main>
)};

export default Layout;



