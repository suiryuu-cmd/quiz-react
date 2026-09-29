import styled from "styled-components";

export const Score = styled.p`
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-family: "Unbounded Variable", system-ui, sans-serif;
  font-variant-numeric: tabular-nums;
  line-height: 1;

  strong {
    font-size: clamp(3.5rem, 14vw, 5rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--accent);
  }

  span {
    font-size: 1.5rem;
    color: var(--muted);
  }
`;

export const Verdict = styled.h2`
  font-size: clamp(1.25rem, 3.2vw, 1.5rem);
  font-weight: 700;

  &:focus {
    outline: none;
  }
`;

export const Review = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    padding: 14px 16px;
    border: 1px solid var(--line);
    border-radius: var(--radius-sm);
    background: var(--surface-2);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .q {
    font-weight: 600;
  }

  .yours {
    color: var(--wrong-text);
  }

  .right {
    color: var(--right-text);
  }

  .yours, .right {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9375rem;
  }

  svg {
    flex: none;
    width: 18px;
    height: 18px;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  > * {
    flex: 1 1 180px;
  }
`;
