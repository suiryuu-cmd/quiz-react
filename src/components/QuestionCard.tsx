import type React from "react";
import type { AnswerObject } from "../App";
import { CardWrapper, ButtonWrapper } from "./QuestionCard.style";

type Props = {
  question: string;
  answers: string[];
  onAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard = ({ question, answers, onAnswer, userAnswer, questionNumber, totalQuestions }: Props) => (
  <CardWrapper>
    <p className="number">
      Question: {questionNumber} / {totalQuestions}
    </p>
    <p>{question}</p>
    <div>
      {answers.map(answer => (
        <ButtonWrapper
          key={answer}
          $correct={userAnswer?.correctAnswer === answer}
          $userClicked={userAnswer?.answer === answer}>
          <button disabled={!!userAnswer} value={answer} onClick={onAnswer}>
            {answer}
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </CardWrapper>
);

export default QuestionCard;
