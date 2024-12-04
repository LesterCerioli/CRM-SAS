import styled from "styled-components";

export const Container = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 15px;
  width: 70rem;
  margin: 20px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 5rem;
  margin-bottom: 5rem;


  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
    border-radius: 10px;
  }
`;


export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 2.5rem;

  h1 {
    color: #333;
    font-size: 24px;
    margin: 0;
  }

  @media (max-width: 768px) {
    gap: 10px;

    h1 {
      font-size: 25px;
      margin-top: 20px;
    }
  }
`;

export const CrossIcon = styled.div`
  background-color: #ff6b35;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 30px;
    margin-left: 15px;
    margin-top: 20px;
  }
`;

export const Section = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 14px;

  .date-div{
    width: 58%;
    display: flex;
    flex-direction: column;
    font-weight: 500;
    font-size: 14px;
}
.date{
  padding: 12px; 
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
   width: 58%;
   @media (max-width: 768px) {
    width: 21rem;
    height: auto;
  }
}



  label {
    display: flex;
    flex-direction: column;
    font-weight: 500;
    color: #444;

    input,
    textarea {
      margin-top: 8px;
      padding: 12px;
      font-size: 12px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background-color: #fafafa;

      &:focus {
        outline: none;
        border-color: #ff6b35;
        background-color: white;
      }
    }

    textarea {
      resize: vertical;
      min-height: 150px;
    }
  }

 
  &:nth-child(1),
  &:nth-child(2) {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 15px;

    label {
      flex-direction: column;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;

    &:nth-child(1),
    &:nth-child(2) {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    label {
      input,
      textarea {
        font-size: 14px;
        padding: 10px;
      }
    }
  }
`;


export const SignatureSection = styled.div`

  .signature-canvas {
    margin-top: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: white;
    width: 500px;
    height: 145px;

    @media (max-width: 768px) {
      margin-top: 5px;
      width: 100%;
    }
    
  }
`;

export const PrescriptionSection = styled.div`
  width: 100%;
 
`;

export const SignatureButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  button {
    padding: 8px 16px;
    border: 1px solid #ff6b35;
    border-radius: 6px;
    background-color: white;
    color: #ff6b35;
    cursor: pointer;
    font-weight: 500;

    &:hover {
      background-color: #fff1ec;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;

    button {
      padding: 6px 12px;
      font-size: 14px;
    }
  }
`;

export const SubmitButton = styled.button`
  background-color: #ff6b35;
  color: white;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  width: 93%;
  transition: background-color 0.1s;
  margin-left: 3.5%;

  &:hover {
    background-color: #ff5a1f;
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 14px;
  }
`;

export const StyledDatePicker = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker {
    font-family: Arial, sans-serif;
    font-size: 14px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #fafafa;
  }

  @media (max-width: 768px) {
    .react-datepicker {
      font-size: 12px;
    }
  }
`;
