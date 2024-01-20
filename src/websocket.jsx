// WebSocketClient.js
import WebSocket from 'ws';


const WebSocketClient = new WebSocket.client();

const url = 'wss://ws.3commas.io/websocket';

const users = [
  {
    api_key: '27e0d23519874ee59037e59b70e0ce0bd3799ea54fb4438a94c0d7b57214c09e',
    signature: '7c77d1074961d2dd7ad51deb45e866f19fc9abc1645e60008ffdc11714d8857a',
  },
];

const identifier = {
  channel: 'SmartTradesChannel',
  users,
};

const subscribeMessage = {
  identifier: JSON.stringify(identifier),
  command: 'subscribe',
};

WebSocketClient.on('connect', (connection) => {
  console.log('WebSocket Client Connected');

  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      const data = JSON.parse(message.utf8Data);
      console.log('Received Message:', data);

      // Aqui você pode processar os dados recebidos dos smart trades
    }
  });

  connection.sendUTF(JSON.stringify(subscribeMessage));
});

WebSocketClient.connect(url);
