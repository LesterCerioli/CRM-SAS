import styled, { createGlobalStyle } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #282c34; /* Cor de fundo */
  padding: 2rem;
`;

export const FormContainer = styled.div`
  background-color: #1c1f26;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;

  h2 {
    color: #ffffff; /* Cor do título */
    font-size: 24px;
  }
`;

export const FieldRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;

  label {
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    color: #000;

    &:focus {
      border-color: #4a90e2;
      outline: none;
    }
  }
`;

export const SubmitButton = styled.button`
  background-color: #4a90e2;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #357ab8;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const DatePickerStyles = createGlobalStyle`
  .react-datepicker {
    font-family: Arial, sans-serif;
    border: none;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }

  .react-datepicker__header {
    background-color: #4a90e2;
    color: #fff;
  }

  .react-datepicker__day--selected {
    background-color: #4a90e2;
    color: #fff;
  }
`;
