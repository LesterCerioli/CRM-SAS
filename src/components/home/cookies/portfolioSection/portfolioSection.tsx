"use client"
import * as S from "./styles";
import React from "react"

  export function PortfolioSection() {
    
    return (
        <S.Container>
            <S.TitleContainer>
                <S.Title>Portfólio</S.Title>
                <S.Subtitle>Visite nossa página e explore a variedade de serviços que oferecemos para atender às suas necessidades.</S.Subtitle>
            </S.TitleContainer>
            <S.CardsMainContainer>
                <S.CardsContainer>
                    <S.LeftCardsContainer>
                        <S.CardImage1 src="assets/imagesHome/portfolio_card_1.svg"/>
                        <S.CardImage2 src="assets/imagesHome/portfolio_card_2.svg"/>
                    </S.LeftCardsContainer>
                    <S.RightCardsContainer>
                        <S.CardImage3 src="assets/imagesHome/portfolio_card_3.svg"/>
                        <S.CardImage4 src="assets/imagesHome/portfolio_card_4.svg"/>
                    </S.RightCardsContainer>   
                </S.CardsContainer>
            </S.CardsMainContainer>
            <S.ButtonContainer>
                <S.Button>
                    <S.ButtonText href="portfolio">Saiba mais</S.ButtonText>
                </S.Button>
            </S.ButtonContainer>
        </S.Container>
        
    );
}
            