"use client";

import React from "react";
import * as S from "./styles";
import CreateMedicalPrescription from "@/components/createMedicalPrescription/createMedicalPrescription";


const MedicalPrescriptionForm: React.FC = () => {
    return (
        <S.Container>
           <CreateMedicalPrescription/>
        </S.Container>
    );
};

export default MedicalPrescriptionForm;
