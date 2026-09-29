import { useEffect, useRef, type CSSProperties } from "react";
import type { AnswerObject } from "../App";
import { Card, Hint, PrimaryButton } from "../App.style";
import { ANSWER_KEYS } from "../utils";
import { CheckIcon, CrossIcon } from "./Icons";
import {
  AnswerButton,
  Answers,
  Feedback,
  Footer,
  Meta,
  Progress,
  Question,
  Segment,
  type AnswerState,
} from "./QuestionCard.style";


type Props = {
  question: string;
  answers: string[];
  questionNumber: number;
  totalQuestions: number;
  results: boolean[];
  userAnswer: AnswerObject | undefined;
  onAnswer: (answer: string) => void;
  onNext: () => void;
};

const answerState = (answer: string, userAnswer: AnswerObject | undefined): AnswerState => {
  if (!userAnswer) return "idle";
  if (answer === userAnswer.correctAnswer) return "right";
  if (answer === userAnswer.answer) return "wrong";
  return "muted";
};

const QuestionCard = ({
  question,
  answers,
  questionNumber,
  totalQuestions,
  results,
  userAnswer,
  onAnswer,
  onNext,
}: Props) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const isLast = questionNumber === totalQuestions;
  const score = results.filter(Boolean).length;

  // Answer buttons disable after a pick, so move focus somewhere useful instead of <body>.
  useEffect(() => headingRef.current?.focus(), [questionNumber]);
  useEffect(() => {
    if (userAnswer) nextRef.current?.focus();
  }, [userAnswer]);

  return (
    <Card aria-labelledby="question">
      <Meta>
        <span>
          Question {questionNumber} of {totalQuestions}
        </span>
        <span>{score} correct</span>
      </Meta>
      <Progress style={{ "--count": totalQuestions } as CSSProperties} aria-hidden="true">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <Segment
            key={i}
            $state={i < results.length ? (results[i] ? "right" : "wrong") : i === questionNumber - 1 ? "current" : "todo"}
          />
        ))}
      </Progress>

      <Question id="question" ref={headingRef} tabIndex={-1}>
        {question}
      </Question>

      <Answers role="group" aria-labelledby="question">
        {answers.map((answer, i) => {
          const state = answerState(answer, userAnswer);
          return (
            <AnswerButton
              key={answer}
              $state={state}
              disabled={!!userAnswer}
              onClick={() => onAnswer(answer)}>
              <span className="key" aria-hidden="true">
                {ANSWER_KEYS[i]}
              </span>
              <span>{answer}</span>
              {state === "right" && <CheckIcon />}
              {state === "wrong" && <CrossIcon />}
              {state === "right" && <span className="visually-hidden">, correct answer</span>}
              {state === "wrong" && <span className="visually-hidden">, your answer, wrong</span>}
            </AnswerButton>
          );
        })}
      </Answers>

      <Footer>
        <div role="status">
          {userAnswer ? (
            <Feedback $correct={userAnswer.correct}>
              {userAnswer.correct ? "Correct." : `Wrong. It's ${userAnswer.correctAnswer}.`}
            </Feedback>
          ) : (
            <Hint>
              Press <kbd>A</kbd>–<kbd>D</kbd> or <kbd>1</kbd>–<kbd>4</kbd> to answer
            </Hint>
          )}
        </div>
        {userAnswer && (
          <PrimaryButton ref={nextRef} onClick={onNext}>
            {isLast ? "See results" : "Next question"}
          </PrimaryButton>
        )}
      </Footer>
    </Card>
  );
};

export default QuestionCard;
