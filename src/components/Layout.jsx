import React from "react";
import Header from "./Header";
import Menu from "./Menu";
import MenuMobileR from "./MenuMobileR";
import Header1 from "./Header1";
import { useSelector } from "react-redux";
import HeaderSavings from "./HeaderSavings";

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
}) => {
  // const userData = useSelector((state) => state.user.id);
  const totalIncome = useSelector((state) => state.suminc.totalIncome);
  const totalExpense = useSelector((state) => state.sumexp.totalExpense);

  return (
    <main className="relative block md:flex md:h-screen bg-zinc-100  max-h-screen overflow-hidden overflow-y-auto">
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
