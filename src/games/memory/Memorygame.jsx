import React, { useState, useEffect } from "react";
import "./MemoryGame.css";
import { saveGameResult } from "../../utils/scoreManager";

const initialCards = [
  { id: 1, value: "🍎" },
  { id: 2, value: "🍌" },
  { id: 3, value: "🍇" },
  { id: 4, value: "🍓" },
  { id: 5, value: "🍒" },
  { id: 6, value: "🍉" },
];

const generateShuffledCards = () => {
  const doubled = [...initialCards, ...initialCards];
  return doubled
    .map((c) => ({
      ...c,
      uuid: Math.random(),
      flipped: false,
      matched: false,
    }))
    .sort(() => Math.random() - 0.5);
};

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disable, setDisable] = useState(false);

  // TIMER STATES
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setCards(generateShuffledCards());
  }, []);

  // TIMER EFFECT
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleCardClick = (card) => {
    if (disable || card.flipped || card.matched) return;

    if (!isRunning) setIsRunning(true);

    const updated = cards.map((c) =>
      c.uuid === card.uuid ? { ...c, flipped: true } : c
    );
    setCards(updated);

    if (!firstCard) {
      setFirstCard(card);
    } else {
      setSecondCard(card);
      setDisable(true);
      setTimeout(() => checkMatch(card), 600);
    }
  };

  const checkMatch = (currentCard) => {
    if (firstCard.value === currentCard.value) {
      setCards((prev) =>
        prev.map((c) =>
          c.value === currentCard.value ? { ...c, matched: true } : c
        )
      );
    } else {
      setCards((prev) =>
        prev.map((c) =>
          c.uuid === firstCard.uuid || c.uuid === currentCard.uuid
            ? { ...c, flipped: false }
            : c
        )
      );
    }

    setFirstCard(null);
    setSecondCard(null);
    setDisable(false);
  };

  const resetGame = () => {
    setCards(generateShuffledCards());
    setFirstCard(null);
    setSecondCard(null);
    setDisable(false);

    setTime(0);
    setIsRunning(false);
  };

  const isGameWon = cards.length > 0 && cards.every((c) => c.matched);

  // Save score when game is won
  useEffect(() => {
    if (isGameWon) {
      setIsRunning(false);
      saveGameResult("Memory Match", time);
    }
  }, [isGameWon]);

  useEffect(() => {
  if (isGameWon) {
    setIsRunning(false);
    saveGameResult("Memory Match", time);
  }
}, [isGameWon]);

  return (
    <div className="memory-container page-center">
      <h1>Memory Match</h1>

      <h2>⏱ Time: {time}s</h2>

      <div className="memory-grid">
        {cards.map((card) => (
          <div
            key={card.uuid}
            className={`memory-card ${card.flipped || card.matched ? "flip" : ""}`}
            onClick={() => handleCardClick(card)}
          >
            <div className="front">{card.value}</div>
            <div className="back"></div>
          </div>
        ))}
      </div>

      {isGameWon && (
        <div className="win-popup">
          <h2>🎉 You Won! 🎉</h2>
          <h3>Your Time: {time}s</h3>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={resetGame}>Play Again</button>
            <button onClick={() => (window.location.href = "/")}>Exit</button>
          </div>
        </div>
      )}

      <button className="exit-btn" onClick={() => (window.location.href = "/")}>
        Exit
      </button>
    </div>
  );
}
