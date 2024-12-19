
import styled from 'styled-components';
export const Container = styled.div`
  width: 100%;
height: auto;
display: flex;
align-items: center;
justify-content: center;

`;
export const Image = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: contain; 
  border-radius: 8px; 
  padding-top: 3rem;
  @media (max-width: 768px) {
    padding-top: 3rem;
    padding-bottom: 1rem;
  }
`;


