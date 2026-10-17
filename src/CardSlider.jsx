import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Gamecard.css";
import card1 from "./assets/Card1.png";
import card2 from "./assets/Card2.jpeg";
import card3 from "./assets/Card3.jpeg";
import sword from "./assets/sword.png";

const cards = [
  { img: card1, title: "Color Stroop", route: "/stroop" },
  { img: card2, title: "Math Sprint", route: "/maths/play" },
  { img: card3, title: "Memory Match", route: "/memory/play" },
];

export default function CardSlider() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const next = () => setIndex((prev) => (prev + 1) % cards.length);
  const prev = () => setIndex((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <div className="slider-wrapper">
      <img src={sword} className="sword-img" alt="sword" />

      <button className="arrow left" onClick={prev}>⟨</button>

      <div className="card-container">
        {cards.map((card, i) => (
          <div key={i} className={`gamecard ${i === index ? "active" : "hidden"}`}>
            <div className="gamecard-image">
              <img src={card.img} alt={card.title} />
            </div>

            <div className="gamecard-content">
              <h3>{card.title}</h3>
              <p>
                <button className="game-btn" onClick={() => navigate(card.route)}>
                  ▶ Play
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="arrow right" onClick={next}>⟩</button>

      <img src={sword} className="sword-img" alt="sword" />
    </div>
  );
}
