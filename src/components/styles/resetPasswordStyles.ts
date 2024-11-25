import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #001f3f;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  label {
    margin-top: 10px;
    font-size: 14px;
  }

  input {
    margin-top: 5px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  button {
    margin-top: 20px;
    padding: 12px;
    border: none;
    border-radius: 4px;
    background-color: #001f3f;
    color: white;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #004080;
    }
  }

  .error-message {
    color: red;
    font-size: 12px;
    margin-top: 10px;
  }
`;