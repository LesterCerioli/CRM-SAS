import styled from "styled-components";

export const heroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    margin-top: 150px;
  }

  @media (max-width: 390px) {
    display: flex;
    width: 390px;
  }
`;

export const welcomeContainer = styled.div`
  position: relative;
  z-index: 10;
  @media (max-width: 390px) {
    display: flex;
    width: 390px;
  }
`;

export const contentContainer = styled.div`
  > div {
    width: 1120px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    margin-top: 150px;
    background: linear-gradient(to bottom, #4d6485, #052596);
    margin-bottom: 150px;
    border-radius: 35px;

    @media (max-width: 390px) {
      width: 370px;

      > div {
        width: 370px;
        h3 {
          width: 330px;
          margin-left: 50px;
          font-size: 20px;
        }
      }
    }
  }

  div {
    height: 450px;

    color: #fff;
    align-items: center;

    h3 {
      margin-top: 100px;
      width: 550px;
      padding-top: 35px;
      color: #fff;
      font-family: Quicksand;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
`;
export const imageContainer = styled.div`
  margin-top: -455px;

  @media (max-width: 390px) {
    .img {
      width: 200px;
      margin-left: -160px;
      margin-top: 10px;
    }
  }
`;
