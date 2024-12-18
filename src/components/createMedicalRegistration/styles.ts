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
    color: rgba(255, 255, 255, 0.7);
  }

  &[type="date"] {
    appearance: none;
    -webkit-appearance: none;
    position: relative;
    color: #fff;
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
    
    &::-webkit-calendar-picker-indicator {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: auto;
      height: auto;
      color: transparent;
      background: transparent;
      cursor: pointer;
    }

    &::-webkit-datetime-edit {
      color: #fff;
    }

    &::-webkit-datetime-edit-fields-wrapper {
      padding: 0;
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

    &::-webkit-inner-spin-button {
      display: none;
    }

    &::-webkit-calendar-picker-indicator {
      opacity: 1;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='16' y1='2' x2='16' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='2' x2='8' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='10' x2='21' y2='10'%3E%3C/line%3E%3C/svg%3E");
      background-position: right 8px center;
      background-repeat: no-repeat;
      background-size: 20px;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }

  &:focus {
    outline: none;
    border-color: #4f98a0;
    box-shadow: 0 0 0 2px rgba(79, 152, 160, 0.3);
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

