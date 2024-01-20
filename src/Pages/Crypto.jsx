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
import { useDispatch } from "react-redux";
import { MdExpandMore } from "react-icons/md";
import { RiFileAddLine } from "react-icons/ri";
import clsx from "clsx";
import { isRejected } from "@reduxjs/toolkit";
import axios from "axios";



const Crypto = ({ item, handleOverlayClick }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [UserUID, setUserUID] = useState(null);
  const [fetchedUserUID, setFetchedUserUID] = useState(false);
  const [filtered3commaData, setfiltered3commaData] = useState([]);
  const [filteredIncomingData, setFilteredIncomingData] = useState([]);
  const [isSortingByItem, setIsSortingByItem] = useState(false);
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [WebSocketClient, setWebSocketClient] = useState(null);
  const [tradesData, setTradesData] = useState([]);


  const selectedMonth = useSelector((state) => state.month.value);
  const userData = useSelector((state) => state.user);


  const dispatch = useDispatch();

  const handleAddExpense = () => {
    setShowRegister(true);
  };

  const toggleSortByItem = () => {
    setIsSortingByItem(!isSortingByItem);
  };


  const handleRegisterSuccess = (data) => {};

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

// Inicializa o WebSocket
useEffect(() => {
  const ws = new WebSocket('wss://ws.3commas.io/websocket');
  setWebSocketClient(ws);

  // Função para tratar mensagens recebidas
  const handleWebSocketMessage = (message) => {
    if (typeof message.data === 'string') {
      const data = JSON.parse(message.data);
      console.log('Received Message:', data);
      
      // Adicione aqui a lógica para processar as mensagens de trade recebidas
    }
  };

  if (ws) {
    ws.onopen = () => {
      console.log('WebSocket Client Connected');
      subscribeToSmartTrades();
    };

    ws.onmessage = handleWebSocketMessage;
  }

  return () => {
    // Fecha a conexão do WebSocket ao desmontar o componente
    if (ws) {
      ws.close();
    }
  };
}, []);

const subscribeToSmartTrades = () => {
  const users = [
    {
      api_key: '27e0d23519874ee59037e59b70e0ce0bd3799ea54fb4438a94c0d7b57214c09e',
      signature: '7c77d1074961d2dd7ad51deb45e866f19fc9abc1645e60008ffdc11714d8857a',
    }
  ];

  const identifier = {
    channel: 'SmartTradesChannel',
    users,
  };

  const subscribeMessage = {
    identifier,
    command: 'subscribe',
  };

  if (WebSocketClient) {
    WebSocketClient.send(JSON.stringify(subscribeMessage));
  }
};

// Função para obter o histórico de trades
const getSmartTradesHistory = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/v2/smart_trades');

    if (response.status === 204) {
      console.log('No content in response');
      // Adicione lógica adicional, se necessário, para lidar com resposta sem conteúdo
    } else if (response.status === 200 && response.data && Array.isArray(response.data)) {
      const smartTrades = response.data;
      console.log('Smart Trades History:', smartTrades);
      setTradesData(smartTrades);
    } else {
      console.error('Unexpected server response:', response.status, response.data);
    }
  } catch (error) {
    console.error('Error fetching smart trades history:', error);

    // Adicione informações adicionais ao log de erro
    if (error.response) {
      // O servidor retornou um status de erro (por exemplo, 4xx ou 5xx)
      console.error('Server response:', error.response.status, error.response.data);
    } else if (error.request) {
      // A solicitação foi feita, mas não houve resposta do servidor
      console.error('No response from server. Request details:', error.request);
    } else {
      // Ocorreu um erro ao configurar a solicitação
      console.error('Request setup error:', error.message);
    }
  }
};

useEffect(() => {
  // Chama a função para obter o histórico de trades
  getSmartTradesHistory();
}, []);





  return (
    <Layout 
      items={item} 
      showHeader={true} 
      showHeaderSavings={false} 
      showRegister={showRegister}   
      isDivVisible={isDivVisible}
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




      <div className="bg-white !shadow-lg mt-4 md:mt-4 z-10">
        <Card className="!bg-white shadow-lg rounded-none border-none ring-0" >
          <Title className="bg-white !text-gray-600 flex items-center mb-6">
            <span className="text-center flex-grow">Trades</span>
            <button
              className="py-2 px-4 flex items-center text-sm text-bg-white border text-teal-700 font-bold hover:text-teal-700 hover:bg-white hover:border border-teal-700 ml-auto"
              onClick={handleAddExpense}
            >
               <RiFileAddLine size={22}></RiFileAddLine>
            </button>
          </Title>
         
         
        <Table className="max-h-[calc(130vh-880px)] overflow-y-auto">


            <TableHead className="bg-white text-xs md:text-sm justify-between w-full sticky top-0 z-10">
                <TableRow className="bg-white justify-between sticky">
                  <TableHeaderCell>Date</TableHeaderCell>
                  <TableHeaderCell>Token</TableHeaderCell>
                  <TableHeaderCell>Real Invested</TableHeaderCell>
                  <TableHeaderCell>Invested Lev</TableHeaderCell>
                  <TableHeaderCell>% PnL</TableHeaderCell>
                  <TableHeaderCell>$</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
  {tradesData.map((trade, index) => (
    <TableRow key={index}>
      <TableCell>{format(new Date(trade.date), 'yyyy-MM-dd HH:mm:ss')}</TableCell>
      <TableCell>{trade.pair}</TableCell>
      <TableCell>{trade.realInvested}</TableCell>
      <TableCell>{trade.investedLev}</TableCell>
      <TableCell>{trade.pnlPercentage}</TableCell>
      <TableCell>{trade.amount}</TableCell>
    </TableRow>
  ))}
</TableBody>

            </Table>
         
        </Card>
      </div>
    </Layout>
  );
};

export default Crypto;







