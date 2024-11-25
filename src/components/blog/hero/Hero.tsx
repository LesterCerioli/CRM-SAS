import React from "react";
import pcVintage from "@/assets/imagesBlog/veio 1.svg";
import Image from "next/image";
import * as S from "./styles";
import Posts from "../postsPage/Posts";

import BlogPostContainer from "../blogPostContainer/blogPostContainer";

function Hero() {
  return (
    <S.heroContainer>
      <div>
        <h1> Bem vindo!</h1>

        <S.contentContainer>
          <div>
            <div>
              <h3>
                Junte-se a nós enquanto exploramos o coração da tecnologia da
                informação e desbravamos caminhos para o sucesso na criação de
                infraestruturas robustas e aplicações confiáveis. Estamos
                empolgados para compartilhar nosso conhecimento e ajudá-lo a se
                destacar no mundo do DevOps e Backend.
              </h3>
            </div>
            <S.imageContainer>
              <Image
                src={pcVintage}
                alt="pc vintage"
                width={454}
                className="img"
              />
            </S.imageContainer>
          </div>
        </S.contentContainer>
      </div>
      <BlogPostContainer />
    </S.heroContainer>
  );
}

export default Hero;
