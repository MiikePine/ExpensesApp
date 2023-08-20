import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Card, Title, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import Layout from "../components/Layout";
import { useSelector } from 'react-redux';
import AddInc from '../components/AddInc';
import { compareAsc } from 'date-fns';
import { format } from 'date-fns';
import incomingData from './incoming.json';




const Incoming = ({ item, handleOverlayClick }) => {
  const selectedMonth = useSelector((state) => state.month.value);
  const [filteredData, setFilteredData] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  const handleAddIncoming = () => {
    setShowRegister(true);
  };

  const sortedData = [...filteredData].sort((a, b) =>
  compareAsc(new Date(a.dateValue), new Date(b.dateValue))
);

  useEffect(() => {
    if (initialRender) {
      fetchIncoming(); 
      setInitialRender(false);
    } else {
      fetchIncoming(); 
    }
  }, [selectedMonth, initialRender]);

  const handleRegisterSuccess = (data) => {
   
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  useEffect(() => {
    fetchIncoming();
  }, [selectedMonth]);

  const fetchIncoming = async () => {
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

      const filteredData = incomingData.filter(incoming => {
        const incomingMonth = new Date(incoming.dateValue).getMonth() + 1;
        return incomingMonth === selectedMonthNumber;
      }).map(incoming => ({
        ...incoming,
        formattedDate: format(new Date(incoming.dateValue), 'dd-MM-yyyy')
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
 <AddInc
            item={item}
            handleOverlayClick={handleOverlayClick}
            onRegisterSuccess={handleRegisterSuccess}
            onClose={handleCloseRegister}
            handleAddIncoming={handleAddIncoming}
          />  

  </div>
      )}


      <div className="bg-white !shadow-lg mt-10">
      <Card className="!bg-white border-red-300 shadow-lg">
      <Title className="bg-white !text-gray-600 flex items-center">

          <span className="text-center flex-grow ml-10">Incoming List</span>
          <button
            className="py-2 px-8 flex items-center text-sm bg-teal-700 text-bg-white text-white font-bold hover:text-teal-700 hover:bg-white hover:border border-teal-700 ml-auto"
            onClick={handleAddIncoming}
          >
            Add +
          </button>
</Title>


          <Table className="mt-10 bg-white text-green-100 flex">
            <TableHead className="bg-white  justify-around">
              <TableRow className="bg-white  justify-around">
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Price (CHF)</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Pay By</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {filteredData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.category}</TableCell>
                    <TableCell>{user.price} CHF</TableCell>
                    <TableCell>{user.formattedDate}</TableCell>
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

export default Incoming;