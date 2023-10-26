import React, { useEffect, useState } from "react";
import {
  Card,
  Title,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@tremor/react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import AddInc from "../components/AddInc";
import { format } from "date-fns";
import { compareAsc } from "date-fns";
import supabase from "../../supabase/supabase";
import { useDispatch } from "react-redux";
import { updateTotalExpense } from "../store/slices/sumexpSlice";
import { updateTotalIncoming } from "../store/slices/sumincSlice";
import { setSelectedYear } from "../store/slices/yearSlice";
import DataFetcher from '../components/DataFetcher'; 


const Incoming = ({ item, handleOverlayClick, sortedIncomingData}) => {
  const [showRegister, setShowRegister] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [UserUID, setUserUID] = useState(null);
  const [fetchedUserUID, setFetchedUserUID] = useState(false);
  const [filteredExpenseData, setFilteredExpenseData] = useState([]);
  const [filteredIncomingData, setFilteredIncomingData] = useState([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isDivVisible, setIsDivVisible] = useState(true);


  const totalExpense = useSelector((state) => state.sumexp.totalExpense);
  const totalIncoming = useSelector((state) => state.suminc.totalIncoming);

  const selectedYear = useSelector((state) => state.year.value);
  const selectedMonth = useSelector((state) => state.month.value);
  const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();




  const handleAddIncome = () => {
    setShowRegister(true);
  };

  const handleRegisterSuccess = (data) => {};

  const handleCloseRegister = () => {
    setShowRegister(false);
  };



  const handleSelectYear = async (newYear) => {
    dispatch(setSelectedYear(newYear));
    // Resto do seu código
  };

  useEffect(() => {
    fetchIncoming();
  }, [selectedYear]);


  console.log('isHeaderVisible:', isHeaderVisible);

  return (
    <Layout items={item} showHeader={true}               showRegister={showRegister}
    >
      {showRegister && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overlay backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <AddInc
            item={item}
            handleOverlayClick={handleOverlayClick}
            onRegisterSuccess={handleRegisterSuccess}
            onClose={handleCloseRegister}
            handleAddIncoming={handleAddIncome}
          />
        </div>
      )}

      <div className="bg-white !shadow-lg mt-4 md:mt-4 ">
      <div
  className={`${
    showRegister ? "max-h-[40vh-100px]" : "max-h-[100vh-300px]"
  } overflow-y-auto`}
>
<DataFetcher filteredIncomingData={filteredIncomingData} sortedIncomingData={sortedIncomingData} />
        <Card className="!bg-white shadow-lg rounded-none border-none ring-0">
          <Title className="bg-white !text-gray-600 flex items-center">
            <span className="text-center flex-grow">Incoming List</span>
            <button
              className="py-2 px-8 flex items-center text-sm bg-teal-700 text-bg-white text-white font-bold hover:text-teal-700 hover:bg-white hover:border border-teal-700 ml-auto"
              onClick={handleAddIncome}
            >
              Add +
            </button>
          </Title>
       

<Table
  className="mt-10 bg-white text-green-100 flex justify-around mx-0 md:mx-10 mb-1"
>          <TableHead className="bg-white justify-between w-full sticky top-0 z-10">
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
              {sortedIncomingData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4">{item.item}</TableCell>
                  <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4"> {item.category}</TableCell>
                  <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
                    {item.price} <span className="text-xs">CHF</span>
                  </TableCell>
                  <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4">{item.formattedDate}</TableCell>
                  <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4">{item.payBy}</TableCell>
                  {/* <TableCell>{item.id}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        </div>

        </div>
    </Layout>
  );
};

export default Incoming;
