import React, { useEffect } from "react";
import axios from "axios"; // Certifique-se de ter instalado o Axios

const BankingAuth = () => {
  useEffect(() => {
    // Extrair o código de autorização da consulta da URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Se um código de autorização estiver presente na URL
      // Faça uma solicitação para trocar o código por um token de acesso
      axios
        .get(`/Banking?code=${code}`) // Isso fará uma solicitação para o seu servidor local
        .then((response) => {
          const accessToken = response.data.access_token;
          // Agora você tem o token de acesso, você pode usá-lo para acessar a API TrueLayer ou fazer outras ações necessárias.
        })
        .catch((error) => {
          console.error("Erro ao trocar código por access_token:", error);
          // Lide com erros apropriadamente
        });
    } else {
      // Lidar com a ausência do código de autorização, talvez redirecionando o usuário para uma página de erro.
    }
  }, []);

  return (
    <div>
      {/* Você pode adicionar uma mensagem ou componente de carregamento aqui enquanto a troca de código está acontecendo */}
    </div>
  );
};

export default BankingAuth;
