"use client";
import { useState, useEffect } from "react";
import * as S from "./styles";

export function Cookies() {
  const [closeModal, setCloseModal] = useState<boolean>(false);

  useEffect(() => {
    // Check in localStorage if the user has already accepted cookies
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (cookiesAccepted === "true") {
      setCloseModal(true);
    }
  }, []);

  const handleAccept = () => {
    setCloseModal(true);
    localStorage.setItem("cookiesAccepted", "true"); // Armazena a aceitação no localStorage
  };

  if (!closeModal) {
    return (
      <S.Container>
        <div>
          <h3>Esse website utiliza cookies.</h3>
          <p>
            Usamos cookies para analisar o tráfego do site e otimizar sua
            experiência no site. Ao aceitar nosso uso de cookies, seus dados
            serão agregados aos dados de todos os outros usuários.
          </p>
          <button onClick={handleAccept}>Aceitar</button>
        </div>
      </S.Container>
    );
  }

  return null; // Não renderiza nada se o modal estiver fechado
}

export default Cookies;
