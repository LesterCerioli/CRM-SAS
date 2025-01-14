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
`;

export const Form = styled.form`
  width: 100%;
  max-width: 1200px; 
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap; 
  gap: 1.5rem; 
  justify-content: space-between; 
`;

export const FieldGroup = styled.div`
  flex: 1 1 calc(50% - 1rem); 
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
    height: 80px;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
    border-color: #4f98a0;
    box-shadow: 0 0 0 3px rgba(79, 152, 160, 0.2);
  }
`;

export const Button = styled.button`
  flex: 1 1 100%; 
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
`;