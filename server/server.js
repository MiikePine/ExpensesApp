// server.js

const express = require('express');
const axios = require('axios');
const config = require('./config'); // Importe as configurações do seu arquivo

const app = express();
const port = 5173; // Defina a porta que desejar

app.get('/auth', (req, res) => {
  // Aqui você deve redirecionar o usuário para a URL de autenticação da TrueLayer
  const authURL = `https://auth.truelayer.com/?response_type=code&client_id=${config.client_id}&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=${config.redirect_uri}&providers=uk-ob-all%20uk-oauth-all%20pt-ob-all`;
  res.redirect(authURL);
});

app.get('/Banking', async (req, res) => {
  // Esta rota lida com o redirecionamento após a autenticação bem-sucedida

  const code = req.query.code; // Obtenha o código de autorização da consulta da URL

  // Faça uma solicitação para trocar o código por um token de acesso
  const tokenURL = 'https://api.truelayer.com/connect/token';
  const data = new URLSearchParams();
  data.append('grant_type', 'authorization_code');
  data.append('client_id', config.client_id);
  data.append('client_secret', config.client_secret);
  data.append('redirect_uri', config.redirect_uri);
  data.append('code', code);

  try {
    const response = await axios.post(tokenURL, data);
    const accessToken = response.data.access_token;

    // Agora você tem o token de acesso, pode usá-lo para fazer solicitações à API TrueLayer

    res.send(`Token de acesso: ${accessToken}`);
  } catch (error) {
    res.status(500).send('Erro na troca de código por access_token');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
