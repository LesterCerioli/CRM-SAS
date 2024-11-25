"use client";
import * as React from "react";
import * as S from "./styles";
import Image from 'next/image';
import EscritorioImage from "@/assets/imagesAboutUs/aboutUs.png";
import LogoImage from "@/assets/imagesAboutUs/aboutUsLogo.png";

export default function AboutUs() {
  return (
    <S.Container>
      <S.Title>
        <h1>Sobre nós</h1>
        <div className="hline"></div>
      </S.Title>

      <div className="frist-second">
        <S.Section>
          <Image src={EscritorioImage.src} alt="Time Lucas(imagem ilustrativa)" width={600} height={250} className="img"/>
          <S.SectionContent>
            <p className="text-primary">
            Lucas Tecnologia Serviços. é uma empresa de TI em rápido crescimento que fornece soluções de TI holísticas para empresas em todas as regiões. Oferecemos experiência em TI no desenvolvimento de software, site e aplicativo (iOS e Android); Design de UI/UX; e marketing digital. Estamos situados em cerca de 12 postos de atendimento, atendendo empresas de diversos setores. Até agora, temos incursionado nos setores de saúde, serviços de alimentação, viagens e turismo, logística e transporte, comércio eletrônico, bancos, tecnologia, manufatura e serviços de educação habilitados para TI. Atualmente, temos uma equipe de profissionais de TI altamente qualificados que trabalham 24 horas por dia para garantir que a Techasoft permaneça fiel às suas ofertas e compromissos. Nossa equipe de especialistas experientes inclui desenvolvedores de software, desenvolvedores web, designers e especialistas em marketing digital.
            </p>
          </S.SectionContent>
        </S.Section>
      </div>
      
      <S.SecondComponent>
      <div className="second-component">
        <S.SecondTitle>
          <h1>O que nos torna diferentes? / Por que nós?</h1>
          <div className="htowline"></div>
        </S.SecondTitle>
        <S.SecondElement>
          <S.TextElement>
            <p>Nós, da Lucas Tecnologia Services, acreditamos em trabalhar em parceria com nossos clientes. Cada um de nossos clientes é igualmente importante para nós e colaboramos para entender suas necessidades e métodos de trabalho exclusivos. Nós interagimos e trabalhamos juntos de forma consistente para criar soluções inteligentes que atendam às demandas de negócios em evolução de nossos clientes. E, assim, fornecer retornos rápidos seguindo esse estilo colaborativo de trabalho. Estamos continuamente fazendo a ponte entre negócios e tecnologia.</p>
            <p>Acreditamos que a comunicação é a chave e nossa equipe de especialistas sempre segue esse princípio. Realizamos uma comunicação constante entre os membros da equipe e os clientes, garantindo a transparência. Isso também nos permite obter maiores insights, bem como a confiança de todos os nossos clientes. Todos os nossos projetos são entregues nos prazos estabelecidos e nossos serviços estão dentro de uma faixa bastante acessível.</p> 
            <p>Nosso processo de desenvolvimento é realizado de forma transparente e segue uma abordagem sistemática - Começamos com a assinatura de um Non-Disclosure Agreement (NDA) com o cliente. Post qual processo e documentação é feito. As responsabilidades são compartilhadas entre os membros da equipe para garantir uma progressão oportuna e suave do projeto. É feito o agendamento adequado de todo o processo e também realizamos relatórios frequentes para manter todos (incluindo os clientes) informados. Temos uma abordagem completamente ágil e obtemos feedback e resultados contínuos do cliente e, consequentemente, mudamos e progredimos com nosso desenvolvimento. É por isso que podemos assumir projetos complexos que outros desenvolvedores podem perceber como difíceis, tornando-nos um dos melhores desenvolvedores de software do mercado.</p>
          </S.TextElement>
          <Image src={LogoImage.src} alt="Descrição da segunda imagem" width={450} height={550} className="img"/>
        </S.SecondElement>
      </div>
      </S.SecondComponent>
    </S.Container>
  );
}
