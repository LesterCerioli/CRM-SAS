import styled, { keyframes } from "styled-components";

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc((-220px - 4rem)* 5));
  }
`;

export const Container = styled.div `
    height: 250px;
    margin: auto;
    position: relative;
    width: 100%;
    display: flex;
    place-items: center;
    overflow: hidden;
`
export const CardsContainer = styled.div`
    display: flex;
    width: calc((220px + 4rem) * 10);
    gap: 4rem;
    animation: ${scroll} 20s linear infinite;
    align-items: center;
    &:hover{
    animation-play-state: paused;
    }
`

export const Card = styled.li`
    border-radius: 6px;
    height: 200px;
    width: 220px;
    display: flex;
    align-items: center;
    perspective: 100px;
    background-image: linear-gradient(to bottom, #051937, #434862, #7c7d90, #b8b7c2, #f6f6f6);

    &::before {
    content: '';
    transition: .5s ease-in-out;
    border-radius: 6px;
    width: 0px;
    height: 0px;
    position: absolute;
    top: -2px;
    right: -2px;
    border-top: 5px solid transparent;
    border-right: 5px solid transparent;
    }

    &::after {
    content: '';
    transition: .5s ease-in-out;
    border-radius: 6px;
    width: 0px;
    height: 0px;
    position: absolute;
    bottom: -2px;
    left: -2px;
    border-bottom: 5px solid transparent;
    border-left: 5px solid transparent;
    }

    &:hover::before {
    width: 100%;
    height: 100%;
    border-top: 5px solid var(--blue-hover);
    border-right: 5px solid var(--blue-hover);
    }

    &:hover::after {
    width: 100%;
    height: 100%;
    border-bottom: 5px solid var(--blue-hover);
    border-left: 5px solid var(--blue-hover);
    }

    &:hover{
        height: 230px;
        width: 230px;
        transition: 0.5s;
    }
    `

    export const StyledImage = styled.img`
        width: 100px;
        border-radius: 50%;
        position: relative;
        left: 28%;
    `
