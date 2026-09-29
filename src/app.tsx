import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
// Components
import QuestionCard from "./components/QuestionCard";
// Types
import { QuestionState } from "./API";
// Styles
import { GlobalStyle, Wrapper } from "./App.styles";
import loadingImage from "./images/loading.gif";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [difficult, setDifficult] = useState("easy");

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, difficult);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // Users answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next questions if not the last question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT TYPESCRIPT QUIZ</h1>
        {gameOver ? (
          <>
            <button className="start" onClick={startQuiz}>
              Start
            </button>
            <div className="difficulty">
              <p>Select Difficulty</p>
              <select
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                  setDifficult(event.target.value)
                }>
                <option value={"easy"}>Easy</option>
                <option value={"medium"}>Medium</option>
                <option value={"hard"}>Hard</option>
              </select>
            </div>
          </>
        ) : null}

        {gameOver || userAnswers.length === TOTAL_QUESTIONS || (
          <p className="score">Score: {score}</p>
        )}
        {loading && <img src={loadingImage} alt="loadingImg" />}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
        {userAnswers.length === TOTAL_QUESTIONS && (
          <>
            <p className="score">Game Over</p>
            <p className="score">Your Score is : {score}</p>
            <button className="start" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default App;