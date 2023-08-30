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
import AddExp from "../components/AddExp";
import { format } from "date-fns";
import { compareAsc } from "date-fns";
import supabase from "../../supabase/supabase";

const Incoming = ({ item, handleOverlayClick }) => {
  const selectedMonth = useSelector((state) => state.month.value);
  const [filteredData, setFilteredData] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const userData = useSelector((state) => state.user.id);
  const [UserUID, setUserUID] = useState(null);
  const [fetchedUserUID, setFetchedUserUID] = useState(false);

  const handleAddIncome = () => {
    setShowRegister(true);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

 useEffect(() => {
    if (fetchedUserUID) {
      fetchIncoming();
    }
  }, [selectedMonth, fetchedUserUID]);

  useEffect(() => {
    if (userData || fetchedUserUID) {
      fetchIncoming();
      console.log("LOG 1 - userData user id userData:", userData);
    } else {
      console.log("error 1-  userData is not available");
    }
  }, [selectedMonth, userData, fetchedUserUID]);

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        console.log("LOG 2 - User signed in:", user.id);
      } else if (event === "SIGNED_OUT") {
        console.log("error 2 -  User signed out");
      }
    });
    return authListener.data.subscription.unsubscribe();
  }, []);

  const fetchUserData = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (data.session !== null) {
        const user = data.session.user;
        setUserUID(user.id);
        setFetchedUserUID(true);
        console.log("LOG 4 - User UID set:", user.id);
        fetchIncoming();
    } else {
        console.log(" error 3 - No user session available.");
    }
  };

  const fetchIncoming = async () => {
    if (UserUID) {
    console.log("LOG 5 - Fetching incoming for userUID:", UserUID); 
    const { data, error } = await supabase
      .from("incoming")
      .select("*")
      .eq("user_id", UserUID);

      if (error) {
        console.error("Error fetching incoming:", error.message);
        throw error;
      }

      const monthMapping = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
      };

      const selectedMonthNumber = monthMapping[selectedMonth];

      const filteredData = data
        .filter((incoming) => {
          const incomingMonth =
            new Date(incoming["posts/dateValue"]).getMonth() + 1;
          return incomingMonth === selectedMonthNumber;
        })
        .map((incoming) => ({
          ...incoming,
          formattedDate: format(
            new Date(incoming["posts/dateValue"]),
            "dd-MM-yyyy"
          ),
          price: incoming["posts/price"],
          payBy: incoming["posts/payBy"],
          category: incoming["posts/category"],
          item: incoming["posts/item"],
          // id: id['items/id'],
        }));

      console.log("Filtered data:", filteredData);
      setFilteredData(filteredData);
  }
    };
  

  return (
    <Layout items={item}>
      {showRegister && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overlay backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <AddExp
            item={item}
            handleOverlayClick={handleOverlayClick}
            onRegisterSuccess={handleRegisterSuccess}
            onClose={handleCloseRegister}
            handleAddIncoming={handleAddIncome}
          />
        </div>
      )}

      <div className="bg-white !shadow-lg mt-10">
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
}



export default Incoming;
