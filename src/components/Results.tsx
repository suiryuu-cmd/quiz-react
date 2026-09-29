import { useEffect, useRef } from "react";
import type { AnswerObject } from "../App";
import { Card, GhostButton, Hint, PrimaryButton } from "../App.style";
import { CheckIcon, CrossIcon } from "./Icons";
import { Actions, Review, Score, Verdict } from "./Results.style";

type Props = {
  answers: AnswerObject[];
  onPlayAgain: () => void;
  onChangeDifficulty: () => void;
};

const verdict = (score: number, total: number) => {
  if (score === total) return "Perfect round. Not one miss.";
  const ratio = score / total;
  if (ratio >= 0.7) return "Sharp. That's a strong round.";
  if (ratio >= 0.4) return "Solid. Room to climb.";
  return "Warm-up round. The next one's yours.";
};

const Results = ({ answers, onPlayAgain, onChangeDifficulty }: Props) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const score = answers.filter(a => a.correct).length;
  const missed = answers.filter(a => !a.correct);

  useEffect(() => headingRef.current?.focus(), []);

  return (
    <Card aria-labelledby="verdict">
      <Score>
        <strong>{score}</strong>
        <span>/ {answers.length}</span>
      </Score>
      <Verdict id="verdict" ref={headingRef} tabIndex={-1}>
        {verdict(score, answers.length)}
      </Verdict>

      <Actions>
        <PrimaryButton onClick={onPlayAgain}>Play again</PrimaryButton>
        <GhostButton onClick={onChangeDifficulty}>Change difficulty</GhostButton>
      </Actions>

      {missed.length > 0 && (
        <section aria-labelledby="missed">
          <Hint id="missed" as="h3">Your misses</Hint>
          <Review>
            {missed.map(a => (
              <li key={a.question}>
                <span className="q">{a.question}</span>
                <span className="yours">
                  <CrossIcon /> <span className="visually-hidden">Your answer:</span>
                  {a.answer}
                </span>
                <span className="right">
                  <CheckIcon /> <span className="visually-hidden">Correct answer:</span>
                  {a.correctAnswer}
                </span>
              </li>
            ))}
          </Review>
        </section>
      )}
    </Card>
  );
};

export default Results;
