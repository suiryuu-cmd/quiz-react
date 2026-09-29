import { shuffleArray } from "./utils";

export type Difficulty = "easy" | "medium" | "hard";

type ApiQuestion = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type ApiResponse = {
  response_code: number;
  results: ApiQuestion[];
};

export type QuestionState = {
  question: string;
  correctAnswer: string;
  answers: string[];
};

// https://opentdb.com/api_config.php
const RESPONSE_ERRORS: Record<number, string> = {
  1: "Not enough questions for this difficulty.",
  5: "Too many requests. Wait a few seconds and try again.",
};

const isApiResponse = (data: unknown): data is ApiResponse =>
  typeof data === "object" &&
  data !== null &&
  typeof (data as ApiResponse).response_code === "number" &&
  Array.isArray((data as ApiResponse).results);

// Questions arrive URL-encoded (encode=url3986) so they can be rendered as plain text, never as HTML.
export const parseQuestions = (data: unknown): QuestionState[] => {
  if (!isApiResponse(data)) throw new Error("Unexpected response from the quiz server.");
  if (data.response_code !== 0) {
    throw new Error(RESPONSE_ERRORS[data.response_code] ?? `Quiz server error (code ${data.response_code}).`);
  }
  return data.results.map(q => {
    const correctAnswer = decodeURIComponent(q.correct_answer);
    return {
      question: decodeURIComponent(q.question),
      correctAnswer,
      answers: shuffleArray([...q.incorrect_answers.map(decodeURIComponent), correctAnswer]),
    };
  });
};

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&encode=url3986`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`Quiz server responded ${res.status}. Try again.`);
  return parseQuestions(await res.json());
};
