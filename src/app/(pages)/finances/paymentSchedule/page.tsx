"use client";

import FinancesHeader from "@/components/finances/financesHeader/financesHeader";
import React from "react";
import * as S from "./styles";
import CreatePaymentSchedule from "@/components/finances/createPaymentSchedule/createPaymentSchedule";

const PaymentSchedule: React.FC = () => {
    return (
        <S.Container>
             <FinancesHeader />
             <CreatePaymentSchedule />
        </S.Container>
    );
}

export default PaymentSchedule;
