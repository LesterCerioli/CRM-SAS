"use client";
import React from "react";
import styled from "styled-components";
import { Button } from "./styles";



const CreateNewAppointmentButton: React.FC = () => {
  const handleClick = () => {
    //alert("Novo Atendimento criado!");
    // Aqui você pode adicionar lógica para criar o atendimento
  };

  return <Button onClick={handleClick}>Criar Novo Atendimento</Button>;
};

export default CreateNewAppointmentButton;
