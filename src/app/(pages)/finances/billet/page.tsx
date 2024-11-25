"use client";

import FinancesHeader from "@/components/finances/financesHeader/financesHeader";
import React from "react";
import * as S from "./styles";
import CreateBillet from "@/components/finances/createBillet/createBillet";


const Billet: React.FC = () => {
    return (

        <S.Container>
              <FinancesHeader />
              < CreateBillet />
        </S.Container>
    )

    
}

export default Billet;