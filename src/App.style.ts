import styled, { createGlobalStyle } from "styled-components";
import bgImage from "./images/winter-bg.avif";
import bgImageSm from "./images/summer-bg.avif";

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
    font-family: 'Quicksand Variable', sans-serif;
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
    font-family: "Unbounded Variable", sans-serif;
    background-image: linear-gradient(180deg, #fff, #d2d1d5);
    background-size: 100%;
    background-clip: text;
    font-size: clamp(28px, 8vw, 50px);
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

  .error {
    color: #fff;
    background: rgba(160, 20, 20, 0.85);
    padding: 10px 16px;
    border-radius: 10px;
    text-align: center;
  }

  .loader {
    width: 56px;
    height: 56px;
    margin: 20px;
    border: 6px solid rgba(255, 255, 255, 0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .loader {
      animation-duration: 2.4s;
    }
  }
`;