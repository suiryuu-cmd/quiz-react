import styled, { createGlobalStyle, keyframes } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: dark;
    --bg: #0f1420;
    --glow: #1e2a4a;
    --surface: #171e2e;
    --surface-2: #1f2840;
    --line: rgba(255, 255, 255, 0.09);
    --text: #e8ecf4;
    --muted: #9aa6bd;
    --accent: #fbbf24;
    --accent-hover: #fcd34d;
    --on-accent: #1a1204;
    --right: #22c55e;
    --right-text: #86efac;
    --right-tint: rgba(34, 197, 94, 0.14);
    --wrong: #ef4444;
    --wrong-text: #fca5a5;
    --wrong-tint: rgba(239, 68, 68, 0.14);
    --radius: 16px;
    --radius-sm: 10px;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100dvh;
    padding: 0 16px 48px;
    background:
      radial-gradient(60% 45% at 50% 0%, var(--glow) 0%, transparent 70%),
      var(--bg);
    color: var(--text);
    font-family: "Quicksand Variable", system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    caret-color: var(--accent);
    accent-color: var(--accent);
    scrollbar-color: var(--surface-2) var(--bg);
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background: var(--accent);
    color: var(--on-accent);
  }

  button, input, select {
    font: inherit;
    color: inherit;
  }

  :focus-visible {
    outline: 3px solid var(--accent);
    outline-offset: 3px;
  }

  h1, h2, p {
    margin: 0;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
`;

export const Shell = styled.main`
  width: min(100%, 680px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Brand = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 24px 0 4px;

  h1 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: "Unbounded Variable", system-ui, sans-serif;
    font-size: clamp(1.5rem, 5vw, 2rem);
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  svg {
    width: 1em;
    height: 1em;
    color: var(--accent);
  }
`;

export const Card = styled.section`
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: clamp(20px, 5vw, 32px);
  box-shadow: 0 24px 48px -20px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Lead = styled.p`
  color: var(--muted);
  font-size: 1.0625rem;
  max-width: 46ch;
`;

export const PrimaryButton = styled.button`
  min-height: 52px;
  padding: 12px 24px;
  border: 0;
  border-radius: var(--radius-sm);
  background: var(--accent);
  color: var(--on-accent);
  font-weight: 700;
  font-size: 1.0625rem;
  cursor: pointer;
  transition: background-color 150ms var(--ease-out), transform 150ms var(--ease-out);

  @media (hover: hover) {
    &:hover {
      background: var(--accent-hover);
    }
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const GhostButton = styled.button`
  min-height: 44px;
  padding: 8px 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 150ms var(--ease-out), border-color 150ms var(--ease-out);

  @media (hover: hover) {
    &:hover {
      background: var(--surface-2);
      border-color: rgba(255, 255, 255, 0.18);
    }
  }
`;

export const Segmented = styled.fieldset`
  margin: 0;
  padding: 0;
  border: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  legend {
    padding: 0;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    padding: 4px;
    background: var(--bg);
    border: 1px solid var(--line);
    border-radius: var(--radius-sm);
  }

  label {
    position: relative;
    display: grid;
    place-items: center;
    min-height: 44px;
    border-radius: 7px;
    color: var(--muted);
    font-weight: 600;
    cursor: pointer;
    transition: background-color 150ms var(--ease-out), color 150ms var(--ease-out);
  }

  input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }

  label:has(input:checked) {
    background: var(--surface-2);
    color: var(--text);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  }

  label:has(input:focus-visible) {
    outline: 3px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const Hint = styled.p`
  color: var(--muted);
  font-size: 0.875rem;

  kbd {
    font-family: inherit;
    font-weight: 700;
    color: var(--text);
  }
`;

export const ErrorText = styled.p`
  color: var(--wrong-text);
  background: var(--wrong-tint);
  border: 1px solid rgba(239, 68, 68, 0.35);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
`;

const shimmer = keyframes`
  from { background-position: 100% 0; }
  to { background-position: -100% 0; }
`;

export const Skeleton = styled.div<{ $h: number; $w?: string }>`
  height: ${({ $h }) => $h}px;
  width: ${({ $w }) => $w ?? "100%"};
  border-radius: var(--radius-sm);
  background: linear-gradient(90deg, var(--surface-2) 0%, #283351 50%, var(--surface-2) 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
