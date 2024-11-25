'use client';
import React from 'react';
import * as S from "./styles";

export default function DevelopmentWeb() {
  return (
    <S.Container >
       
       <S.Mission>
         <S.Title> 
          Desenvolvimento Web
         </S.Title>
        
        <S.Subtitle>
          Desenvolvimento de Sites Profissionais para o Sucesso Online, onde  transformamos ideias em presença online notável. Somos uma equipe de especialistas dedicados a criar soluções digitais que impressionam e geram resultados. Combinando design atraente e funcionalidades avançadas, oferecemos uma variedade de serviços personalizados para atender às suas necessidades.
        </S.Subtitle>        
        
      </S.Mission>
      
      <S.Imag>
        <S.Img src='/assets/imagesDevWeb/services_hero.svg'></S.Img>
      </S.Imag>
 
      <S.Resources>
        <S.Itens>
          
          <S.Card>            
            Sites modernos, atraentes, otimizados para funcionar perfeitamente em todos os dispositivos, garantindo a melhor experiência do usuário.
          </S.Card>

          <S.Card >  
          Transforme sua ideia de negócio em uma loja online de sucesso. Oferecemos soluções de comércio eletrônico personalizadas para impulsionar suas vendas online.        
          </S.Card>
        
          <S.Card>
            Garantimos que seu site seja rápido e eficiente, melhorando sua classificação nos mecanismos de busca e a satisfação do cliente. 
          </S.Card>

          <S.Card>
            Simplificamos a gestão do seu site com a integração de sistemas de gerenciamento de conteúdo (CMS) robustos, permitindo que você atualize facilmente seu conteúdo.        
          </S.Card>

        </S.Itens>
      </S.Resources>    
    </S.Container>
  )
}
