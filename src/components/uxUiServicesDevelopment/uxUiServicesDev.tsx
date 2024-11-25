'use client';
import React from 'react';
import * as S from "./styles";

export default function UxUiServices() {
  return (
    <S.Container >
       
       <S.Mission>
         <S.Title> 
          UI     
         </S.Title>
        
        <S.Subtitle>
          Na interseção entre estética e funcionalidade, nossa equipe de especialistas em UI/UX cria interfaces atraentes e experiências envolventes. Do primeiro toque ao último clique, destacamos sua marca e garantimos a satisfação do usuário.
          
          
        </S.Subtitle>        
        
      </S.Mission>
      
      <S.Imag>
        <S.Img src='/assets/imagesUxUi/uiHero.svg'></S.Img>
      </S.Imag>
 
      <S.Resources>
        <S.Itens>
          
          <S.Card>            
          Interfaces bonitas e fáceis de navegar           
          </S.Card>
          <S.Card >  
          Identidade visual coerente com sua marca
          </S.Card>
          <S.Card>
           Design Responsivo e adaptável, Web, tablet ou mobile        
          </S.Card>
          <S.Card>
           Objetividade sem comprometer o conteúdo         
          </S.Card>

        </S.Itens>
      </S.Resources> 

      <S.Mission>
         <S.Title> 
          UX     
         </S.Title>
        
        <S.Subtitle>

            Nossa equipe UX trabalha na criação e inovação de funcionalidades que tornam a experiência do usuário satisfatória e agradável, oferecendo soluções atraentes no visual e eficientes no uso.
       
        </S.Subtitle>        
        
      </S.Mission>
      
      <S.Imag>
        <S.Img src='/assets/imagesUxUi/uxHero.svg'></S.Img>
      </S.Imag>
 
      <S.Resources>
        <S.Itens>
          
          <S.Card>            
           Pesquisa e Análise de Usuários, compreendemos o usuário    
          </S.Card>

          <S.Card >  
           Fluxos de usuário eficientes e lógicos, garantindo assim a sua satisfação        
          </S.Card>
        
          <S.Card>
           Usabilidade: eliminamos obstáculos, para atingir o maior nível de satisfação 
          </S.Card>

          <S.Card>
           Protótipos interativos que permitem testar e refinar ideias         
          </S.Card>

        </S.Itens>
      </S.Resources>    
    </S.Container>
  )
}