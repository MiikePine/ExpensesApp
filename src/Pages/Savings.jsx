import axios from "axios";
import { Card, Title, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import Layout from "../components/Layout";
import { Fragment, useState, useEffect } from 'react'
import AddExp from "../components/AddExp";

const incoming = ({ user, item, selectedMonth, handleOverlayClick, handleRegisterSuccess, handleCloseRegister}) => {
  const [showRegister, setShowRegister] = useState(false);
  const [data, setData] = useState([]);


 
  return (
    <Layout items={item}>
      
    </Layout>
  );
};

export default incoming;



