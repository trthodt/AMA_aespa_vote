// mountReact.js
import React from "react";
import { createRoot } from "react-dom/client";
import PopupVote from "./PopupVote";

export function mountMyComponent(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  const root = createRoot(el);
  root.render(<PopupVote />);
}