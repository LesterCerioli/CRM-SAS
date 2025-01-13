import styled from 'styled-components';

export const Container = styled.div`
  background-color: #FF7F6F;
  padding: 2rem;
  border-radius: 10px;
  max-width: 900px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
    max-width: 100%;
    border-radius: 0;
  }
`;

export const Title = styled.h1`
  color: #4A9B9B;
  padding: 1rem;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700; 
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Row = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: calc(33.333% - 0.67rem);

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

export const Label = styled.label`
  color: white;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 16px; 
  }
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 16px; 
  }
`;

export const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 16px; 
  }
`;

export const Button = styled.button`
  background-color: #4A9B9B;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;

  &:hover {
    background-color: #3a7a7a;
  }

  @media (max-width: 768px) {
    font-size: 16px; 
    padding: 0.75rem 1rem; 
  }
`;

export const SubmitButton = styled(Button)`
  margin-top: 1rem;
`;

