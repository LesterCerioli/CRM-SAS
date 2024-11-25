import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start; 
  align-items: center;
  height: 100vh;
  background-color: #1E3A5F;
  color: #FFFFFF; 
  padding-left: 2rem; 
`;

export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 1rem;
  width: 100%;
  max-width: 900px;
  padding: 2rem;
  background-color: #2A4B7C; 
  color: #FFFFFF; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .form-field {
    display: flex;
    align-items: center;
    gap: 0.5rem; 
  }

  label {
    font-weight: bold;
    color: #FFFFFF; 
    width: 100px; 
  }

  input, select, .datepicker-input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #FFFFFF; 
    color: #000000; 
  }

  button {
    grid-column: span 3;
    padding: 0.75rem;
    background-color: #4CAF50;
    color: #FFFFFF;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #45A049;
    }
  }
`;