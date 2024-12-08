"use client";
import React from "react";
import * as S from "./styles";
import ImageHome from "@/components/home/cookies/imageHome/imageHome";

const Labor: React.FC = () => {
    return (
        <S.Container>
            <h1>Laboratório</h1>
            <ImageHome/>
            <h1>marcação de Consultas</h1>
        </S.Container>
    )

}
export default Labor;