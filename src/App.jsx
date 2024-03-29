import React, { useState } from "react";
import Button from "./components/Button";
import Search from "./components/Search";
import Form from "./components/Form";
import Input from "./components/Input";
import ForgotPw from "./Pages/ForgotPw";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Error from "./Pages/Error";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Expenses from "./Pages/Expenses";
import Menu from "./components/Menu";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Filter from "./components/Filter";
// import MenuMobile from "./components/MenuMobile";
import AddExp from "./components/AddExp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Incoming from "./Pages/Incoming";
import Savings from "./Pages/Savings";
import Register from "./Pages/Register";
import Banking from "./Pages/Banking";
// import Crypto from "./Pages/Crypto"


function App() {
  const [selectedMonth, setSelectedMonth] = useState("July");

  const getMonthFromDate = (date) => {
    const monthNumber = new Date(date).getMonth() + 1; // O método getMonth() retorna um valor de 0 a 11, por isso adicionamos 1
    return monthNumber;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} index />
        <Route path="/ForgotPw" element={<ForgotPw />} />
        <Route path="*" element={<Error />} />
        <Route path="/Settings" element={<Settings />} />
        {/* <Route path="/Logout" element={<Logout/>} /> */}
        <Route path="/Dashboard" element={<Dashboard />} />
        {/* <Route path="/Expenses" element={<Expenses />} /> */}
        <Route
          path="/Expenses"
          element={
            <Expenses
              selectedMonth={selectedMonth}
              getMonthFromDate={getMonthFromDate}
            />
          }
        />

        <Route path="/Menu" element={<Menu />} />
        <Route path="/Header" element={<Header />} />
        <Route path="/Layout" element={<Layout />} />
        <Route path="/Filter" element={<Filter />} />
        {/* <Route path="/MenuMobile" element={<MenuMobile />} /> */}
        <Route path="/AddExp" element={<AddExp />} />
        <Route path="/Incoming" element={<Incoming />} />
        <Route path="/Savings" element={<Savings />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Banking" element={<Banking />} />
        {/* <Route path="/Crypto" element={<Crypto />} />  */}

      </Routes>
      <ToastContainer autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
