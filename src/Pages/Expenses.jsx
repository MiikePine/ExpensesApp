import React, { useEffect, useState } from 'react';
import { Card, Title, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import Layout from "../components/Layout";
import { useSelector } from 'react-redux';
import AddExp from '../components/AddExp';
import { format } from 'date-fns'; 
import { compareAsc } from 'date-fns';
import { createClient } from '@supabase/supabase-js'; 

const Expenses = ({ item, handleOverlayClick }) => {
  const selectedMonth = useSelector((state) => state.month.value);
  const [filteredData, setFilteredData] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  const supabaseUrl = 'https://tubnpuzyuhjyhslwbshd.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Ym5wdXp5dWhqeWhzbHdic2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI4NTc1OTEsImV4cCI6MjAwODQzMzU5MX0.G-Z3MGdzPiDCEpa_vOpriMvivCrlyBInVuf8z1COOxQ';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const handleAddExpense = () => {
    setShowRegister(true);
  };



useEffect(() => {
  if (initialRender) {
    fetchExpense(); 
    setInitialRender(false);
  } else {
    fetchExpense(); 
  }
}, [selectedMonth, initialRender]);

const handleRegisterSuccess = (data) => {
};

const handleCloseRegister = () => {
  setShowRegister(false);
};


useEffect(() => {
  // console.log('Incoming Data:', incomingDB.data);
  fetchExpense();
}, [selectedMonth]);


const fetchExpense = async () => {
  try {
    const { data, error } = await supabase
    .from('posts')
    .select('*');

console.log("data from supabase:", data)
    // setFilteredData(data.filter);

    if (error) {
      throw error;
    }


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

        const filteredData = data.filter(expense => {
          const expenseMonth = new Date(expense['items/dateValue']).getMonth() + 1;
          return expenseMonth === selectedMonthNumber;
                }).map(expense => ({
          ...expense,
          formattedDate: format(new Date(expense['items/dateValue']), 'dd-MM-yyyy'),
          price: expense['items/price'],
          payBy: expense['items/payBy'],
          category: expense['items/category'],
          item: expense['items/item'],
          // id: id['items/id'],
        }));
       
        console.log("Filtered data:", filteredData);
        setFilteredData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  


  return (
    <Layout items={item}>
      {showRegister && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overlay backdrop-blur-sm" onClick={handleOverlayClick}>
          <AddExp
            item={item}
            handleOverlayClick={handleOverlayClick}
            onRegisterSuccess={handleRegisterSuccess}
            onClose={handleCloseRegister}
            handleAddExpense={handleAddExpense}
          />  
        </div>
      )}


      <div className="bg-white !shadow-lg mt-10">
        <Card className="!bg-white shadow-lg rounded-none border-none ring-0">
          <Title className="bg-white !text-gray-600 flex items-center">
            <span className="text-center flex-grow">Expenses List</span>
            <button
              className="py-2 px-8 flex items-center text-sm bg-teal-700 text-bg-white text-white font-bold hover:text-teal-700 hover:bg-white hover:border border-teal-700 ml-auto"
              onClick={handleAddExpense}
            >
              Add +
            </button>
          </Title>

          <Table className="mt-10 bg-white text-green-100 flex justify-around">
  <TableHead className="bg-white  justify-between">
    <TableRow className="bg-white justify-between">
      {/* <TableHeaderCell>ID</TableHeaderCell> */}
      <TableHeaderCell>Item</TableHeaderCell>
      <TableHeaderCell>Category</TableHeaderCell>
      <TableHeaderCell>Price (CHF)</TableHeaderCell>
      <TableHeaderCell>Date</TableHeaderCell>
      <TableHeaderCell>Pay By</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {filteredData.map((item) => (
      <TableRow key={item.id}>
        {/* <TableCell>{item.id}</TableCell> */}
        <TableCell>{item.item}</TableCell>
        <TableCell>{item.category}</TableCell>
        <TableCell>{item.price}</TableCell>
        <TableCell>{item.formattedDate}</TableCell>
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
