"use client";

import FinancesHeader from "@/components/finances/financesHeader/financesHeader";
import React from "react";
import * as S from "./styles";
import CreateInvoices from "@/components/finances/createInvoices/createInvoices";


const Invoices: React.FC = () => {
    return (

        <S.Container>
             <FinancesHeader />
             <CreateInvoices />
        </S.Container>
    )

    
}

export default Invoices;