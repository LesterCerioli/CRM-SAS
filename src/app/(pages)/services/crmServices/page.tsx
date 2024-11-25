"use client";
import * as S from "./styles";
import React from "react";
import CRMServices from "@/components/crmServices/crmServices";

export default function CRMServicesComponent() {
    return (
        <S.Container>
            <CRMServices
                title="Portal CRM / ERP"
                subtitle="Com o CRM, ou Gerenciamento de Relacionamento com o Cliente, você pode construir conexões mais fortes com seus clientes. Ele rastreia todas as interações e ajuda a personalizar seu atendimento, criando relacionamentos duradouros e impulsionando suas vendas."
                subtitle2="ERP (Enterprise Resource Planning):
                O ERP, ou Planejamento de Recursos Empresariais, é como a espinha dorsal de uma empresa inteligente. Ele ajuda a unificar todas as operações internas, desde finanças até gestão de estoque, proporcionando uma visão completa das operações e tornando a tomada de decisões mais informada."
                card1Text="Gestão de Relacionamento com o Cliente: O CRM é projetado para rastrear e gerenciar todas as interações com os clientes. Ele armazena informações detalhadas sobre os clientes, incluindo histórico de compras e preferências, permitindo um atendimento personalizado."
                card2Text="Automatização de Marketing e Vendas: O CRM automatiza marketing, incluindo envio de e-mails, segmentação de clientes e previsão de oportunidades com base em dados históricos. Isso impulsiona a eficácia."
                card3Text="Integração de Processos: O ERP integra uma ampla gama de processos de negócios, como contabilidade, gestão de estoque, recursos humanos e produção, em um único sistema. Isso permite uma visão holística das operações e a eliminação de silos de informações."
                card4Text="Automatização de Tarefas: O ERP automatiza tarefas repetitivas e fluxos de trabalho, reduzindo erros humanos e aumentando a eficiência operacional. Isso resulta em economia de tempo e recursos."
            />
        </S.Container>
    );
}