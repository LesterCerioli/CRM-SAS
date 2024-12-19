import styled from "styled-components"
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export const Container = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 100%;
    height: 130px;
    background: #382EC4;
`

export const SpanContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 40%;
`

export const Brand = styled.span`
    color: #FFF;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`

export const Copyright = styled.span`
    color: #FFF;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const SocialsContainer = styled.div`
    display: flex;
    height: 40%;
    width: 80px;
    justify-content: space-around;
    align-items: center;
`

export const Socials = styled.a`
 text-decoration: none;
`
export const LinkedinIcon = styled(FaLinkedin)`
    font-size: 24px;
    color: white;
`;

export const GithubIcon = styled(FaGithubSquare)`
    font-size: 24px;
    color: white;
`;