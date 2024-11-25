'use client';
import React from 'react';
import * as S from "./styles";

export default function DevelopmentWeb() {
  return (
    <S.Container >
       
       <S.Mission>
         <S.Title> 
         Desenvolvimento Mobile
         </S.Title>
        
        <S.Subtitle>
        Na era da mobilidade, trazemos sua ideia para a palma da mão. Nossa equipe especializada em desenvolvimento mobile cria aplicativos sob medida que redefinem a experiência do usuário.
        </S.Subtitle>        
        
      </S.Mission>
      
      <S.Imag>
        <S.Img src='/assets/imagesMobileAppDev/mobileDevelopment_hero.svg'></S.Img>
      </S.Imag>
 
      <S.Resources>
        <S.Itens>
          
          <S.Card>            
          Design e Desenvolvimento de Apps Intuitivos para iOS, Android e Windows Phone
          </S.Card>

          <S.Card >  
          Integração com Recursos de Nuvem e APIs       
          </S.Card>
        
          <S.Card>
          Otimização de Desempenho e Velocidade
          </S.Card>

          <S.Card>
          Testes Rigorosos para Garantir Qualidade   
          </S.Card>

        </S.Itens>
      </S.Resources>    
    </S.Container>
  )
}