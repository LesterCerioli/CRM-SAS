"use client";
import React from "react";
import * as S from "./styles";
import Cookies from "@/components/home/cookies/cookies/cookies";
import { Banner } from "@/components/home/cookies/homeBanner/homeBanner";
import Image from 'next/image';

const Home: React.FC = () => {
  return (
    <S.Container>
      <Banner />
      
      
      <Image
        src="/assets/imagesHome/mediaca;app2.png"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
      />
      
      <S.Cokkies>
        <Cookies />
      </S.Cokkies>
    </S.Container>
  );
};

export default Home;
