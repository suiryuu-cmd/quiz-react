import React from "react";
import { AnswerObject } from "../App";
import { CardWrapper, ButtonWrapper } from "./QuestionCard.style"

type Props = {
    question: string;
    answer: string[];
    callback:(e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | underfined;
    questionNumber: number;
    totalQuestion: number;
};

const QuestionCard: React.FC<Props> = ({
    question,
    answer,
    callback,
    userAnswer,
    questionNumber,
    totalQuestion,
}) => {
    return (
        <CardWrapper>
            <p className="number">
                Question: {questionNumber}/ {totalQuestion}{" "}
            </p>
            <p dangerouslySetInnerHTML={{  __html: question }} />
            <div>
                {answer.map((answer, index) => (
                    <ButtonWrapper
                    key={index}
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}>
                        {/* !!userAnswer === userAnswer ? true : false */}
                        <button disabled={!!userAnswer} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </ButtonWrapper>
                ))}
            </div>
        </CardWrapper>
    );
};

export default QuestionCard;