import styled, { createGlobalStyle } from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

export const Container = styled.div`
  
`;

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    background-color: #2A4B7C;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 700px;
    margin: auto;
    color: #fff;
    font-size: 18px;

    @media (max-width: 768px) {
        width: 300px;
        padding: 1rem;
        font-size: 16px;
    }
`;

export const FieldContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    label {
        flex: 1;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        color: #fff;
    }

    input[type="text"],
    input[type="number"],
    .datepicker-input {
        padding: 0.5rem;
        margin-top: 0.5rem;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        color: #000;
        width: 100%;
    }

    @media (max-width: 768px) {
        flex-direction: column;

        input[type="text"],
        input[type="number"],
        .datepicker-input {
            padding: 0.4rem;
        }
    }
`;

export const FileUploadContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    div {
        width: 100%;
    }

    p {
        text-align: left;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    input[type="file"] {
        padding: 0.5rem;
        margin-top: 0.5rem;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
    }

    @media (max-width: 768px) {
        input[type="file"] {
            padding: 0.4rem;
        }
    }
`;

export const SubmitButton = styled.button`
    padding: 1rem;
    background-color: #28a745;
    color: #ffffff;
    font-weight: bold;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    width: 100%;
    align-self: center;
    transition: background-color 0.3s;

    &:hover {
        background-color: #218838;
    }

    @media (max-width: 768px) {
        padding: 0.8rem;
        font-size: 16px;
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
        background-color: #2A4B7C;
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
        background-color: #218838;
        color: #fff;
        border-radius: 50%;
    }

    .react-datepicker__current-month, .react-datepicker__day-name {
        color: #fff;
    }

    .react-datepicker__day--outside-month {
        color: #ccc;
    }

    @media (max-width: 768px) {
        .react-datepicker {
            font-size: 14px;
        }
    }
`;
