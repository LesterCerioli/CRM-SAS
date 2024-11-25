import styled from "styled-components";

export const Container = styled.div`
 display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    padding: 22rem;
    background-color: #1E3A5F;
    gap: 1rem;

    @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5rem;
    }
`;
