import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Card, Title, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import Layout from "../components/Layout";
import { useSelector } from 'react-redux';
import AddInc from '../components/AddInc';

const Incoming = ({ item}) => {
  const selectedMonth = useSelector((state) => state.month.value);
  const [showRegister, setShowRegister] = useState(false);

  const [filteredData, setFilteredData] = useState([]);

  const handleAddExpense = () => {
    setShowRegister(true);
  };

  const handleOverlayClick = () => {
    console.log('handleOverlayClick called');
  };

  const handleRegisterSuccess = () => {
    console.log('handleRegisterSuccess called');
  };

  const handleCloseRegister = () => {
    console.log('handleCloseRegister called');
  };


 

  useEffect(() => {
    fetchExpenses();
  }, [selectedMonth]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/posts");
      console.log("Response data:", response.data);

      const monthMapping = { 
        'January': 1,
        'February': 2,
        'March': 3,
        'April': 4,
        'May': 5,
        'June': 6,
        'July': 7,
        'August': 8,
        'September': 9,
        'October': 10,
        'November': 11,
        'December': 12,
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
<AddInc            item={item}
            handleOverlayClick={handleOverlayClick}
            onRegisterSuccess={handleRegisterSuccess}
            onClose={handleCloseRegister}
            handleAddExpense={handleAddExpense}
           />
  </div>
)}

    

      <div className="bg-white !shadow-lg mt-10">
        <Card className="!bg-white !border-none shadow-lg  grid">
        <Title className="bg-white !text-gray-600 flex items-center">

<span className="text-center flex-grow">Expenses List</span>
          <button
                className="py-2 px-8 flex items-center text-sm bg-teal-700 text-bg-white text-white font-bold hover:text-teal-700 hover:bg-white hover:border border-teal-700 ml-auto"
                onClick={handleAddExpense}
              >
                Add +
          </button>
          
          </Title>

          <Table className="mt-10 bg-white text-green-100">
            <TableHead className="bg-white">
              <TableRow className="bg-white">
                <TableHeaderCell>Category</TableHeaderCell>             
                <TableHeaderCell>Price (CHF)</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Pay By</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.category}</TableCell>          
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

export default Incoming;
