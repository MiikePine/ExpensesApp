import axios from "axios";
import { Card, Title, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import Layout from "../components/Layout";
import { Fragment, useState, useEffect } from 'react'
import Register from "../components/Register";

const Expenses = ({ user, item, handleRegisterSuccess, selectedMonth }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [data, setData] = useState([]);

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      const filteredData = response.data.filter(item => {
        const itemMonth = new Date(item.dateValue).getMonth();
        const selectedMonthIndex = months.findIndex(month => month === selectedMonth);
        return itemMonth === selectedMonthIndex;
      });
      setData(filteredData);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };



  const handleAddExpense = () => {
    setShowRegister(true);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay") || e.target.classList.contains("close-button")) {
      setShowRegister(false);
    }
  };

  return (
    
    <Layout items={item} users={user}>
    


{showRegister && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overlay" onClick={handleOverlayClick}>
    <Register onRegisterSuccess={handleRegisterSuccess} onClose={handleCloseRegister} />
  </div>
)}
      <div className="flex justify-end">
        <button
          className="py-3 px-8 mb-4 flex items-center bg-cyan-600 text-white font-bold hover:bg-blue-500 rounded-lg"
          onClick={handleAddExpense}
        >
          Add +
        </button>
      </div>

      <div className="bg-white">
        <Card className="bg-white">
          <Title className="bg-white text-zinc-400">Lista de Despesas</Title>
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
