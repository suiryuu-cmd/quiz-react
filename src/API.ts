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
const RATE_LIMITED = "Too many requests. Wait five seconds, then try again.";
const RESPONSE_ERRORS: Record<number, string> = {
  1: "Not enough questions at this difficulty right now. Pick another level.",
  5: RATE_LIMITED,
};

const isApiResponse = (data: unknown): data is ApiResponse =>
  typeof data === "object" &&
  data !== null &&
  typeof (data as ApiResponse).response_code === "number" &&
  Array.isArray((data as ApiResponse).results);

// Questions arrive URL-encoded (encode=url3986) so they can be rendered as plain text, never as HTML.
export const parseQuestions = (data: unknown): QuestionState[] => {
  if (!isApiResponse(data)) throw new Error("Open Trivia DB sent an unexpected response. Try again in a moment.");
  if (data.response_code !== 0) {
    throw new Error(RESPONSE_ERRORS[data.response_code] ?? `Open Trivia DB couldn't serve questions (code ${data.response_code}). Try again in a moment.`);
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
  let res: Response;
  try {
    res = await fetch(endpoint);
  } catch {
    throw new Error("Couldn't reach Open Trivia DB. Check your connection and try again.");
  }
  if (res.status === 429) throw new Error(RATE_LIMITED);
  if (!res.ok) throw new Error(`Open Trivia DB is having trouble (error ${res.status}). Try again in a moment.`);
  return parseQuestions(await res.json());
};
