"use client";

import React from "react";
import * as S from "./styles";
import { LaborHeader } from "@/components/labor/laborHeader/laborHeader";




const Labor: React.FC = () => {
    return (
        <S.Container>
            <LaborHeader />
            <h1>Laboratory</h1>
            

        </S.Container>
    );
};

export default Labor;
