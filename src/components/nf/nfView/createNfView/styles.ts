import styled, { createGlobalStyle } from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1E3A5F;
  padding: 6rem;

  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 5rem;
    background-color: #1E3A5F; 
  }

  @media (max-width: 768px) {
    padding: 7rem;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background-color: #2a4b7c;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #fff;
  font-size: 14px;
  width: 1200px;
  margin-top: -100px;

  @media (max-width: 1024px) {
    margin-top: 10px;
    width: 700px;
    height: auto;
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    margin-top: -100px;
    width: 350px;
    height: auto;
    padding: 1rem;
  }
`;

export const FieldRow = styled.div`
  display: flex;
  flex-wrap: wrap; 
  gap: 1rem; 

  @media (max-width: 1024px) {
    flex-direction: column; 
  }

  @media (max-width: 768px) {
    flex-direction: column; 
    gap: 5px; 
  }
`;

export const FullWidthFieldContainer = styled.div`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    color: #fff;
    display: flex;
    flex-direction: column;
  }

  input[type='text'] {
    padding: 0.5rem;
    margin-top: 0.5rem;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #000;
    width: 100%; 
    box-sizing: border-box; 
  }

  @media (max-width: 1024px) {
    flex: 1 1 100%;
  }

  @media (max-width: 768px) {
    flex: 1 1 100%; 
  }
`;

export const FieldContainer = styled.div`
  flex: 1 1 calc(25% - 1rem); 
  min-width: calc(25% - 1rem); 
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    color: #fff;
    display: flex;
    flex-direction: column;
    font-size: 18px;
  }

  input[type='text'],
  input[type="email"],
  input[type='number'],
  input[type='month'],
  .datepicker-input,
  select {
    padding: 0.5rem;
    margin-top: 0.5rem;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #000;
    width: 100%;
    box-sizing: border-box;
  }

  .datepicker-input {
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    flex: 1 1 100%;

    label {
    font-size: 30px;
  }
  input[type='text'],
  input[type="email"],
  input[type='number'],
  input[type='month'],
  .datepicker-input,
  select {
    padding: 0.7rem;
    margin-top: 0.7rem;

  }
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;

    label {
    font-size: 18px;
  }
  input[type='text'],
  input[type="email"],
  input[type='number'],
  input[type='month'],
  .datepicker-input,
  select {
    padding: 0.5rem;
    margin-top: 0.5rem;

  }
  }
`;

export const SubmitButton = styled.button`
  padding: 1rem;
  background-color: #28a745;
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  width: 50%;
  transition: background-color 0.3s;
  margin-left: 280px;

  &:hover {
    background-color: #218838;
  }

  @media (max-width: 1024px) {
    width: 100%;
    margin-left: 0;
    font-size: 25px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const DatePickerStyles = createGlobalStyle`
  .react-datepicker {
    font-family: Arial, sans-serif;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    color: #000;
  }

  .react-datepicker__header {
    background-color: #2a4b7c;
    color: #fff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
    background-color: #28a745;
    color: #fff;
    border-radius: 50%;
  }

  .react-datepicker__day:hover {
    background-color: #28a745;
    color: #fff;
    border-radius: 50%;
  }

  .react-datepicker__current-month, .react-datepicker__day-name {
    color: #fff;
  }

  .react-datepicker__day--outside-month {
    color: #ccc;
  }

  @media (max-width: 1024px) {
    .react-datepicker {
      font-size: 18px;
    }
  }

  @media (max-width: 768px) {
    .react-datepicker {
      font-size: 12px;
    }
  }
`;
