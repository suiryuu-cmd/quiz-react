import { shuffleArray } from "./utils";

export type Question = {
    category: string;
    correct_answer: string;
    difficult: string;
    incorrect_answer: string;
    question: string;
    type: string;

}

export type QuestionState = Question & { answer: string[] };

export enum Difficulty {
    EASY = "EASY",
    MEDIUM = "medium",
    HARD = "hard",
}

export const fetchQuizQuestions = async (
    amount: number,
    difficulty: string
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.result.map((question: Question) => ({
    ...question,
    answer: shuffleArray([
        ...question.incorrect_answer,
        question.correct_answer,
    ]),
  }));
};