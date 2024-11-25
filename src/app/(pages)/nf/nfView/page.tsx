"use client";

import FinancesHeader from "@/components/finances/financesHeader/financesHeader";
import React from "react";
import * as S from "./styles";
import CreateNfView from "@/components/nf/nfView/createNfView/createNfView";


const NfView: React.FC = () => {
    return (

        <S.Container>
            <FinancesHeader />
            < CreateNfView />
        </S.Container>
    )

    
}

export default NfView;