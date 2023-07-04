import React from "react";
import Layout from "../components/Layout";
import Filter from "../components/Filter";
import { useState, useEffect } from "react";
import InfoFilter from "../components/InfoFilter";
import axios from "axios";
import Button from "../components/Button";
import Register from "../components/Register";
import { useSelector, useDispatch } from "react-redux";
import Logout from "./Logout"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { BiHomeAlt } from 'react-icons/Bi';
import Header1 from "../components/Header1";



const Members = () => {
  const [users, setUsers] = useState([]);
  const [filterActif, setFilterActif] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);
  const [newUserAdded, setNewUserAdded] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const user = useSelector((state) => state.user.value);
  const pathName = location.pathname.slice(1);


  const openMenuM = () => {
    setShowRegister(prevState => !prevState);
  };

  const handleDeleteUser = (deletedUser) => {
    setUsers(users.filter((user) => user.id !== deletedUser.id));
  };

  const updateUsers = () => {
    setNewUserAdded((prevState) => !prevState);
  };

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  useEffect(() => {
    console.log(newUserAdded);
    fetchUsers();
  }, [newUserAdded]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      setUsers(response.data);
    } catch (error) {}
  };

  const handleNewUser = () => {
    setNewUserAdded((prevState) => !prevState);
  };

  function convertDate(inputFormat) {
    let dt = inputFormat.split("-");
    return new Date(dt[2], dt[1] - 1, dt[0]);
  }

  const handleFilterActif = (isActive) => {
    setFilterActif(isActive);
  };

  const filteredUsers = filterActif
    ? users.filter((user) => user.actif)
    : users;

  let sortedUsers = [...filteredUsers];
  if (sortByDate) {
    sortedUsers.sort(
      (a, b) => convertDate(b.dateValue) - convertDate(a.dateValue)
    );
  }

  return (

      <Layout users={user}>
     

     <div className="flex md:grid md:text-left mt-4 flex-row w-full  text-zinc-600 font-bold">
     <div className="flex justify-between gap-52">
                  <div  className="text-base md:text-sm md:block py-8 md:py-0 basis-1/4 md: text-zinc-500">Produto</div>
                  <div className="text-xl md:text-sm md:block py-8 md:py-0 basis-1/4 md:">Categoria</div>
                  <div className="text-xl md:text-sm md:block py-8 md:py-0 basis-1/4 md:">Método Pagamento</div>
                  <div className="flex">
                      <div className="text-xl md:text-sm md:block py-4 md:py-0 basis-1/4 md:"> Preco</div>
                       <p className="text-xs ml-1 align-bottom ">CHF</p>
                  </div>     
                  <div className="text-xl md:text-sm md:block py-4 md:py-0 basis-1/4 md:">Data </div>    
            </div>  
        </div>

<div className="border-b-4 border-neutral-300 mb-8 pb-0 md:pb-4 md:mx-2"></div>
        <div>
          {sortedUsers.map((user) => (
            <InfoFilter
              key={user.id}
              user={user}
              onDeletingUser={handleDeleteUser}
            />
          ))}
        </div>
        {/* {showRegister && <Register onRegisterSuccess={updateUsers} />} */}
      </Layout>
   
  );
};

export default Members;
