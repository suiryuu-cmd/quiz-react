import { describe, expect, it } from "vitest";
import { parseQuestions } from "./API";
import { shuffleArray } from "./utils";

const enc = encodeURIComponent;

describe("parseQuestions", () => {
  it("decodes text and includes the correct answer among the answers", () => {
    const [q] = parseQuestions({
      response_code: 0,
      results: [{ question: enc("<b>2 & 2?</b>"), correct_answer: enc("4"), incorrect_answers: ["1", "2", "3"].map(enc) }],
    });
    expect(q.question).toBe("<b>2 & 2?</b>");
    expect(q.correctAnswer).toBe("4");
    expect([...q.answers].sort()).toEqual(["1", "2", "3", "4"]);
  });

  it("throws a readable error on rate limit", () => {
    expect(() => parseQuestions({ response_code: 5, results: [] })).toThrow(/Too many requests/);
  });

  it("throws on a malformed response", () => {
    expect(() => parseQuestions(null)).toThrow(/unexpected response/);
    expect(() => parseQuestions({ results: "x" })).toThrow(/unexpected response/);
  });
});

describe("shuffleArray", () => {
  it("keeps every element and does not mutate the input", () => {
    const input = [1, 2, 3, 4];
    expect([...shuffleArray(input)].sort()).toEqual([1, 2, 3, 4]);
    expect(input).toEqual([1, 2, 3, 4]);
  });

  it("puts the last element in every position about equally often", () => {
    const counts = [0, 0, 0, 0];
    const runs = 20000;
    for (let i = 0; i < runs; i++) counts[shuffleArray(["a", "b", "c", "x"]).indexOf("x")]++;
    for (const c of counts) expect(Math.abs(c / runs - 0.25)).toBeLessThan(0.02);
  });
});
