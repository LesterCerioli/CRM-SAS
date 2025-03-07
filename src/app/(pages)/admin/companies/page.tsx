"use client";
import CreateCompanies from "@/components/companies/create-companies/create-companies";

import React from "react";
import * as S from "./styles";


const Companies: React.FC = () => {
    return (
        <S.Container>
            <CreateCompanies />
        </S.Container>

    )

};
export default Companies;
