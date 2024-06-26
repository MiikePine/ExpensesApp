import React from "react";
import Header from "./Header";
import Menu from "./Menu";
import MenuMobileR from "./MenuMobileR";
import Header1 from "./Header1";
import { useSelector } from "react-redux";
import HeaderSavings from "./HeaderSavings";
import DataFetcher from "./DataFetcher";

const Layout = ({
  children,
  users,
  totalPrice,
  item,
  pathName,
  getMonthFromDate,
  selectedMonth,
  UserUID,
  showHeader,
  showHeaderSavings,
  isDivVisible,
  showRegister,
  filteredIncomingData, 
  fetchIncoming, 
  sortedIncomingData
}) => {
  // const userData = useSelector((state) => state.user.id);
  const totalIncome = useSelector((state) => state.suminc.totalIncome);
  const totalExpense = useSelector((state) => state.sumexp.totalExpense);

  // console.log('showHeader in Layout:', showHeader);


  return (
    <main className="relative block md:flex md:h-screen bg-gray-100  max-h-screen overflow-auto md:overflow-hidden">
      <Menu className="shadow-lg" />
      <div>
        <MenuMobileR />
      </div>

      <div className="w-full h-full ">
        <div>
          <Header1 />
        </div>



        <div className="mx-4">
          {showHeader && (
            <Header
              users={users}
              totalPrice={totalPrice}
              item={item}
              pathName={pathName}
              getMonthFromDate={getMonthFromDate}
              selectedMonth={selectedMonth}
              UserUID={UserUID}
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              showRegister={showRegister}
              isDivVisible={isDivVisible}
              showHeader={showHeader}
            />
          )}
          {children}
        </div>

        <div className="mx-4">
  {showHeaderSavings && (
    <HeaderSavings
      users={users}
      totalPrice={totalPrice}
      item={item}
      pathName={pathName}
      getMonthFromDate={getMonthFromDate}
      selectedMonth={selectedMonth}
      UserUID={UserUID}
      totalIncome={totalIncome}
      totalExpense={totalExpense}

    />
  )}
</div>

      </div>
    </main>
  );
};

export default Layout;
