'use client';
import React from 'react';
import * as S from "./styles";

export default function TravelServices() {
  return (
    <S.Container >
       
       <S.Mission>
         <S.Title> 
          Portal de viagens
         </S.Title>
        
        <S.Subtitle>
         Na indústria de viagens, a presença online é o passaporte para o sucesso. Nossa equipe   especializada combina criatividade e tecnologia para criar portais que transformam sonhos em roteiros concretos.
        </S.Subtitle>        
        
      </S.Mission>
      
      <S.Imag>
        <S.Img src='/assets/imagesTravelServices/travelServices_hero.svg'></S.Img>
      </S.Imag>
 
      <S.Resources>
        <S.Itens>
          
          <S.Card>            
           Design e desenvolvimento de site e app Mobile
          </S.Card>

          <S.Card >  
           Integração de Sistemas de Reservas Online    
          </S.Card>
        
          <S.Card>
           Blog de Destinos e Dicas de Viagem 
          </S.Card>

          <S.Card>
           Serviços de Planejamento de Viagem Personalizado   
          </S.Card>

          <S.Card>
           Notificações de Ofertas e Promoções por E-mail
          </S.Card>

          <S.Card>
           Integração de Avaliações e Comentários de Clientes
          </S.Card>
        

        </S.Itens>
      </S.Resources>    
    </S.Container>
  )
}