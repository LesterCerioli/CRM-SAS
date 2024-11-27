"use client"

import React from 'react';
import * as S from './styles';
import MedicalImage from "@/assets/imagesHome/medicalapp3.svg"; 

const ImageHome: React.FC = () => {
  return (
    <S.Container>
      <S.Image 
        src={MedicalImage.src}
        alt="Imagem Medical App" 
        className="img" 
      />
    </S.Container>
  );
};

export default ImageHome;
