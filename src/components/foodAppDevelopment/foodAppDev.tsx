'use client';
import React from 'react';
import * as S from "./styles";

export default function FoodAppDev() {
  return (
    <S.Container >
       
       <S.Mission>
         <S.Title> 
         O portal do seu Restaurante
         </S.Title>
        
        <S.Subtitle>
          No coração da indústria culinária, sabemos que a presença online é essencial. Nossos especialistas dedicados combinam criatividade e tecnologia para criar portais personalizados que satisfazem os apetites digitais dos restaurantes.
        </S.Subtitle>        
        
      </S.Mission>
      
      <S.Imag>
        <S.Img src='/assets/imagesFoodAppDev/foodServices_hero.svg'></S.Img>
      </S.Imag>
      
 
      <S.Resources>
        <S.Itens>
          
          <S.Card>            
          Integração:  Menus Online,  Pedidos, reservas e redes sociais
          </S.Card>

          <S.Card >  
          Design e desenvolvimento de site e app Mobile       
          </S.Card>
        
          <S.Card>
          Gestão de agendamento de mesas, vendas e estoque 
          </S.Card>

          <S.Card>
          Otimização para motores de busca - SEO  
          </S.Card>

        </S.Itens>
      </S.Resources>    
    </S.Container>
  )
}