export function calculateIQ(score, time) {
  let iq = 100 + score * 8 - time * 0.3;

  // clamp between 70 and 150
  iq = Math.max(70, Math.min(150, iq));

  return Math.round(iq);
}
