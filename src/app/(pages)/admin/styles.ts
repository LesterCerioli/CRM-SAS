import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;

  .card {
    background-color: #FFA500; /* Fundo laranja */
    color: #FFFFFF; /* Fonte branca */
    padding: 16px;
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
    font-size: 14px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

    h2 {
      font-size: 18px;
      font-weight: bold;
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