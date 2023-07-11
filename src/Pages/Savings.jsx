


import axios from "axios";
import { Card, Title, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import Layout from "../components/Layout";
import { Fragment, useState, useEffect } from 'react'
import Register from "../components/Register";

const Savings = ({item}) => {
  const [data, setData] = useState([]);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      setData(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };

  const handleAddExpense = () => {
    setShowRegister(true);
  };

  return (
    <Layout items={item}>
      <button className="p-4 bg-green-600 text-white -font-bold hover:bg-green-200 rounded-lg" onClick={handleAddExpense}>Add Exp.</button>
      {showRegister && <Register />}
    </Layout>
  );
};

export default Savings;
