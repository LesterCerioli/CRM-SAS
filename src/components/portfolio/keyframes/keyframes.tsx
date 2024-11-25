import React from 'react'
import * as S from './styles'

export const ContainerAnimation = () => {
    return (
        <S.AnimatedContainer>
            <div>
          <S.Title>Nosso Portfólio</S.Title>
          <S.SpanDiv>
            <S.Span />
          </S.SpanDiv>
        </div>
          <S.Section>
            <S.Subtitle>Mercado Financeiro</S.Subtitle>
            <S.Subtitle>Bolsa de Valores de Nova Iorque</S.Subtitle>
            <S.Image src='assets/imagesPortfolio/nyse.png' alt="NYSE logo" width={300} height={200}/>
          </S.Section>
        </S.AnimatedContainer>

    ) 
};

export default ContainerAnimation;