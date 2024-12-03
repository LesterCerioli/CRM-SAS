"use client";

import React from "react";
import * as S from "./styles";
import PrescriptionForm from "@/components/prescriptionForm/prescriptionForm";


const PrescriptionPage: React.FC = () => {
  return (
    <S.Container>
      <PrescriptionForm />
    </S.Container>
  );
};

export default PrescriptionPage;
