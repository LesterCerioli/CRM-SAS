import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #4f98a0;
  width: 100%;
  min-height: 100vh;
  padding: 4rem 2rem;
  box-sizing: border-box;

  h1 {
    color: #ffffff;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 1200px; /* Largura máxima do formulário */
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap; /* Permite que os campos quebrem em linhas */
  gap: 1.5rem; /* Espaçamento entre os campos */
  justify-content: space-between; /* Alinha os campos uniformemente */

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1rem;
  }
`;

export const FieldGroup = styled.div`
  flex: 1 1 calc(50% - 1rem); /* Cada campo ocupa 50% do espaço horizontal */
  display: flex;
  flex-direction: column;

  label {
    font-weight: 600;
    color: #333;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
    box-sizing: border-box;
  }

  textarea {
    resize: vertical;
    height: 80px; /* Altura padrão para textareas */
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
    border-color: #4f98a0;
    box-shadow: 0 0 0 3px rgba(79, 152, 160, 0.2);
  }

  @media (max-width: 768px) {
    flex: 1 1 100%; /* Ocupa toda a largura em telas menores */
  }
`;

export const Button = styled.button`
  flex: 1 1 100%; /* Botão ocupa toda a largura */
  padding: 12px;
  background: #4f98a0;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    background-color: #3e7a84;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const SummaryContainer = styled.div`
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  width: 100%;
  max-width: 800px;

  h2 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 0.75rem;

    strong {
      color: #333;
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;