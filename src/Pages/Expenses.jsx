import React, { useEffect, useState } from 'react';
import { Card, Title, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import Layout from "../components/Layout";
import { useSelector } from 'react-redux';
import AddExp from '../components/AddExp';
import { compareAsc } from 'date-fns';
import { initializeApp } from 'firebase/app';
import { app, } from '../../firebase/firebaseSetup.js'
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore/lite';
import {myFS} from '../../firebase/firebaseSetup.js'

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
  const fetchData = async () => {
    try {
    
      const db = getFirestore();
      const docRef = doc(db, "items", "ksdl601DH4Fptbc9EryS");
      const docSnap = await getDoc(docRef);
    

    if (initialRender) {
      fetchExpenses(); 
      setInitialRender(false);
    } else {
      fetchExpenses(); 
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
  
fetchData();

}, [selectedMonth, initialRender, myFS]);

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
   
const db = getFirestore();
const collectionRef = collection(db, "items");
const querySnapshot = await getDocs(collectionRef);
const responseData = querySnapshot.docs.map((doc) => doc.data());
console.log("Fetched Data:", responseData);

        
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
  
      const filteredData = responseData.filter(expense => {
        const expenseMonth = new Date(expense.dateValue).getMonth() + 1;
        return expenseMonth === selectedMonthNumber;
      }).map(expense => ({
        ...expense,
        formattedDate: format(new Date(expense.dateValue), 'dd-MM-yyyy')
      }));
  
      console.log("Filtered data:", filteredData);
      setFilteredData(filteredData);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
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
      <Card className="!bg-white border-red-300 shadow-lg">
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
                <TableHeaderCell>Item</TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Price (CHF)</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Pay By</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.item}</TableCell>
                  <TableCell>{user.category}</TableCell>
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
