"use client";
import React from "react";
import styled from "styled-components";


const Button = styled.button`
  text-transform: uppercase;
  padding: 12px 25px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  background-color: #4caf50; /* Verde */
  color: #ffffff;
  transition: all ease-in-out 0.2s;

  &:hover {
    transform: scale(1.05);
    background-color: #45a049; /* Verde mais escuro no hover */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.4);
  }
`;

const CreateNewAppointmentButton: React.FC = () => {
  const handleClick = () => {
    //alert("Novo Atendimento criado!");
    // Aqui você pode adicionar lógica para criar o atendimento
  };

  return <Button onClick={handleClick}>Criar Novo Atendimento</Button>;
};

export default CreateNewAppointmentButton;
