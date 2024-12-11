import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #4f98a0;
  width: 100%;
  min-height: 5vh;
  padding: 4rem 2rem;
  box-sizing: border-box;

  h1 {
    color: #ffffff;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    font-weight: bold;
  }

  form {
    width: 100%;
    max-width: 600px;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1.5rem; /* Espaçamento consistente entre os grupos de campos */
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem; /* Espaçamento entre label e campo */
  }

  .name-field {
    margin-bottom: 2rem; /* Espaçamento adicional após "Nome do Paciente" */
  }

  label {
    font-weight: 600;
    color: #333;
    font-size: 1rem;
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

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
    border-color: #4f98a0;
    box-shadow: 0 0 0 3px rgba(79, 152, 160, 0.2);
  }

  textarea {
    resize: vertical;
    height: 80px; /* Tamanho padrão para textareas */
  }

  button {
    text-transform: uppercase;
    padding: 12px 25px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 1rem;
    background-color: #4f98a0;
    color: #ffffff;
    transition: all ease-in-out 0.2s;
    width: 100%; /* Botão ocupa toda a largura do formulário */

    &:hover {
      transform: scale(1.05);
      background-color: #3e7a84;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    form {
      padding: 1.5rem;
      gap: 1rem;
    }

    button {
      font-size: 0.9rem;
    }
  }
`;
