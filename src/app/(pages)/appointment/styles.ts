import styled from "styled-components";

export const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
  background-color: #4f98a0;
  width: 100%;
  height: auto;
  padding: 7rem;
  
  h1{
    color: #fff;
    font-size: 42px;
  }

  @media (max-width: 768px) {
    h1{
      font-size: 25px;
      padding: 1rem;
      white-space: nowrap;

    }
  }

  
  
  button {
    text-transform: uppercase;
    padding: 12px 25px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-weight: 700;
    letter-spacing: 0.071em;
    font-size: 14px;
    transition: all ease-in-out 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

