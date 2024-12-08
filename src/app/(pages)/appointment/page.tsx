"use client";
import React from "react";
import * as S from "./styles";
import ImageHome from "@/components/home/cookies/imageHome/imageHome";

const Appointment: React.FC = () => {
    return (
        <S.Container>
            <ImageHome/>
            <h1>marcação de Consultas</h1>
        </S.Container>
    )

}
export default Appointment;