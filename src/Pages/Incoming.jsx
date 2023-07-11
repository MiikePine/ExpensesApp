

import axios from "axios";
import { Card, Title, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import Layout from "../components/Layout";
import { Fragment, useState, useEffect } from 'react'
import Register from "../components/Register";

const Incoming = ({ item, selectedMonth,  handleAddExpense }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, [selectedMonth]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/posts?month=${selectedMonth}`);
      setData(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };


  return (
    <Layout items={item}>
      {showRegister && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Register />
        </div>
      )}

      <div className="flex justify-end">é
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
              {data.map((item) => (
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

export default Incoming;



