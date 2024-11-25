"use client";
import * as S from "./styles";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";

export function AdminHeader() {
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
            <S.Link href="/admin/accounting">Contabilidade</S.Link>
            <S.Link href="/admin/administrative">Administrativo</S.Link>
            <S.Link href="/admin/commercial">Comercial</S.Link>
            <S.Link href="/admin/fiscal">Fiscal</S.Link>
            <S.Link href="/admin/it">TI</S.Link>
            <S.Link href="/admin/pd-department">DP</S.Link>
            <S.Link href="/admin/hr">RH</S.Link>
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
}
