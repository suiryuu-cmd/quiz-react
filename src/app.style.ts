import styled, { createGlobalStyle } from "styled-components";
import bgImage from "./images/winter-bg.jpg";
import bgImageSm from "./images/summer-bg.jpg";

export const GlobalStyle = createGlobalStyle`
html{
    height: 100vh;
}

body {
    margin: 0;
    padding: 0 20px;
    background-image: url(${bgImage});
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    @media (max-width:768px) {
      background-image: url(${bgImageSm});
      background-size: cover;
    }
}

* {
    
    box-sizing: border-box;
    font-family: 'Quicksand', sans-serif;
}
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .difficulty {
    color: #fff;
    font-size: 2rem;
    text-align: center;

    > select {
      width: 100%;
      border: 1px solid #d2d1d5;
      border-radius: 0.25em;
      padding: 0.25em 0.5em;
      font-size: 1.25rem;
      cursor: pointer;
      line-height: 1.1;
      background-color: #fff;
      background-image: linear-gradient(to top, #d2d1d5, #fff 33%);
      &:focus {
        background-color: #d2d1d5;
        outline: none;
      }
    }
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    font-family: "Unbounded", cursive;
    background-image: linear-gradient(180deg, #fff, #d2d1d5);
    background-size: 100%;
    background-clip: text;
    font-size: 50px;
    text-align: center;
    margin: 20px;
    filter: drop-shadow(2px 2px #000);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
  }

  .start,
  .next {
    cursor: pointer;
    background: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }
  .start {
    max-width: 200px;
  }
`;