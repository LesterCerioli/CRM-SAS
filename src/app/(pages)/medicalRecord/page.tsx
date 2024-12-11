"use client";
import React from "react";
import * as S from "./styles";
import Cookies from "@/components/home/cookies/cookies/cookies";
import CreateMedicalRecordForm from "@/components/medicalRecords/createmedicalRecordForm/createMedicalRecordForm";


const MedicalRecord: React.FC = () => {
    return (
      <S.Container>
        <CreateMedicalRecordForm />
        
        
        
      </S.Container>
    );
  };
  
  export default MedicalRecord;
  