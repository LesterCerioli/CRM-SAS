"use client";
import React from "react";
import * as S from "./styles";
import Cookies from "@/components/home/cookies/cookies/cookies";
import CreateMedicalRecordForm from "@/components/medicalRecords/createmedicalRecordForm/createMedicalRecordForm";
import MedicalRecordFilter from "@/components/medicalRecords/medicalRecordFilter/medicalRecordFilter";


const MedicalRecord: React.FC = () => {
    return (
      <S.Container>
        <MedicalRecordFilter />
        <CreateMedicalRecordForm />
        
        
        
      </S.Container>
    );
  };
  
  export default MedicalRecord;
  