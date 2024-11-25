"use client";
import { useState } from "react";
import * as S from "./styles";

export function Cookies() {
  const [closeModal, setCloseModal] = useState(false);

  if (!closeModal) {
    return (
      <S.Container>
        <div>
          <h3> Esse website utiliza cookies. </h3>
          <p>
            Usamos cookies para analisar o tráfego do site e otimizar sua
            experiência no site. Ao aceitar nosso uso de cookies, seus dados
            serão agregados aos dados de todos os outros usuários.
          </p>
          <button onClick={() => setCloseModal(!closeModal)}>Aceitar</button>
        </div>
      </S.Container>
    );
  }
}

export default Cookies;
