import React, { useEffect, useState } from "react";
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

const DataFetcher = ({ filteredIncomingData, sortedIncomingData }) => {


  const [showRegister, setShowRegister] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [UserUID, setUserUID] = useState(null);
  const [fetchedUserUID, setFetchedUserUID] = useState(false);
  const [filteredExpenseData, setFilteredExpenseData] = useState([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isDivVisible, setIsDivVisible] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(true);


  const totalExpense = useSelector((state) => state.sumexp.totalExpense);
  const totalIncoming = useSelector((state) => state.suminc.totalIncoming);

  const selectedYear = useSelector((state) => state.year.value);
  const selectedMonth = useSelector((state) => state.month.value);
  const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();


//   start exp
    useEffect(() => {
      fetchUserDataExp();
    }, []);



    const fetchUserDataExp = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session !== null) {
        const user = data.session.user;
        setUserUID(user.id);
        setFetchedUserUID(true);
        console.log("LOG 4 - User UID set: expense", user.id);
        fetchExpense();
      } else {
        console.log(" error 3 - No user session available. expense");
      }
    };

    useEffect(() => {
      if (userData || fetchedUserUID) {
        fetchExpense();
        console.log("LOG 1 - userData user id userData:", userData);
      } else {
        console.log("error 1-  userData is not available");
      }
      setIsDataLoaded(true); // Defina como true quando ambos os conjuntos de dados estiverem prontos

    }, [selectedMonth, userData, fetchedUserUID]); 






    useEffect(() => {
      if (fetchedUserUID) {
        fetchExpense();
      }
    }, [selectedMonth, fetchedUserUID]);

    useEffect(() => {
      if (filteredExpenseData.length > 0) {
        const totalExpense = filteredExpenseData.reduce(
          (sum, item) => sum + item.price,
          0
        );
        dispatch(updateTotalExpense(totalExpense));
        console.log("totalExpense:", totalExpense);
      }
    }, [filteredExpenseData, dispatch]);

    const fetchExpense = async () => {
      if (UserUID) {
        try {
        console.log("LOG 5 - Fetching expenses for userUID:", UserUID);
        const { data, error } = await supabase
          .from("expense")
          .select("*")
          .eq("user_id", UserUID);

        if (error) {
          console.error("Error fetching expenses:", error.message);
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

        const filteredDataExp = data
          .filter((expense) => {
            const expenseMonth =
              new Date(expense["items/dateValue"]).getMonth() + 1;
            return expenseMonth === selectedMonthNumber;
          })
          .map((expense) => ({
            ...expense,
            formattedDate: format(
              new Date(expense["items/dateValue"]),
              "dd-MM-yyyy"
            ),
            price: expense["items/price"],
            payBy: expense["items/pay_by"],
            category: expense["items/category"],
            item: expense["items/item"],
          }));

        console.log("Filtered data expense:", filteredDataExp);
        setFilteredExpenseData(filteredDataExp);
    } catch (error) {
    }
      }
    };

    // fetch exp END






















    // fetch inc start
    useEffect(() => {
        if (filteredIncomingData) {
          const sortedIncomingData = filteredIncomingData.slice().sort((a, b) => {
            const dateA = new Date(a["posts/dateValue"]);
            const dateB = new Date(b["posts/dateValue"]);
            return compareAsc(dateA, dateB);
          });
          setSortedData(sortedIncomingData);
        }
      }, [filteredIncomingData]);



    useEffect(() => {
      fetchUserDataInc();
    }, []);

    const fetchUserDataInc = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session !== null) {
        const user = data.session.user;
        setUserUID(user.id);
        setFetchedUserUID(true);
        console.log("LOG 4 - User UID set: incoming", user.id);
        fetchIncoming();
      } else {
        console.log(" error 3 - No user session available. incoming");
      }
    };

    useEffect(() => {
      if (userData || fetchedUserUID) {
        fetchIncoming();
        console.log("LOG 1 - userData user id userData:", userData);
      } else {
        console.log("error 1-  userData is not available");
      }

      console.log("userData or fetchedUserUID changed:", userData, fetchedUserUID);

    }, [selectedMonth, userData, fetchedUserUID]);

    useEffect(() => {
      if (fetchedUserUID) {
        fetchIncoming();
      }
    }, [selectedMonth, fetchedUserUID]);

    useEffect(() => {
      if (filteredIncomingData.length > 0) {
        const totalIncoming = filteredIncomingData.reduce(
          (sum, item) => sum + item.price,
          0
        );
        dispatch(updateTotalIncoming(totalIncoming));
        console.log("totalIncoming:", totalIncoming);
      }
      console.log("filteredData:", filteredIncomingData);
    }, [filteredIncomingData, dispatch]);

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

        const filteredDataInc = data
          .filter((incoming) => {
            const incomingMonth =
              new Date(incoming["posts/dateValue"]).getMonth() + 1;
            console.log("Selected Month Number: incoming ", selectedMonthNumber);
            console.log("Incoming Month: incoming ", incomingMonth); // This is where the error occurs
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
          }));

        console.log("Filtered data incoming:", filteredDataInc);

        const totalIncoming = filteredDataInc.reduce(
          (sum, item) => sum + item.price,
          0
        );

        dispatch(updateTotalIncoming(totalIncoming));

        setFilteredIncomingData(filteredDataInc); // Update the state with the filtered data
      }


    };


    return (
        <Layout>
<Incoming sortedIncomingData={sortedIncomingData} />
          {/* Rest of your component rendering... */}
        </Layout>
      );
}



export default DataFetcher;
