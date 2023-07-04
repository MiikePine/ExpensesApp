
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import InfoFilter2 from "../components/InfoFilter2";

function Incoming({ item, totalSpent, users, totalPrice }) {
  const [incomingData, setIncomingData] = useState([]);
  const pathName = location.pathname.slice(1);


  useEffect(() => {
    fetchIncomingData();
  }, []);

  const fetchIncomingData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/posts");
      setIncomingData(response.data);
    } catch (error) {
      console.error("Error retrieving incoming data:", error);
    }
  };


  console.log(incomingData);

  return (

      <Layout user={users} totalSpent={totalSpent} item={item} pathName={pathName}>



<div className="flex md:grid md:text-left mt-4 flex-row w-full  text-zinc-600 font-bold">
     <div className="flex justify-between gap-52">
                <p className="text-xl md:text-sm md:block py-0 md:py-0">Categoria</p>
                <p className="text-xl md:text-sm md:block py-0 md:py-0">Método Pagamento</p>
                <div className="flex md:text-sm md:block py-4 md:py-0">
                  <p className="text-sm">Quantia</p>
                </div>
                <p className="text-xl md:text-sm md:block py-4 md:py-0">Data</p>
          </div>
    </div>
<div className="border-b-4 border-neutral-300 pb-8 md:pb-6 md:mx-12"></div>



        <div>
          {incomingData.map((item) => (
            <InfoFilter2
              key={item.id}
              item={item}
              totalPrice={totalPrice}
              fetchIncomingData={fetchIncomingData}
              // onDeletingUser={handleDeleteUser}
            />
          ))}
        </div>
      </Layout>
   
  );
}

export default Incoming;


