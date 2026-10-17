import React from "react";
import { getAllResults, calculateIQ } from "../utils/scoreManager";
import "./Scoreboard.css";

export default function Scoreboard() {
  const results = getAllResults();
  const iq = calculateIQ();

  return (
    <div className="scoreboard">
      <h1>Scoreboard</h1>
      <h2>IQ: {iq}</h2>

      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Time (s)</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {results.map((r, i) => (
            <tr key={i}>
              <td>{r.game}</td>
              <td>{r.time}</td>
              <td>{r.score}</td>
              <td>{new Date(r.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
