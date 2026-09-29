import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
import type { Difficulty, QuestionState } from "./API";
import QuestionCard from "./components/QuestionCard";
import { GlobalStyle, Wrapper } from "./App.style";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

type Phase = "idle" | "loading" | "playing" | "error";

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  const score = userAnswers.filter(a => a.correct).length;
  const finished = phase === "playing" && userAnswers.length === questions.length;
  const current = questions[number];

  const startQuiz = async () => {
    setPhase("loading");
    try {
      setQuestions(await fetchQuizQuestions(TOTAL_QUESTIONS, difficulty));
      setUserAnswers([]);
      setNumber(0);
      setPhase("playing");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load questions.");
      setPhase("error");
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.value;
    setUserAnswers(prev => [
      ...prev,
      {
        question: current.question,
        answer,
        correct: current.correctAnswer === answer,
        correctAnswer: current.correctAnswer,
      },
    ]);
  };

  const showStart = phase === "idle" || phase === "error";

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT TYPESCRIPT QUIZ</h1>
        {showStart && (
          <>
            {phase === "error" && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <button className="start" onClick={startQuiz}>
              {phase === "error" ? "Try again" : "Start"}
            </button>
            <label className="difficulty">
              <p>Select Difficulty</p>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value as Difficulty)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
          </>
        )}
        {phase === "loading" && <div className="loader" role="status" aria-label="Loading questions" />}
        {phase === "playing" && !finished && <p className="score">Score: {score}</p>}
        {phase === "playing" && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={questions.length}
            question={current.question}
            answers={current.answers}
            userAnswer={userAnswers[number]}
            onAnswer={checkAnswer}
          />
        )}
        {phase === "playing" && userAnswers.length === number + 1 && !finished && (
          <button className="next" onClick={() => setNumber(n => n + 1)}>
            Next Question
          </button>
        )}
        {finished && (
          <>
            <p className="score">Game Over</p>
            <p className="score">Your Score is: {score}</p>
            <button className="start" onClick={() => setPhase("idle")}>
              Play Again
            </button>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default App;
