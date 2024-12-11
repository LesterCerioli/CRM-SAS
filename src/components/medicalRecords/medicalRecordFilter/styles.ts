import styled from "styled-components";

export const FilterContainer = styled.div`
  width: 100%;
  max-width: 400px; /* Define uma largura máxima reduzida */
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: #333333;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #333333;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border-color: #4f98a0;
    box-shadow: 0 0 0 2px rgba(79, 152, 160, 0.2);
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4f98a0;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3e7a84;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    padding: 0.5rem;
    text-align: left;
    border: 1px solid #ccc;
  }

  th {
    background-color: #4f98a0;
    color: #ffffff;
    font-weight: bold;
  }

  tr {
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  tr:hover {
    background-color: #e6f7f9;
  }
`;

export const SummaryContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    color: #333333;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #555555;
    margin-bottom: 0.5rem;

    strong {
      color: #333333;
    }
  }
`;
