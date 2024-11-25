"use client";
import * as S from "./styles";
import React from "react";
import RealEstatePortalServicesComponent from "@/components/realEstatePortalServices/realEstatePortalServices";

export default function RealEstatePortalServices() {
    return (
        <S.Container>
            <RealEstatePortalServicesComponent
                title="Portal Imobiliário"
                subtitle="Na dinâmica do mercado imobiliário, a presença online é a chave para o sucesso. Nossa equipe especializada combina inovação e tecnologia para criar portais imobiliários que conectam propriedades a sonhos realizados."
                card1Text="Design e Desenvolvimento de Portais Intuitivos"
                card2Text="Intergação de recursos didáticos e interativos focando numa aprendizagem diversificada"
                card3Text="Estimule suas vendas com nossa expertise em marketing digital"
                card4Text="Atendimento personalizado a cada perfil de comprador"
            />
        </S.Container>
    );
}
