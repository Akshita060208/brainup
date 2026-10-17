import React from "react";
import "./Header.css";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <div className="brainup-header">
      <button className="profile-btn">Check You IQ level Now!!</button>
      <div className="space"></div>
      <div className="logo-circle">
        <span className="brain-icon"><img src={logo} alt="logo" /></span>
      </div>

      <h1 className="brain-title">
        <span className="gradient-text">BRAIN</span>{" "}
        <span className="gradient-text2">UP</span>
      </h1>

      <div className="underline-wrap">
        <div className="underline pink"></div>
        <div className="underline blue"></div>
      </div>

      <p className="tagline">Level Up Your Brain Power!</p>
      <hr className="pulse-glow"></hr>
    </div>
  );
}

