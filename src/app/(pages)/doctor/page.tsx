"use client";
import React from "react";
import * as S from "./styles";
import CreateMedicalRegistration from "@/components/createMedicalRegistration/createMedicalRegistration";

const Doctor: React.FC = () => {
    return (
        <S.Container>
            <CreateMedicalRegistration/>
        </S.Container>
    )

}
export default Doctor;