"use client"

import React from 'react';
import * as S from './styles';
import CrmImage from "@/assets/imagesHome/crm2.svg"; 

const ImageHome: React.FC = () => {
  return (
    <S.Container>
      <S.Image 
        src={CrmImage.src}
        alt="Imagem Crm App" 
        className="img" 
      />
    </S.Container>
  );
};

export default ImageHome;
