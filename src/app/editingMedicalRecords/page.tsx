"use client";
import React from "react";
import * as S from "./styles";
import CreateEditingRecords from "@/components/createEditingRecords/createEditingRecords";



const EditingMedicalRecords: React.FC = () => {
  return (
    <S.Container>
      <CreateEditingRecords/>
    </S.Container>
  );
};

export default EditingMedicalRecords;
