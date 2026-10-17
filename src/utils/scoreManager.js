// LocalStorage key
const STORAGE_KEY = "brainGamesScores";

// ----------- SCORE FROM TIME -----------
export function calculateScore(time) {
  if (time <= 10) return 100;
  if (time <= 20) return 50;
  if (time <= 30) return 30;
  if (time <= 60) return 10;
  return 5;
}

// ----------- SAVE GAME RESULT -----------
export function saveGameResult(gameName, timeTaken) {
  const score = calculateScore(timeTaken);

  const previous = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const newEntry = {
    game: gameName,
    time: timeTaken,
    score: score,
    date: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...previous, newEntry]));

  return newEntry;
}

// ----------- GET ALL RESULTS -----------
export function getAllResults() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// ----------- IQ CALCULATION -----------
export function calculateIQ() {
  const data = getAllResults();
  const totalScore = data.reduce((sum, r) => sum + r.score, 0);

  if (totalScore <= 0) return 80;

  let iq = 80 + totalScore * 0.5;

  if (iq > 160) iq = 160;

  return Math.round(iq);
}
