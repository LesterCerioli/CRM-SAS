"use client";
import * as S from "./styles";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";

export function NFHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <S.Container>
      <S.NavBar className="fixed">
        <S.HamburgerMenu onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
        </S.HamburgerMenu>
        <div>
          <Image
            src="/assets/imagesNavbar/LTS_navbar_logo.png"
            alt="Lucas Tecnologia Services Logo"
            width={76}
            height={43}
          />
        </div>
        <S.MajorLinksContainer>
          <S.LinksContainer className={isMenuOpen ? "show-links" : ""}>
            <S.Link href="/">Home</S.Link>
            <S.Link href="/nf/generation">Geração de NF</S.Link>
            <S.Link href="/nf/importExportNF">Import/Export de NF</S.Link>
            {isMenuOpen && (
              <S.CloseButton onClick={toggleMenu}>
                <CgClose />
              </S.CloseButton>
            )}
          </S.LinksContainer>
        </S.MajorLinksContainer>
      </S.NavBar>
    </S.Container>
  );
};

export default NFHeader;


