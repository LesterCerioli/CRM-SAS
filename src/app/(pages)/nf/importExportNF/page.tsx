"use client";


import React from "react";
import * as S from "./styles";
import NFHeader from "@/components/nf/nfHeader/nfHeader";
import CreateImportExportNF from "@/components/nf/createImportExportNF/createImportExportNF";


const ImportExportNF: React.FC = () => {
    return (

        <S.Container>
             <NFHeader />
             <CreateImportExportNF />
        </S.Container>
    )

    
}

export default ImportExportNF;