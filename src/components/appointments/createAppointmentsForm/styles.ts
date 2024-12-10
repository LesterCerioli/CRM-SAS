import styled from 'styled-components'

export const OuterContainer = styled.div`
  position: relative;
  width:37%;
  height: auto;
  margin-top: 3rem;

  @media (max-width: 768px) {
    width: 26rem;
    margin-top: 2rem;
  }
`

export const CalendarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #A8D5D7;
  border-radius: 25px;
  padding: 20px;
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
  position: relative;
  padding-top: 4rem;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 10vh;
    background-color: #75a5a7;
    border-radius: 25px 25px 0 0;
  }
  @media (max-width: 768px) {
    padding: 10px;
    border-radius: 15px;

    &::before {
      height: 10vh;
      border-radius: 15px 15px 0 0;
    }
  }
`

export const TopTabs = styled.div`
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  @media (max-width: 768px) {
    gap: 20px;
    top: -15px;
  }
`

export const SideTab = styled.div`
  width: 18%;
  height: 4vh;
  margin-bottom: 1.5rem;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
  transform: rotate(90deg); 
  margin-left: 2rem;
  margin-right: 2rem;
  @media (max-width: 768px) {
    width: 60px;
    height: 20px;
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;


export const CenterTab = styled.div`
  width: 70px;
  height: 70px;
  background-color: #e8f3ee;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 -4px 8px rgba(0,0,0,0.1);
  margin-bottom: 1rem;

  &::after {
    content: '+';
    color: #86b7a0;
    font-size: 70px;
    font-weight: 700;
    line-height: 1;
  }
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;

    &::after {
      font-size: 46px;
    }
  }
`

export const Container = styled.div`
  width: 100%;
  height: 60vh;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  margin-top: 25px;

  @media (max-width: 768px) {
    width: 25rem;
    height: 55vh;
    margin-top: 60px;
    border-radius: 100%;
    padding: 26px;
  }
`

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 8px;
  }
`

export const NavButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 17%;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    margin-left: 1%;
    margin-right: 1%;
    margin-top: 10%;
  }
`

export const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: 500;
  color: #666;
  font-size: 1.3rem;
  gap: .3rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

export const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: .3rem;
  margin-bottom: 30%;

  @media (max-width: 768px) {
    gap: .1rem;
    margin-bottom: 18%;
  }
`

export const Day = styled.button<{ isToday?: boolean; isSelected?: boolean }>`
  width: 12px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.isSelected ? '#86b7a0' : 'transparent'};
  color: ${props => props.isSelected ? 'white' : props.isToday ? '#86b7a0' : '#333'};
  font-weight: ${props => props.isToday ? '500' : 'normal'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -2px auto;
  font-size: 12px;

  &:hover {
    background-color: ${props => props.isSelected ? '#86b7a0' : '#f0f0f0'};
    padding: 8px;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 18px;
  }
`;


export const FormContainer = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  background:  #4f98a0;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 90%;

  @media (max-width: 768px) {
    width: 95%;
    padding: 16px;
  }
`;

export const FormHeader = styled.h3`
  text-align: center;
  margin-bottom: 16px;
  color: #fff;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;

`;

export const DisabledInput = styled(Input)`
  background-color: #f0f0f0;
  color: #999;
  cursor: not-allowed;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #86b7a0;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #75a593;
  }
`;


export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const CancelButton = styled.button`
  width: 48%;
  padding: 12px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #c9302c;
  }
`;


export const MonthYearContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 17%;

  @media (max-width: 768px) {
    margin-top: 3rem;
    margin-top: 11%;
  }
`;

export const MonthDisplay = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  text-transform: capitalize;
  color: #333;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const YearSelect = styled.select`
  margin-top: 4px;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid  #75a5a7;
  font-size: 1.4rem;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    border-color: #A8D5D7;
  }

  @media (max-width: 768px) {
    font-size: 17px;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  background: #ffffff;
  color: #333;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  font-size: 14px;
  z-index: 10;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 15px;
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  font-weight: 500;
  position: absolute;
  top: 80%;
  left: 5px;
`;






