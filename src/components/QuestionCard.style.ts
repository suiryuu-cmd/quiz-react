import styled, { css, keyframes } from "styled-components";

export const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--muted);
  font-size: 0.875rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
`;

export const Progress = styled.ol`
  display: grid;
  grid-template-columns: repeat(var(--count), 1fr);
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const Segment = styled.li<{ $state: "right" | "wrong" | "current" | "todo" }>`
  height: 6px;
  border-radius: 3px;
  background: ${({ $state }) =>
    $state === "right"
      ? "var(--right)"
      : $state === "wrong"
        ? "var(--wrong)"
        : $state === "current"
          ? "var(--accent)"
          : "var(--surface-2)"};
  transition: background-color 300ms var(--ease-out);
`;

export const Question = styled.h2`
  font-size: clamp(1.25rem, 3.2vw, 1.625rem);
  font-weight: 700;
  line-height: 1.3;
  text-wrap: balance;
  max-width: 36ch;

  &:focus {
    outline: none;
  }
`;

export const Answers = styled.div`
  display: grid;
  gap: 10px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const pop = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.025); }
  100% { transform: scale(1); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
`;

export type AnswerState = "idle" | "right" | "wrong" | "muted";

export const AnswerButton = styled.button<{ $state: AnswerState }>`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  padding: 10px 14px;
  border: 1.5px solid var(--line);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  color: var(--text);
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  overflow-wrap: anywhere;
  cursor: pointer;
  transition:
    background-color 150ms var(--ease-out),
    border-color 150ms var(--ease-out),
    opacity 200ms var(--ease-out);

  .key {
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border-radius: 7px;
    background: var(--bg);
    border: 1px solid var(--line);
    color: var(--muted);
    font-size: 0.8125rem;
    font-weight: 700;
  }

  &:disabled {
    cursor: default;
  }

  @media (hover: hover) {
    &:not(:disabled):hover {
      border-color: var(--accent);
      background: #253152;
    }
  }

  &:not(:disabled):active {
    transform: translateY(1px);
  }

  ${({ $state }) =>
    $state === "right" &&
    css`
      background: var(--right-tint);
      border-color: var(--right);
      color: var(--right-text);
      animation: ${pop} 360ms var(--ease-out);
      .key {
        color: var(--right-text);
        border-color: var(--right);
      }
    `}

  ${({ $state }) =>
    $state === "wrong" &&
    css`
      background: var(--wrong-tint);
      border-color: var(--wrong);
      color: var(--wrong-text);
      animation: ${shake} 240ms var(--ease-out);
      .key {
        color: var(--wrong-text);
        border-color: var(--wrong);
      }
    `}

  ${({ $state }) =>
    $state === "muted" &&
    css`
      opacity: 0.45;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 16px;
  min-height: 52px;
`;

export const Feedback = styled.p<{ $correct: boolean }>`
  font-weight: 700;
  color: ${({ $correct }) => ($correct ? "var(--right-text)" : "var(--wrong-text)")};
`;
