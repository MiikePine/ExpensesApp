import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import AddExp from "../components/AddExp";
import axios from 'axios';


const Banking = ({ item, handleOverlayClick }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [accessToken, setAccessToken] = useState(""); // Estado para armazenar o token de acesso
  const [balance, setBalance] = useState(null); // Estado para armazenar o saldo

  const fetchBankData = () => {
    // Faça uma solicitação à API TrueLayer com o token de acesso
    axios
      .get("https://auth.truelayer.com/?response_type=code&client_id=pinetree-e4ca85&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=http://localhost:5173/Banking&providers=uk-ob-all%20uk-oauth-all", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // Atualize os estados com os dados do saldo e movimentos
        setBalance(response.data.balance);
        setTransactions(response.data.transactions);
      })
      .catch((error) => {
        console.error("Erro ao obter dados do banco:", error);
      });
  };

  // Use o useEffect para chamar fetchBankData quando o accessToken for definido
  useEffect(() => {
    if (accessToken) {
      fetchBankData();
    }
  }, [accessToken]);


    const handleConnectBank = () => {
        // Aqui você pode redirecionar o usuário para a página de autenticação da TrueLayer
        // Use a URL gerada que você obteve anteriormente
        window.location.href = "https://auth.truelayer.com/?response_type=code&client_id=pinetree-41afde&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=https://console.truelayer.com/redirect-page&providers=uk-ob-all%20uk-oauth-all%20pt-ob-all"
        // Certifique-se de que a URL acima esteja correta e corresponda à configuração da sua aplicação na TrueLayer.
      };

  return (
    <Layout 
      items={item} 
      showHeader={true} 
      showHeaderSavings={false} 
      showRegister={showRegister}   
    >
      {showRegister && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <AddExp
            item={item}
            handleOverlayClick={handleOverlayClick}
            onClose={handleCloseRegister}
            handleAddExpense={handleAddExpense}
            onRegisterSuccess={handleRegisterSuccess}
          />
        </div>
      )}

<div className="bg-teal-700 !shadow-lg w-32 mt-4 md:mt-4 z-10 text-white">
        <button onClick={handleConnectBank}>Connect your bank </button>
      </div>

      <div className="flex">
      <h1>Saldo Atual:</h1>
      <p>{balance} EUR</p>
    </div>
  
    </Layout>
  );
};

export default Banking;
