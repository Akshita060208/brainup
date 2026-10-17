import React, { useState, useEffect } from "react";
import pic1 from "../assets/pic1.jpg";
import pic2 from "../assets/pic2.PNG";
import pic3 from "../assets/pic3.PNG";
import profileIcon from "../assets/profile.jpg";
import { getAllResults, calculateIQ } from "../utils/scoreManager";

const ProfilePopup = ({ onClose, onSelect, name, setName }) => {
  const [score, setScore] = useState(0);
  const [iq, setIq] = useState(0);

  useEffect(() => {
    const results = getAllResults();
    const totalScore = results.reduce((sum, r) => sum + r.score, 0);

    setScore(totalScore);
    setIq(calculateIQ());
  }, []);

  const images = [pic1, pic2, pic3];

  return (
    <div style={overlayStyle}>
      <div style={popupBox}>
        <button style={closeBtn} onClick={onClose}>×</button>

        {/* Profile Header */}
        <div style={{ textAlign: "center" }}>
          <img
            src={profileIcon}
            alt="profile"
            style={{ width: 70, marginBottom: 10 }}
          />

          {/* Editable Name */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={nameInput}
            maxLength={20}
          />
        </div>

        <hr />

        <h4>Select Your Profile Picture</h4>

        <div style={imageRow}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              style={imgStyle}
              onClick={() => onSelect(img)}
            />
          ))}
        </div>

        <label>Score</label>
        <input value={score} readOnly style={inputStyle} />

        <label>Your IQ</label>
        <input value={iq} readOnly style={inputStyle} />

        <button
          className="leaderboard-btn"
          onClick={() => (window.location.href = "/scoreboard")}
        >
          Leaderboard
        </button>
      </div>
    </div>
  );
};

export default ProfilePopup;


//
// ---- Styles ----
//

const nameInput = {
  border: "none",
  fontSize: 18,
  textAlign: "center",
  fontWeight: "bold",
  outline: "none",
  background: "transparent",
};

const overlayStyle = {
  position: "fixed",
  top: 0, left: 0,
  width: "100%", height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
};

const popupBox = {
  width: 320,
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  position: "relative",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
};

const closeBtn = {
  position: "absolute",
  top: 10,
  right: 10,
  border: "none",
  background: "transparent",
  fontSize: 24,
  cursor: "pointer",
};

const imageRow = {
  display: "flex",
  gap: 10,
  marginBottom: 15,
};

const imgStyle = {
  width: 50,
  height: 50,
  border: "1px solid #ccc",
  borderRadius: 8,
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  padding: 8,
  margin: "5px 0 15px 0",
  border: "1px solid #ccc",
  borderRadius: 5,
  background: "#eee",
};
