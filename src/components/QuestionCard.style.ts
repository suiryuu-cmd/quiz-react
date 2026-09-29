import styled from "styled-components";

export const CardWrapper = styled.div`
  max-width: 1100px;
  width: 80%;
  background: #ebfeff;
  border-radius: 10px;
  border: 2px solid #0085a3;
  padding: 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
  text-align: center;

  p {
    font-size: 1rem;
  }
`;

type ButtonWrapperProps = {
  correct: boolean;
  userClicked: boolean;
};

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  transition: all 0.3s ease;

  :hover {
    opacity: 0.8;
  }
  button {
    cursor: pointer;
    user-select: none;
    font-size: 0.85rem;
    width: 100%;
    height: 40px;
    margin: 5px 0;
    background: ${({ correct, userClicked }) =>
      correct
        ? "linear-gradient(90deg, #66ffa4, #69bc86)"
        : !correct && userClicked
        ? "linear-gradient(90deg, #ff5656, #d16868)"
        : "linear-gradient(90deg, #18285b, #2f6fb1)"};
    border: 3px solid #fff;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    color: #fff;
    border-radius: 10px;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  }
`;