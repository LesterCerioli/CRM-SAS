"use client";
import React from "react";
import * as S from "./styles";
import CreateViewingRecords from "@/components/viewingMedicalRecords/createViewingRecords";


const ViewingMedicalRecords: React.FC = () => {
  return (
   <S.Container>
    <CreateViewingRecords/>
   </S.Container>
  );
};

export default ViewingMedicalRecords;