// import { useEffect, useState } from "react";
// import { format } from "date-fns";
// import { compareAsc } from "date-fns";
// import supabase from "../../supabase/supabase";
// import { useDispatch } from "react-redux";
// import { updateTotalExpense } from "../store/slices/sumexpSlice";

// const ExpenseDataFetcher = ({
//   selectedMonth,
//   userData,
//   fetchedUserUID,
//   UserUID,
// }) => {
//   const [filteredExpenseData, setFilteredExpenseData] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     console.log("ExpenseDataFetcher - useEffect started");

//     if (userData || fetchedUserUID) {
//       fetchExpense();
//     }
//   }, [selectedMonth, userData, fetchedUserUID]);

//   const fetchExpense = async () => {
//     console.log("Função fetchExpense está sendo chamada.");
//     console.log("ExpenseDataFetcher - fetchExpense started");

//     if (UserUID) {
//       console.log("LOG 5 - Fetching expenses for userUID:", UserUID);
//       const { data, error } = await supabase
//         .from("expense")
//         .select("*")
//         .eq("user_id", UserUID);

//       if (error) {
//         console.error("Error fetching expenses:", error.message);
//         throw error;
//       }

//       const monthMapping = {
//         January: 1,
//         February: 2,
//         March: 3,
//         April: 4,
//         May: 5,
//         June: 6,
//         July: 7,
//         August: 8,
//         September: 9,
//         October: 10,
//         November: 11,
//         December: 12,
//       };

//       const selectedMonthNumber = monthMapping[selectedMonth];

//       const filteredDataExp = data
//         .filter((expense) => {
//           const expenseMonth =
//             new Date(expense["items/dateValue"]).getMonth() + 1;
//           return expenseMonth === selectedMonthNumber;
//         })
//         .map((expense) => ({
//           ...expense,
//           formattedDate: format(
//             new Date(expense["items/dateValue"]),
//             "dd-MM-yyyy"
//           ),
//           price: expense["items/price"],
//           payBy: expense["items/pay_by"],
//           category: expense["items/category"],
//           item: expense["items/item"],
//           // id: id['items/id'],
//         }));

//       console.log("Filtered data expense:", filteredDataExp);
//       setFilteredExpenseData(filteredDataExp);

//       if (filteredDataExp.length > 0) {
//         const totalExpense = filteredDataExp.reduce(
//           (sum, item) => sum + item.price,
//           0
//         );
//         dispatch(updateTotalExpense(totalExpense));
//         console.log("totalExpense:", totalExpense);

//       }
//       setFilteredExpenseData(filteredDataExp);
//       console.log("Filtered data expense:", filteredDataExp);

//     }
//     console.log("ExpenseDataFetcher - fetchExpense finished");

//   };

//   return null; // Este componente não renderiza nada, apenas busca os dados.
// };

// export default ExpenseDataFetcher;
