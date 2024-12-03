import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f8ff;
  padding-top: 45rem;
  padding-bottom: 42rem;
  background-color: #ffa573;

  @media (max-width: 768px) {

    padding-top: 43rem;
  }


  form {
    width: 100%;
    max-width: 600px;
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
