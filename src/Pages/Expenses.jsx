import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Card, Title, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import Layout from "../components/Layout";
import { useSelector } from 'react-redux';
import Register from '../components/Register';
import { compareAsc } from 'date-fns';


const Expenses = ({ item, handleOverlayClick }) => {
  const selectedMonth = useSelector((state) => state.month.value);
  const [filteredData, setFilteredData] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  const handleAddExpense = () => {
    setShowRegister(true);
  };

  const sortedData = [...filteredData].sort((a, b) =>
  compareAsc(new Date(a.dateValue), new Date(b.dateValue))
);


  useEffect(() => {
    if (initialRender) {
      fetchExpenses(); 
      setInitialRender(false);
    } else {
      fetchExpenses(); 
    }
  }, [selectedMonth, initialRender]);

  const handleRegisterSuccess = (data) => {
   
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, [selectedMonth]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
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
          className="py-2 px-8 mb-4 flex items-center text-sm bg-teal-700 text-bg-white text-zinc-200 font-bold hover:text-teal-700 hover:bg-white hover:border border-teal-700"
          onClick={handleAddExpense}
        >
          Add +
        </button>
      </div>

      <div className="bg-white !shadow-lg">
      <Card className="!bg-white border-red-300 shadow-lg grid">
          <Title className="bg-white !text-gray-600 text-center">Lista de Despesas</Title>
          <Table className="mt-10 bg-white text-green-100">
            <TableHead className="bg-white">
              <TableRow className="bg-white">
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Item</TableHeaderCell>
                <TableHeaderCell>Price (CHF)</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Pay By</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.category}</TableCell>
                  <TableCell>{user.item}</TableCell>
                  <TableCell>{user.price} CHF</TableCell>
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
