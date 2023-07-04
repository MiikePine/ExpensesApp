import React from "react";
import Header from "./Header";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import Header1 from "./Header1";

const Layout = ({ children, users, totalPrice, item, pathName }) => {
  return (
     <main className="relative block md:flex md:h-full bg-neutral-100">
            <Menu className="shadow-lg"/> 
            <div>   
                <MenuMobile  />
            </div>


                <div className="w-full">
                    <div>
                        <Header1/>
                    </div>

                    <div className="mx-10">
                        <Header users={users} totalPrice={totalPrice} item={item} pathName={pathName}/>
                    {children} 
                    </div>
                </div>
        </main>
)};

export default Layout;



