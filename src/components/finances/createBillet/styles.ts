
import styled from 'styled-components';
export const Container = styled.div`

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
export const FormContainer = styled.div`
  width: 100%;
  padding: 2rem;
  background-color: #2A4B7C;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;  
  color: #fff;
  margin-top: 3rem;
  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 16px;
  }
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
  input,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    color: #000;
    transition: border-color 0.2s;
    &:focus {
      border-color: #4a90e2;
      outline: none;
    }
  }
  @media (max-width: 768px) {
    input, select {
      padding: 0.4rem;
      font-size: 16px;
    }
  }
`;
export const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; 
  label {
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
  input[type='file'] {
    padding: 0.5rem;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    background-color: #fff;
    transition: border-color 0.2s;
    &:focus {
      border-color: #4a90e2;
      outline: none;
    }
  }
  @media (max-width: 768px) {
    input[type='file'] {
      padding: 0.4rem;
    }
  }
`;

export const SubmitButton = styled.button`
  padding: 1rem;
  font-size: 16px;
  color: #ffffff;
  background-color: #28a745;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
  width: 100%;
  &:hover {
    background-color: #218838;
  }
  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 16px;
  }
`;
export const StatusMessage = styled.p<{ success: boolean }>`
  margin-top: 1rem;
  color: ${(props) => (props.success ? '#28a745' : 'red')};
  font-weight: bold;
  text-align: center;
`;


