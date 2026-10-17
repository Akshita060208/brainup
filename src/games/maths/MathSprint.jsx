import React, { useState, useEffect, useCallback } from "react";
import { saveGameResult } from "../../utils/scoreManager";
import "./MathSprint.css";

export default function MathSprint() {
  const TOTAL_QUESTIONS = 10;

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);

  const [startTime, setStartTime] = useState(null);
  const [finished, setFinished] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  // ------------ RANDOM QUESTION GENERATOR ------------
  const generateQuestion = useCallback(() => {
    const type = Math.floor(Math.random() * 4); // 0–3

    let q = "";
    let ans = 0;

    switch (type) {
      case 0: // Addition: 3–4 operands
        let a = rand(5, 20);
        let b = rand(5, 20);
        let c = rand(1, 15);
        let d = rand(1, 10);

        const addParts = [a, b, c];
        if (Math.random() > 0.5) addParts.push(d);

        q = addParts.join(" + ");
        ans = addParts.reduce((s, n) => s + n, 0);
        break;

      case 1: // Multiplication: 2–3 operands
        let m1 = rand(2, 10);
        let m2 = rand(2, 10);
        let m3 = rand(2, 5);
        const mulParts = Math.random() > 0.5 ? [m1, m2, m3] : [m1, m2];

        q = mulParts.join(" × ");
        ans = mulParts.reduce((s, n) => s * n, 1);
        break;

      case 2: // Mixed operations
        let x = rand(5, 20);
        let y = rand(2, 15);
        let z = rand(1, 10);

        q = `${x} + ${y} - ${z}`;
        ans = x + y - z;
        break;

      case 3: // Solve for X (simple algebra)
        let p = rand(2, 10);
        let r = rand(2, 10);
        ans = r;

        q = `${p}x = ${p * r}  (Solve for x)`;
        break;

      default:
        q = "0 + 0";
        ans = 0;
    }

    setQuestion(q);
    setCorrectAnswer(ans);
  }, []); // ✅ useCallback ensures this function is stable

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Start timer immediately
  useEffect(() => {
    setStartTime(Date.now());
    generateQuestion();
  }, [generateQuestion]); // ✅ now safe for ESLint

  // ------------ HANDLE ANSWER SUBMISSION ------------
  function submit() {
    const userAns = Number(answer);

    if (userAns === correctAnswer) {
      setScore((s) => s + 10);
    } else {
      setScore((s) => s - 5); // wrong → penalty
    }

    setAnswer("");

    if (qIndex + 1 >= TOTAL_QUESTIONS) {
      finishGame();
    } else {
      setQIndex((i) => i + 1);
      generateQuestion();
    }
  }

  // ------------ FINISH GAME ------------
  function finishGame() {
    const end = Date.now();
    const t = Math.floor((end - startTime) / 1000);

    setTotalTime(t);
    saveGameResult("Math Sprint", t);
    setFinished(true);
  }

  return (
    <div className="math-container">
      {!finished ? (
        <>
          <h1>Math Sprint</h1>
          <h3>Question {qIndex + 1} / {TOTAL_QUESTIONS}</h3>

          <div className="question-box">{question}</div>

          <input
            className="answer-input"
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Your answer..."
          />

          <button className="submit-btn" onClick={submit}>Submit</button>

          <div className="score-display">Score: {score}</div>
        </>
      ) : (
        <div className="result-box">
          <h2>Finished! 🎉</h2>
          <p>Total Time: {totalTime} sec</p>
          <p>Score: {score}</p>
          <p>Saved to scoreboard!</p>
        </div>
      )}
    </div>
  );
}
