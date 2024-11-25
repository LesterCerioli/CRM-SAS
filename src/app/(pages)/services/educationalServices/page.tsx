"use client";
import * as S from "./styles";
import React from "react";
import EducationalServicesComponent from "@/components/educationalServices/educationalServicesComponent";

export default function EducationalServices() {
    return (
        <S.Container>
            <EducationalServicesComponent
                title="Portais Educacionais"
                subtitle="Na era da aprendizagem digital, nossa equipe especializada desenvolve portais educacionais sob medida que capacitam educadores e alunos. Explore nossos serviços e junte-se à revolução educacional online."
                card1Text="Design de uma interface Educacional Intuitiva: aprendizado envolvente"
                card2Text="Intergação de recursos didáticos e interativos focando numa aprendizagem diversificada"
                card3Text="Desenvolvimento de LMS personalizado que permite o acompanhamento e avaliação do aluno"
                card4Text="Colaboração entre alunos e professores por meio de chats, FAQs e ligações por vídeo"
            />
        </S.Container>
    );
}
