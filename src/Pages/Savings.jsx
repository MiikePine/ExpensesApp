import axios from "axios";
import { Card, Title, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import Layout from "../components/Layout";
import { Fragment, useState, useEffect } from 'react'
import Register from "../components/Register";

const Expenses = ({ user, item, selectedMonth, handleOverlayClick, handleRegisterSuccess, handleCloseRegister}) => {
  const [showRegister, setShowRegister] = useState(false);
  const [data, setData] = useState([]);


  useEffect(() => {
    fetchExpenses();
  }, [selectedMonth]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts", {
        params: {
          month: selectedMonth // Add the selected month as a query parameter
        }
      });
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
      {showRegister && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overlay" onClick={handleOverlayClick}>
    <Register onRegisterSuccess={handleRegisterSuccess} onClose={handleCloseRegister} />
  </div>
)}

      <div className="flex justify-end">
        <button
          className="py-2 px-8 mb-4 flex items-center text-sm bg-cyan-600 text-white font-bold hover:bg-blue-500 rounded-lg"
          onClick={handleAddExpense}
        >
          Add +
        </button>
      </div>

      <div className="bg-white !shadow-lg">
        <Card className="!bg-white !border-none shadow-lg  grid">
        <Title className="bg-white !text-zinc-400 text-center">Lista de Despesas</Title>
          <Table className="mt-10 bg-white text-green-100">
            <TableHead className="bg-white">
              <TableRow className="bg-white">
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Item</TableHeaderCell>
                <TableHeaderCell>Price</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Pay By</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
               {data.map((user) => (
                 <TableRow key={user.id}>
                   <TableCell>{user.category}</TableCell>
                   <TableCell>{user.item}</TableCell>
                   <TableCell>{user.price}</TableCell>
                   <TableCell>{user.dateValue}</TableCell>
                   <TableCell>{user.payBy}</TableCell>
                 </TableRow>
               ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </Layout>
  );
};

export default Expenses;



