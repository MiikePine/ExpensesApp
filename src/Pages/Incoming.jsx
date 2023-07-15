import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Card, Title, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import Layout from "../components/Layout";
import { useSelector } from 'react-redux';
import Register from '../components/Register';

const Expenses = ({ item , showRegister, handleAddExpense}) => {
  const selectedMonth = useSelector((state) => state.month.value);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, [selectedMonth]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/posts");
      console.log("Response data:", response.data);

      const monthMapping = { 
        'Janeiro': 1,
        'Fevereiro': 2,
        'Março': 3,
        'Abril': 4,
        'Maio': 5,
        'Junho': 6,
        'Julho': 7,
        'Agosto': 8,
        'Setembro': 9,
        'Outubro': 10,
        'Novembro': 11,
        'Dezembro': 12,
      };

      const selectedMonthNumber = monthMapping[selectedMonth];

      const filteredData = response.data.filter(expense => {
        const expenseMonth = new Date(expense.dateValue).getMonth() + 1;
        return expenseMonth === selectedMonthNumber;
      });

      console.log("Filtered data:", filteredData);
      setFilteredData(filteredData);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
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
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.item}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.dateValue}</TableCell>
                  <TableCell>{item.payBy}</TableCell>
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
