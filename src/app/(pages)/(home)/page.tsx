"use client";
import React from "react";
import * as S from "./styles";
import Cookies from "@/components/home/cookies/cookies/cookies";
import ImageHome from "@/components/home/cookies/imageHome/imageHome";



const Home: React.FC = () => {
  return (
    <S.Container>
      <ImageHome/>
      
      <S.Cokkies>
        <Cookies />
      </S.Cokkies>
    </S.Container>
  );
};

export default Home;
