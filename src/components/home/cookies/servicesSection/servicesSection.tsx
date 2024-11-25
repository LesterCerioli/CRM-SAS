"use client"
import Image from "next/image";
import * as S from "./styles";
import React from "react"
import { Slider } from "@/components/shared/slider/slider";
import { homePageSlider } from "@/components/shared/slider/helper/imageConstants"

  export function ServicesSection() {
    
    return (
        <S.Container>
            <S.TitleContainer>
                <S.Title>Serviços</S.Title>
                <S.Subtitle>Visite nossa página e explore a variedade de serviços que oferecemos para atender às suas necessidades.</S.Subtitle>
            </S.TitleContainer>

            <Slider data={homePageSlider} />

            <S.ButtonContainer>
                <S.Button>
                    <S.ButtonText href="services">Saiba mais</S.ButtonText>
                </S.Button>
            </S.ButtonContainer>
        </S.Container>
    );
  }

  export default ServicesSection