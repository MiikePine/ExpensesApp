// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   Title,
//   Table,
//   TableHead,
//   TableHeaderCell,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@tremor/react";
// import Layout from "../components/Layout";
// import axios from "axios";




// const Savings = ({ item, handleOverlayClick }) => {
//   const [fundsAvailable, setFundsAvailable] = useState(null);

//   const options = {
//     method: 'POST',
//     url: 'https://site2.sibsapimarket.com:8445/sibs/apimarket-sb/REPLACE_ASPSP-CDE/v1-0-3/funds-confirmations',
//     headers: {
//       'X-IBM-Client-Id': 'default',
//       'TPP-Transaction-ID': 'default',
//       'TPP-Request-ID': 'default',
//       Signature: 'default',
//       Digest: 'default',
//       'TPP-Certificate': 'default',
//       Date: 'default',
//       'content-type': 'application/json',
//       accept: 'application/json; charset=utf-8',
//     },
//     body: JSON.stringify({
//       cardNumber: '',
//       psuAccount: { iban: 'PT0000', bban: '', pan: '', maskedPan: '', msisdn: '', currency: '' },
//       payee: '',
//       instructedAmount: { currency: 'AAA', content: '00000' },
//     }),
//   };
  
//   request(options, function (error, response, body) {
//     if (error) throw new Error(error);
  
//     console.log(body);
//   });
  



//   return (
//     <Layout items={item} showHeader={true}>
      
  

//   <div>
//     <p>Fundos</p>
//     {fundsAvailable !== null ? <p>{fundsAvailable}</p> : <p>Carregando...</p>}
//   </div>

  
//     </Layout>
//   );
// };

// export default Savings;


import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios"; // Import axios

const Savings = ({ item, handleOverlayClick }) => {
  const [fundsAvailable, setFundsAvailable] = useState(null);

  useEffect(() => {
    // Define the request configuration
    const options = {
      method: 'POST',
      url: 'https://site2.sibsapimarket.com:8445/sibs/apimarket-sb/REPLACE_ASPSP-CDE/v1-0-3/funds-confirmations',
      headers: {
        'X-IBM-Client-Id': 'default',
        'TPP-Transaction-ID': 'default',
        'TPP-Request-ID': 'default',
        Signature: 'default',
        Digest: 'default',
        'TPP-Certificate': 'default',
        Date: 'default',
        'content-type': 'application/json',
        accept: 'application/json; charset=utf-8',
      },
      data: { // Use the 'data' property for the request body
        cardNumber: '',
        psuAccount: { iban: 'PT0000', bban: '', pan: '', maskedPan: '', msisdn: '', currency: '' },
        payee: '',
        instructedAmount: { currency: 'AAA', content: '00000' },
      },
    };
    
    // Make the HTTP request using axios
    axios(options)
      .then((response) => {
        // Handle the response data and set the fundsAvailable state
        const responseData = response.data; // adjust this based on the actual response structure
        setFundsAvailable(responseData);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, []); // Empty dependency array to run the effect only once

  return (
    <Layout items={item} showHeader={true}>
      <div>
        <p>Fundos</p>
        {fundsAvailable !== null ? <p>{fundsAvailable}</p> : <p>Carregando...</p>}
      </div>
    </Layout>
  );
};

export default Savings;
