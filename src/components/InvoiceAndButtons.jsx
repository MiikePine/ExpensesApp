import React from "react";
import InfoInvoice from "./InfoInvoice";
import ButonsInvoice from "./ButonsInvoice";

function InvoiceAndButtons({ user }) {
  return (
    <div className="md:flex mt-4 justify-around mx-24">
      <InfoInvoice key={user.id} user={user} />

      <ButonsInvoice />
    </div>
  );
}

export default InvoiceAndButtons;
