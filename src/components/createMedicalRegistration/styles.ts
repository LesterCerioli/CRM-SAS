import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 90%;
  max-width: 800px;
  background-color: #ffa573;
  color: #fff;
  padding: 3rem;
  border-radius: 20px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem;
    grid-template-columns: 1fr;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  color: #4f98a0;
  font-weight: 900;
  font-size: 16px;
 

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;

  &::placeholder {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:focus {
    outline: none;
    border-color: #4f98a0;
    box-shadow: 0 0 0 2px rgba(79, 152, 160, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &[type="date"] {
    appearance: none;
    -webkit-appearance: none;
    color: #fff;
    font-family: inherit;
    font-size: 1rem;
    background-color: rgba(255, 255, 255, 0.1);

    
    &::-webkit-calendar-picker-indicator {
      background-color: transparent;
      cursor: pointer;
      opacity: 0.8;
      filter: invert(1);
    }

    &::-webkit-datetime-edit-fields-wrapper {
      color: #fff;
    }

    &::-webkit-datetime-edit-text {
      color: #fff;
      padding: 0 0.3em;
    }

    &::-webkit-datetime-edit-month-field,
    &::-webkit-datetime-edit-day-field,
    &::-webkit-datetime-edit-year-field {
      color: #fff;
    }
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.9rem;
  }
`;

export const SubmitButton = styled.button`
  grid-column: 1 / -1;
  padding: 12px 20px;
  background-color: #4f98a0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #3a7278;
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 0.9rem;
  }
`;

export const Message = styled.p`
  grid-column: 1 / -1;
  color: #4f98a0;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;

