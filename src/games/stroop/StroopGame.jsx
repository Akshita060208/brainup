import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Stroop.css";
import { saveGameResult } from "../../utils/scoreManager";

const COLORS = ["RED", "GREEN", "BLUE", "YELLOW", "PINK", "PURPLE"];

export default function StroopGame() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (finished) return;
    const t = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(t);
  }, [finished]);

  useEffect(() => {
    const qs = [];
    for (let i = 0; i < 15; i++) {
      const word = COLORS[Math.floor(Math.random() * COLORS.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      qs.push({ word, color });
    }
    setQuestions(qs);
  }, []);

  const answer = (selected) => {
    if (questions.length === 0) return;

    if (selected === questions[index].color) {
      setScore((s) => s + 1);
    }

    if (index === 14) setFinished(true);
    else setIndex((i) => i + 1);
  };

  // SAVE SCORE WHEN FINISHED
  useEffect(() => {
    if (finished) {
      saveGameResult("Stroop Test", time);
    }
  }, [finished]);

  if (questions.length === 0)
    return (
      <p style={{ color: "#fff", textAlign: "center", paddingTop: 60 }}>
        Loading…
      </p>
    );

  if (finished)
    return (
      <div className="stroop-game end-screen page-center">
        <h1>Game Over 🎉</h1>
        <p>Score: {score} / 15</p>
        <p>Total Time: {time} sec</p>

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => navigate("/stroop")} className="play-now-btn">
            Back to Menu
          </button>
          <button
            onClick={() => navigate("/")}
            style={{ padding: "10px 20px", borderRadius: 8 }}
          >
            Home
          </button>
        </div>
      </div>
    );

  return (
    <div className="stroop-game page-center">
      <h2>Question {index + 1} / 15</h2>
      <p className="timer">⏱ {time}s</p>

      <div
        className="stroop-word"
        style={{ color: questions[index].color.toLowerCase() }}
      >
        {questions[index].word}
      </div>

      <div className="options">
        {COLORS.map((c) => (
          <button key={c} className="option-btn" onClick={() => answer(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
