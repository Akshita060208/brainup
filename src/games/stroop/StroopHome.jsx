import React from "react";
import { useNavigate } from "react-router-dom";
import "../stroop/Stroop.css";

export default function StroopHome() {
  const navigate = useNavigate();

  return (
    <div className="stroop-home page-center">
      <h1 className="title">STROOP COLOR CHALLENGE</h1>
      <p className="subtitle">Identify the COLOR, not the word.</p>

      <div className="preview-word" style={{ color: "green" }}>
        GREEN
      </div>
      <p className="note">(but text color is RED)</p>

      <button className="play-now-btn" onClick={() => navigate("/stroop/play")}>
        PLAY NOW
      </button>

      <div className="modes">
        <p>🔥 Rush</p>
        <p>🧠 Quick Ans</p>
        <p>🎮 Classic</p>
        <p>⚙ Settings</p>
      </div>
    </div>
  );
}
