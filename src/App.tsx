import { useEffect, useState } from "react";
import { fetchQuizQuestions } from "./API";
import type { Difficulty, QuestionState } from "./API";
import QuestionCard from "./components/QuestionCard";
import { ANSWER_KEYS } from "./utils";
import Results from "./components/Results";
import { BoltIcon } from "./components/Icons";
import {
  Brand,
  Card,
  ErrorText,
  GhostButton,
  GlobalStyle,
  Lead,
  PrimaryButton,
  Segmented,
  Shell,
  Skeleton,
} from "./App.style";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

type Phase = "idle" | "loading" | "playing" | "error";

const TOTAL_QUESTIONS = 10;
const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

const App = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  const finished = phase === "playing" && userAnswers.length === questions.length;
  const current = questions[number];
  const answered = userAnswers[number];

  const startQuiz = async () => {
    setPhase("loading");
    try {
      setQuestions(await fetchQuizQuestions(TOTAL_QUESTIONS, difficulty));
      setUserAnswers([]);
      setNumber(0);
      setPhase("playing");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't load questions. Try again.");
      setPhase("error");
    }
  };

  const answer = (picked: string) => {
    if (answered) return;
    setUserAnswers(prev => [
      ...prev,
      {
        question: current.question,
        answer: picked,
        correct: current.correctAnswer === picked,
        correctAnswer: current.correctAnswer,
      },
    ]);
  };

  const next = () => setNumber(n => n + 1);

  // A–D / 1–4 answer; Enter on the Next button is handled natively since it takes focus.
  useEffect(() => {
    if (phase !== "playing" || finished || answered) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const k = e.key.toUpperCase();
      const i = ANSWER_KEYS.includes(k) ? ANSWER_KEYS.indexOf(k) : Number(k) - 1;
      const picked = current.answers[i];
      if (picked !== undefined) {
        e.preventDefault();
        answer(picked);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <>
      <GlobalStyle />
      <Shell>
        <Brand>
          <h1>
            <BoltIcon />
            Quickfire
          </h1>
          {phase === "playing" && !finished && (
            <GhostButton onClick={() => setPhase("idle")}>Quit</GhostButton>
          )}
        </Brand>

        {(phase === "idle" || phase === "error") && (
          <Card aria-label="New round">
            <Lead>Ten multiple-choice trivia questions from Open Trivia DB. Pick an answer and it's locked in.</Lead>
            <Segmented>
              <legend>Difficulty</legend>
              <div className="options">
                {DIFFICULTIES.map(d => (
                  <label key={d}>
                    <input
                      type="radio"
                      name="difficulty"
                      value={d}
                      checked={difficulty === d}
                      onChange={() => setDifficulty(d)}
                    />
                    {d[0].toUpperCase() + d.slice(1)}
                  </label>
                ))}
              </div>
            </Segmented>
            {phase === "error" && <ErrorText role="alert">{error}</ErrorText>}
            <PrimaryButton onClick={startQuiz}>
              {phase === "error" ? "Try again" : `Start ${difficulty} round`}
            </PrimaryButton>
          </Card>
        )}

        {phase === "loading" && (
          <Card role="status" aria-label="Loading questions">
            <Skeleton $h={14} $w="40%" />
            <Skeleton $h={6} />
            <Skeleton $h={30} $w="80%" />
            {ANSWER_KEYS.map(k => (
              <Skeleton key={k} $h={56} />
            ))}
          </Card>
        )}

        {phase === "playing" && !finished && (
          <QuestionCard
            question={current.question}
            answers={current.answers}
            questionNumber={number + 1}
            totalQuestions={questions.length}
            results={userAnswers.map(a => a.correct)}
            userAnswer={answered}
            onAnswer={answer}
            onNext={next}
          />
        )}

        {finished && (
          <Results answers={userAnswers} onPlayAgain={startQuiz} onChangeDifficulty={() => setPhase("idle")} />
        )}
      </Shell>
    </>
  );
};

export default App;
