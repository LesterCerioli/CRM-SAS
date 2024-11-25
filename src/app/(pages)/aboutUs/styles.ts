import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.div`
  h1 {
    display: flex;
    justify-content: center;
    font-size: 3.4rem;
    margin-top: 8rem;
    color: #021F3E;
    font-weight: 400;
  }

  .hline {
    border-bottom: 2px solid lightgray;
    margin: 1rem 7rem;
    margin-bottom: 4rem;
  }

  @media screen and (max-width: 600px) {
    h1 {
      margin: 0 auto;
      font-size: 30px;
    }
  }
`;

export const Section = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 6rem;
  gap: 6rem;
  font-weight: 400;

  @media screen and (max-width: 600px) {
    flex-direction: column;

    p {
      margin: 0 8rem;
      font-size: 1.4rem;
    }
  }

`;

export const SectionContent = styled.div`
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 8rem;

   @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 1rem auto;
    
  }
`;

export const SecondComponent = styled.div`
  display: flex;
  justify-content: center;
  background-color: #F6F6F6;
  width: 100%;

  
`;

export const SecondTitle = styled.div`
  h1 {
    display: flex;
    justify-content: center;
    font-size: 3.4rem;
    margin-top: 5rem;
    color: #021F3E;

    @media screen and (max-width: 600px) {
      width: 80%;
      flex-wrap: wrap;
      font-size: 30px;
      margin: 1rem auto;
      text-align: center;
    }
  }

  

  .htowline {
    border-bottom: 2px solid lightgray;
    margin: 1rem 40rem;
    margin-bottom: 5rem;

    @media screen and (max-width: 600px) {
      margin: 1rem auto;
    }
  }
`;

export const SecondElement = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 6rem;
  gap: 6rem;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    text-align: center;
    margin: 0 auto;
  }
`;

export const TextElement = styled.div`
  font-size: 20px;
  font-family: 'Roboto', sans-serif;

  @media screen and (max-width: 600px) {
    flex-direction: column;

    p {
      margin: 0 2.3rem;
      font-size: 1.4rem;
    }
  }
`;
