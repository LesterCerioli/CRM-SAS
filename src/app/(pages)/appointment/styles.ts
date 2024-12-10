import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eaf4f4; 
  min-height: 100vh;
  padding: 2rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    color: #2c6e49; 
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #5a5a5a;
  }
`;


export const Button = styled.button`
  background-color: #2c6e49; 
  color: #ffffff;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  margin: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #22613a; 
  }
`;


export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem; 
  margin-top: 2rem;

  button {
    width: 250px;
    text-align: center;
    font-size: 1.1rem;
    font-weight: 500;
  }
`;


export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 1rem 2rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05); /* Efeito de aumento ao passar o mouse */
  }

  h2 {
    font-size: 1.25rem;
    color: #2c6e49;
  }
`;

// Input de busca
export const SearchInput = styled.input`
  width: 300px;
  padding: 0.75rem;
  border: 2px solid #cccccc;
  border-radius: 5px;
  font-size: 1rem;
  margin-bottom: 2rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #2c6e49; /* Verde escuro ao focar */
    outline: none;
  }
`;

// Estilo do rodapé ou mensagem adicional na página
export const Footer = styled.div`
  margin-top: auto;
  font-size: 0.9rem;
  color: #5a5a5a;
  text-align: center;

  a {
    color: #2c6e49;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
export const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
  background-color: #4f98a0;
  width: 100%;
  height: auto;
  padding: 4rem;
  
  h1{
    color: #fff;
    font-size: 2rem;
    margin-bottom: -1rem;
  }

  @media (max-width: 768px) {
    h1{
      font-size: 2rem;
      padding: 1rem;
      white-space: nowrap;

    }
  }

  
  
  button {
    text-transform: uppercase;
    padding: 12px 25px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-weight: 700;
    letter-spacing: 0.071em;
    font-size: 14px;
    transition: all ease-in-out 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }
`
